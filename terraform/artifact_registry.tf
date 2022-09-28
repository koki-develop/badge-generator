resource "google_artifact_registry_repository" "main" {
  location      = "asia-northeast1"
  repository_id = "app"
  format        = "DOCKER"
}
