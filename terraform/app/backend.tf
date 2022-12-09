terraform {
  backend "gcs" {
    bucket = "badge-generator-tfstates"
  }
}
