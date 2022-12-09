resource "google_artifact_registry_repository" "main" {
  location      = local.region
  repository_id = "app"
  format        = "DOCKER"
}
