resource "google_service_account" "main" {
  account_id = "gh-actions"
}

locals {
  sa_roles = [
    "roles/iam.serviceAccountUser",
    "roles/artifactregistry.repoAdmin",
    "roles/run.developer",
  ]
}

resource "google_project_iam_member" "service_account" {
  for_each = toset(local.sa_roles)

  project = data.google_project.main.id
  role    = each.value
  member  = "serviceAccount:${google_service_account.main.email}"
}
