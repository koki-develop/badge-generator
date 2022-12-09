terraform {
  backend "gcs" {
    bucket = "badge-generator-gh-actions-tfstates"
  }
}
