#!/bin/bash

set -euo pipefail

readonly GCP_PROJECT_ID=badge-generator
readonly REGISTRY_HOST=asia-northeast1-docker.pkg.dev
readonly DOCKER_IMAGE=${REGISTRY_HOST}/${GCP_PROJECT_ID}/app/frontend

gcloud auth configure-docker "${REGISTRY_HOST}" --quiet
docker build -t "${DOCKER_IMAGE}" --platform=linux/amd64 ./frontend
docker push "${DOCKER_IMAGE}"
