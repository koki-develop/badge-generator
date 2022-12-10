resource "google_service_account" "main" {
  account_id = "${local.prefix}-frontend"
}

locals {
  frontend_roles = [
    "roles/datastore.user",
  ]
}

resource "google_project_iam_member" "main" {
  for_each = toset(local.frontend_roles)

  project = data.google_project.main.id
  role    = each.value
  member  = "serviceAccount:${google_service_account.main.email}"
}
