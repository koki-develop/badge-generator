resource "google_app_engine_application" "main" {
  location_id   = "asia-northeast1"
  database_type = "CLOUD_FIRESTORE"
}
