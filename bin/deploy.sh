#!/bin/bash

set -euo pipefail

readonly GCP_PROJECT_ID=badge-generator
readonly REGION=asia-northeast1
readonly REGISTRY_HOST=${REGION}-docker.pkg.dev
readonly DOCKER_IMAGE=${REGISTRY_HOST}/${GCP_PROJECT_ID}/app/frontend:latest

gcloud auth configure-docker "${REGISTRY_HOST}" --quiet
docker build -t "${DOCKER_IMAGE}" --platform=linux/amd64 ./frontend
docker push "${DOCKER_IMAGE}"

gcloud run deploy frontend \
  --image="${DOCKER_IMAGE}" \
  --region="${REGION}" \
  --project="${GCP_PROJECT_ID}"
gcloud run services update-traffic frontend \
  --to-latest \
  --region="${REGION}" \
  --project="${GCP_PROJECT_ID}"
