#!/bin/bash

set -euo pipefail

if [ "${#}" -lt 1 ]; then
  echo "Usage:
  ${0} <commands>

Example:
  $ ${0} build
  $ ${0} push
  $ ${0} build push"
  exit 1
fi

# ----------
# arguments
# ----------

readonly COMMANDS=( "${@}" )
echo "Arguments:"
echo "  COMMANDS=${COMMANDS[*]}"
echo ""

# ----------
# constants
# ----------

readonly GCP_PROJECT_ID=badge-generator
readonly REGION=asia-northeast1
readonly REGISTRY_HOST=${REGION}-docker.pkg.dev
readonly DOCKER_IMAGE=${REGISTRY_HOST}/${GCP_PROJECT_ID}/app/frontend
readonly SERVICE_ACCOUNT=badge-generator-frontend@${GCP_PROJECT_ID}.iam.gserviceaccount.com

echo "Constants:"
echo "  GCP_PROJECT_ID=${GCP_PROJECT_ID}"
echo "  REGION=${REGION}"
echo "  REGISTRY_HOST=${REGISTRY_HOST}"
echo "  DOCKER_IMAGE=${DOCKER_IMAGE}"
echo "  SERVICE_ACCOUNT=${SERVICE_ACCOUNT}"
echo ""

# ----------
# functions
# ----------

function build() {
  # --provenance=false: Docker 29 uses the containerd image store by default,
  # which keeps BuildKit's default provenance attestation, so the push becomes
  # an image index (image + attestation) instead of a single image. Nothing
  # reads the attestation, and the children of an index cannot be deleted
  # while the index exists.
  docker build \
    --provenance=false \
    -t "${DOCKER_IMAGE}:latest" \
    --platform=linux/amd64 \
    --build-arg GA_MEASUREMENT_ID="${GA_MEASUREMENT_ID}" \
    ./frontend
}

function push() {
  gcloud auth configure-docker "${REGISTRY_HOST}" --quiet
  docker push "${DOCKER_IMAGE}:latest"
}

function deploy() {
  gcloud run deploy frontend \
    --image="${DOCKER_IMAGE}:latest" \
    --set-env-vars=QIITA_ACCESS_TOKEN="${QIITA_ACCESS_TOKEN}" \
    --set-env-vars=BLUESKY_IDENTIFIER="${BLUESKY_IDENTIFIER}" \
    --set-env-vars=BLUESKY_PASSWORD="${BLUESKY_PASSWORD}" \
    --region="${REGION}" \
    --project="${GCP_PROJECT_ID}" \
    --service-account="${SERVICE_ACCOUNT}"
  gcloud run services update-traffic frontend \
    --to-latest \
    --region="${REGION}" \
    --project="${GCP_PROJECT_ID}"
}

function list_images() {
  gcloud artifacts docker images list "${DOCKER_IMAGE}" \
    --include-tags \
    --format=json
}

# Reads list_images output and prints the digests without the latest tag.
# "indexes" keeps only image indexes (manifest lists), "all" keeps everything.
function select_old_digests() {
  jq -r --arg kind "${1}" '
    .[]
    | select((.tags // []) | index("latest") | not)
    | select($kind == "all" or (.metadata.mediaType | IN(
        "application/vnd.oci.image.index.v1+json",
        "application/vnd.docker.distribution.manifest.list.v2+json")))
    | .version'
}

function delete_old_images() {
  local _digests
  _digests="$(list_images | select_old_digests "${1}")"
  for _digest in ${_digests}; do
    gcloud artifacts docker images delete "${DOCKER_IMAGE}@${_digest}" --quiet
  done
}

function clean_images() {
  # Indexes go first: Artifact Registry refuses to delete a manifest that an
  # index still references.
  delete_old_images indexes
  # Listed again, because whether deleting an index also deletes the
  # manifests it references is not documented.
  delete_old_images all
}

function commands_contains() {
  local _right="${1}"

  for _command in "${COMMANDS[@]}"; do
    if [ "${_command}" = "${_right}" ]; then
      return 0
    fi
  done
  return 1
}

# ----------
# main process
# ----------

readonly VALID_COMMANDS=( "build" "push" "deploy" "clean_images" )
for _valid_command in "${VALID_COMMANDS[@]}"; do
  if commands_contains "${_valid_command}"; then $_valid_command; fi
done
