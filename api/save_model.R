# Script to save the trained Random Forest model
# Run this after training your model in the R Markdown file

library(dplyr)
library(caret)
library(ranger)

cat("Loading and cleaning BRFSS 2024 data...\n")

# Load data
Heart_data <- data.frame(read.csv("../Code_files/BRFSS_2024_Readable_Columns.csv"))

# Variable transformation
Heart_data$Age_Group_5yr <- factor(
  Heart_data$Age_Group_5yr, levels = 1:13,
  labels = c("18-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65-69", "70-74", "75-79", "80+")
)
Heart_data$Sex <- factor(Heart_data$Sex, levels = c(1, 2), labels = c("Male", "Female"))
Heart_data$Diabetes_Status <- factor(Heart_data$Diabetes_Status, levels = c(1, 2, 3, 4), labels = c("Yes", "Yes/borderline", "Yes/pregnancy only", "No"))
Heart_data$Smoking_Status <- factor(Heart_data$Smoked_100_Cigarettes_Lifetime, levels = c(1, 2), labels = c("Yes", "No"))
Heart_data$BMI_Category_Alt <- factor(Heart_data$BMI_Category_Alt, levels = c(1, 2, 3, 4), labels = c("Underweight", "Normal Weight", "Overweight", "Obese"))
Heart_data$Exercise_Past_30_Days <- factor(Heart_data$Exercise_Past_30_Days, levels = c(1, 2), labels = c("Yes", "No"))
Heart_data$Coronary_Heart_Disease <- factor(Heart_data$Coronary_Heart_Disease, levels = c(1, 2), labels = c("Yes", "No"))
Heart_data$General_Health_Status <- factor(Heart_data$General_Health_Status, levels = c(1, 2, 3, 4, 5), labels = c("Excellent", "Very Good", "Good", "Fair", "Poor"))
Heart_data$BMI_Value <- Heart_data$BMI_Category / 100

names(Heart_data)[names(Heart_data) == "Age_Group_5yr"] <- "Age"

# Data cleaning
Heart_clean <- Heart_data

# Impute BMI if needed
continuous_vars <- c("BMI_Value")
for(var in continuous_vars) {
  if(var %in% names(Heart_clean)) {
    missing_pct <- mean(is.na(Heart_clean[[var]])) * 100
    if(missing_pct >= 5 && missing_pct <= 20) {
      var_median <- median(Heart_clean[[var]], na.rm = TRUE)
      Heart_clean[[var]][is.na(Heart_clean[[var]])] <- var_median
    }
  }
}

# Impute missing BMI_Category_Alt based on BMI_Value
if("BMI_Category_Alt" %in% names(Heart_clean) && "BMI_Value" %in% names(Heart_clean)) {
  missing_idx <- which(is.na(Heart_clean$BMI_Category_Alt) & !is.na(Heart_clean$BMI_Value))
  if(length(missing_idx) > 0) {
    bmi_vals <- Heart_clean$BMI_Value[missing_idx]
    bmi_cat <- cut(bmi_vals,
                  breaks = c(-Inf, 18.5, 24.9, 29.9, Inf),
                  labels = c("Underweight", "Normal Weight", "Overweight", "Obese"),
                  right = TRUE)
    Heart_clean$BMI_Category_Alt[missing_idx] <- bmi_cat
  }
}

# Remove invalid responses
if("General_Health_Status" %in% names(Heart_clean)) {
  valid_health <- Heart_clean$General_Health_Status %in% c("Excellent", "Very Good", "Good", "Fair", "Poor")
  Heart_clean <- Heart_clean[valid_health, ]
}

if ("Exercise_Past_30_Days" %in% names(Heart_clean)) {
  valid_exercise <- Heart_clean$Exercise_Past_30_Days %in% c("Yes", "No")
  Heart_clean <- Heart_clean[valid_exercise, ]
}

# Remove Age groups above 69 years
if ("Age" %in% names(Heart_clean)) {
  valid_age_groups <- c("18-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65-69")
  Heart_clean <- Heart_clean[Heart_clean$Age %in% valid_age_groups, ]
}

# Remove rows with missing critical variables
critical_vars <- c("Coronary_Heart_Disease", "General_Health_Status", "Sex", "Exercise_Past_30_Days", "Diabetes_Status", "Smoking_Status", "BMI_Value", "BMI_Category_Alt", "Age")
available_critical <- critical_vars[critical_vars %in% names(Heart_clean)]
Heart_clean <- Heart_clean[complete.cases(Heart_clean[available_critical]), ]

# Outlier treatment for BMI_Value
if("BMI_Value" %in% names(Heart_clean)) {
  bmi_outliers <- which(Heart_clean$BMI_Value < 10 | Heart_clean$BMI_Value > 70)
  if(length(bmi_outliers) > 0) {
    Heart_clean <- Heart_clean[-bmi_outliers, ]
  }
}

cat("Data cleaning complete. Total rows:", nrow(Heart_clean), "\n")

# Prepare data for Random Forest
rf_df <- Heart_clean %>%
  select(Coronary_Heart_Disease, Age, Sex, Smoking_Status, Diabetes_Status,
         Exercise_Past_30_Days, General_Health_Status, BMI_Value) %>%
  na.omit()

rf_df <- rf_df %>%
  mutate(across(c(Age, Sex, Smoking_Status, Diabetes_Status, 
                  Exercise_Past_30_Days, General_Health_Status,
                  Coronary_Heart_Disease), as.factor))

# Split data
set.seed(123)
train_index <- createDataPartition(rf_df$Coronary_Heart_Disease, p = 0.7, list = FALSE)
train_rf <- rf_df[train_index, ]

# Train model
set.seed(123)
rf_model <- ranger(
  formula = Coronary_Heart_Disease ~ .,
  data = train_rf,
  num.trees = 500,
  mtry = floor(sqrt(ncol(train_rf) - 1)),
  importance = "permutation",
  min.node.size = 10,
  probability = TRUE
)

# Create models directory if it doesn't exist
if (!dir.exists("../models")) {
  dir.create("../models")
}

# Save the model
saveRDS(rf_model, "../models/rf_chd_model.rds")

cat("Model saved successfully to ../models/rf_chd_model.rds\n")
cat("Model summary:\n")
print(rf_model)
