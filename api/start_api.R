# Script to start the Plumber API server
# Run this script to start the CHD prediction API

library(plumber)

# Create the API
api <- plumb("plumber_api.R")

# Start the server
cat("Starting CHD Prediction API on http://localhost:8000\n")
cat("API Documentation available at http://localhost:8000/__docs__/\n")
cat("Press Ctrl+C to stop the server\n\n")

api$run(
  host = "0.0.0.0",
  port = 8000,
  docs = TRUE
)
