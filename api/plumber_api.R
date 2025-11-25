# Plumber API for Random Forest CHD Prediction
# Install required packages: install.packages(c("plumber", "ranger", "dplyr"))

library(plumber)
library(ranger)
library(dplyr)

# Load the trained model (you'll need to save it first)
# In your R Markdown, add: saveRDS(rf_orig, "models/rf_chd_model.rds")
model <- readRDS("../models/rf_chd_model.rds")

#* @apiTitle Coronary Heart Disease Prediction API
#* @apiDescription API for predicting CHD risk using Random Forest model

#* Health check endpoint
#* @get /health
function() {
  list(status = "OK", message = "CHD Prediction API is running")
}

#* Get model information
#* @get /model-info
function() {
  list(
    model_type = "Random Forest",
    num_trees = model$num.trees,
    predictors = c("Age", "Sex", "Smoking_Status", "Diabetes_Status", 
                   "Exercise_Past_30_Days", "General_Health_Status", "BMI_Value"),
    target = "Coronary_Heart_Disease"
  )
}

#* Predict CHD risk for a single patient
#* @post /predict
#* @param Age:character Age group (e.g., "45-49", "50-54")
#* @param Sex:character Sex ("Male" or "Female")
#* @param Smoking_Status:character Smoking status ("Yes" or "No")
#* @param Diabetes_Status:character Diabetes status ("Yes", "Yes/borderline", "Yes/pregnancy only", "No")
#* @param Exercise_Past_30_Days:character Exercise in past 30 days ("Yes" or "No")
#* @param General_Health_Status:character General health ("Excellent", "Very Good", "Good", "Fair", "Poor")
#* @param BMI_Value:numeric BMI value (numeric, e.g., 25.5)
#* @serializer unboxedJSON
function(Age, Sex, Smoking_Status, Diabetes_Status, 
         Exercise_Past_30_Days, General_Health_Status, BMI_Value) {
  
  tryCatch({
    # Create input data frame
    input_data <- data.frame(
      Age = factor(Age, levels = c("18-24", "25-29", "30-34", "35-39", "40-44", 
                                   "45-49", "50-54", "55-59", "60-64", "65-69")),
      Sex = factor(Sex, levels = c("Male", "Female")),
      Smoking_Status = factor(Smoking_Status, levels = c("Yes", "No")),
      Diabetes_Status = factor(Diabetes_Status, 
                               levels = c("Yes", "Yes/borderline", "Yes/pregnancy only", "No")),
      Exercise_Past_30_Days = factor(Exercise_Past_30_Days, levels = c("Yes", "No")),
      General_Health_Status = factor(General_Health_Status, 
                                     levels = c("Excellent", "Very Good", "Good", "Fair", "Poor")),
      BMI_Value = as.numeric(BMI_Value),
      stringsAsFactors = FALSE
    )
    
    # Make prediction
    pred_prob <- predict(model, data = input_data)$predictions[, "Yes"]
    
    # Determine risk level
    risk_level <- if(pred_prob < 0.1) {
      "Low"
    } else if(pred_prob < 0.3) {
      "Moderate"
    } else if(pred_prob < 0.5) {
      "High"
    } else {
      "Very High"
    }
    
    # Binary classification: Use 10% threshold (clinical risk assessment standard)
    # CHD is rare (~5-10% prevalence), so model max probability is ~35%
    # A 10% threshold aligns with 10-year CVD risk guidelines
    has_chd_binary <- pred_prob >= 0.10
    
    # Return prediction
    list(
      success = TRUE,
      prediction = list(
        chd_probability = round(pred_prob * 100, 2),
        risk_level = risk_level,
        has_chd = has_chd_binary
      ),
      input = list(
        age = Age,
        sex = Sex,
        smoking = Smoking_Status,
        diabetes = Diabetes_Status,
        exercise = Exercise_Past_30_Days,
        general_health = General_Health_Status,
        bmi = BMI_Value
      )
    )
    
  }, error = function(e) {
    list(
      success = FALSE,
      error = paste("Prediction error:", e$message)
    )
  })
}

#* Batch predict for multiple patients
#* @post /predict-batch
#* @serializer unboxedJSON
function(req) {
  tryCatch({
    patients <- jsonlite::fromJSON(req$postBody)
    
    # Create data frame from JSON
    input_data <- data.frame(
      Age = factor(patients$Age, levels = c("18-24", "25-29", "30-34", "35-39", "40-44", 
                                             "45-49", "50-54", "55-59", "60-64", "65-69")),
      Sex = factor(patients$Sex, levels = c("Male", "Female")),
      Smoking_Status = factor(patients$Smoking_Status, levels = c("Yes", "No")),
      Diabetes_Status = factor(patients$Diabetes_Status, 
                               levels = c("Yes", "Yes/borderline", "Yes/pregnancy only", "No")),
      Exercise_Past_30_Days = factor(patients$Exercise_Past_30_Days, levels = c("Yes", "No")),
      General_Health_Status = factor(patients$General_Health_Status, 
                                     levels = c("Excellent", "Very Good", "Good", "Fair", "Poor")),
      BMI_Value = as.numeric(patients$BMI_Value),
      stringsAsFactors = FALSE
    )
    
    # Make predictions
    pred_probs <- predict(model, data = input_data)$predictions[, "Yes"]
    
    list(
      success = TRUE,
      predictions = pred_probs * 100,
      count = length(pred_probs)
    )
    
  }, error = function(e) {
    list(
      success = FALSE,
      error = paste("Batch prediction error:", e$message)
    )
  })
}

#* Enable CORS for Angular app
#* @filter cors
function(req, res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  res$setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res$setHeader("Access-Control-Allow-Headers", "Content-Type")
  
  if (req$REQUEST_METHOD == "OPTIONS") {
    res$status <- 200
    return(list())
  } else {
    plumber::forward()
  }
}
