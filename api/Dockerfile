# Use R base image
FROM r-base:4.3.1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libcurl4-openssl-dev \
    libssl-dev \
    libxml2-dev \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy R scripts and model
COPY plumber_api.R .
COPY ../models/rf_chd_model.rds ./models/rf_chd_model.rds

# Install required R packages
RUN R -e "install.packages(c('plumber', 'ranger', 'dplyr'), repos='https://cloud.r-project.org/')"

# Expose port (Render uses PORT env variable)
EXPOSE 8000

# Run the API
CMD R -e "pr <- plumber::plumb('plumber_api.R'); pr\$run(host='0.0.0.0', port=as.numeric(Sys.getenv('PORT', 8000)))"
