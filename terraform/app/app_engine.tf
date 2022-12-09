resource "google_app_engine_application" "main" {
  location_id   = local.region
  database_type = "CLOUD_FIRESTORE"
}
