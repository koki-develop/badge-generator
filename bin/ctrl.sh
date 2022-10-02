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
readonly DOCKER_IMAGE=${REGISTRY_HOST}/${GCP_PROJECT_ID}/app/frontend:latest

echo "Constants:"
echo "  GCP_PROJECT_ID=${GCP_PROJECT_ID}"
echo "  REGION=${REGION}"
echo "  REGISTRY_HOST=${REGISTRY_HOST}"
echo "  DOCKER_IMAGE=${DOCKER_IMAGE}"
echo ""

# ----------
# functions
# ----------

function build() {
  docker build \
    -t "${DOCKER_IMAGE}" \
    --platform=linux/amd64 \
    --build-arg GA_MEASUREMENT_ID="${GA_MEASUREMENT_ID}" \
    ./frontend
}

function push() {
  gcloud auth configure-docker "${REGISTRY_HOST}" --quiet
  docker push "${DOCKER_IMAGE}"
}

function deploy() {
  gcloud run deploy frontend \
    --image="${DOCKER_IMAGE}" \
    --set-env-vars=QIITA_ACCESS_TOKEN="${QIITA_ACCESS_TOKEN}" \
    --region="${REGION}" \
    --project="${GCP_PROJECT_ID}"
  gcloud run services update-traffic frontend \
    --to-latest \
    --region="${REGION}" \
    --project="${GCP_PROJECT_ID}"
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

readonly VALID_COMMANDS=( "build" "push" "deploy" )
for _valid_command in "${VALID_COMMANDS[@]}"; do
  if commands_contains "${_valid_command}"; then $_valid_command; fi
done
