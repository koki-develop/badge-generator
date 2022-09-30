resource "google_cloud_run_service" "main" {
  name     = "frontend"
  location = "asia-northeast1"
  template {
    spec {
      containers {
        image = "asia-northeast1-docker.pkg.dev/${data.google_project.main.project_id}/${google_artifact_registry_repository.main.name}/frontend:latest"
      }
    }
  }
}

data "google_iam_role" "run_invoker" {
  name = "roles/run.invoker"
}

data "google_iam_policy" "cloud_run_main_noauth" {
  binding {
    role    = data.google_iam_role.run_invoker.name
    members = ["allUsers"]
  }
}

resource "google_cloud_run_service_iam_policy" "main_noauth" {
  location    = google_cloud_run_service.main.location
  project     = google_cloud_run_service.main.project
  service     = google_cloud_run_service.main.name
  policy_data = data.google_iam_policy.cloud_run_main_noauth.policy_data
}
