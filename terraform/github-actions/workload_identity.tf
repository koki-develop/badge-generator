resource "google_iam_workload_identity_pool" "main" {
  workload_identity_pool_id = "gh-actions-pool"
}

resource "google_iam_workload_identity_pool_provider" "main" {
  workload_identity_pool_provider_id = "gh-actions-pool-provider"
  workload_identity_pool_id          = google_iam_workload_identity_pool.main.workload_identity_pool_id

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }

  attribute_mapping = {
    "google.subject"       = "assertion.sub"
    "attribute.repository" = "assertion.repository"
    "attribute.actor"      = "assertion.actor"
  }
}

resource "google_service_account_iam_member" "workload_identity" {
  service_account_id = google_service_account.main.id
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.main.name}/attribute.repository/koki-develop/badge-generator"
}
