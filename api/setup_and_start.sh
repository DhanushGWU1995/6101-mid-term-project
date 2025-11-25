#!/bin/bash
# Complete setup script for CHD Prediction API
# File: setup_and_start.sh

set -e  # Exit on error

echo "========================================="
echo "CHD Prediction API Setup & Start"
echo "========================================="
echo ""

# Step 1: Check R installation
echo "Step 1: Checking R installation..."
if ! command -v R &> /dev/null; then
    echo "❌ R is not installed. Please install R from https://www.r-project.org/"
    exit 1
fi
echo "✅ R is installed: $(R --version | head -1)"
echo ""

# Step 2: Install required packages
echo "Step 2: Installing required R packages..."
echo "This may take a few minutes..."
R --quiet --no-save <<EOF
packages <- c('plumber', 'ranger', 'dplyr', 'caret', 'jsonlite', 'pROC')
new_packages <- packages[!(packages %in% installed.packages()[,"Package"])]
if(length(new_packages) > 0) {
  install.packages(new_packages, repos='https://cloud.r-project.org', quiet=TRUE)
  cat("✅ Installed:", paste(new_packages, collapse=", "), "\n")
} else {
  cat("✅ All packages already installed\n")
}
EOF
echo ""

# Step 3: Check if model exists
echo "Step 3: Checking for trained model..."
if [ ! -f "../models/rf_chd_model.rds" ]; then
    echo "⚠️  Model not found. Training model now..."
    Rscript save_model.R
    echo "✅ Model trained and saved"
else
    echo "✅ Model found: ../models/rf_chd_model.rds"
fi
echo ""

# Step 4: Start API server
echo "Step 4: Starting API server..."
echo ""
echo "========================================="
echo "🚀 API Server Starting..."
echo "========================================="
echo ""
echo "API will be available at:"
echo "  • Health Check:  http://localhost:8000/health"
echo "  • Documentation: http://localhost:8000/__docs__/"
echo "  • Predictions:   http://localhost:8000/predict"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
Rscript start_api.R
