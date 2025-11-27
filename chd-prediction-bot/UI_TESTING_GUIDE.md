# UI Testing Guide - CHD Prediction Bot

## Overview
This guide provides comprehensive test scenarios for the CHD Prediction Bot application based on the **updated pruned decision tree** model (random sampling approach, n=15,238).

## Decision Tree Model Details
- **Dataset**: Simple random sampling (balanced 50/50)
- **Sample Size**: 15,238 cases
- **Primary Predictor**: Age (most important split)
- **Secondary Predictors**: General Health Status, Sex, Diabetes Status, BMI Value
- **Key Insight**: Age 50-69 strongly predicts CHD, Age 18-49 strongly predicts No CHD

---

## Test Case 1: Highest CHD Risk Profile
**Scenario**: Older adult with poor health status

### Input Parameters:
- **Age**: `60-64` or `65-69`
- **Sex**: `Male` or `Female`
- **General Health Status**: `Poor` or `Fair`
- **Diabetes Status**: Any (e.g., `Yes`)
- **Smoking Status**: `Yes`
- **Exercise Past 30 Days**: `No`
- **BMI Value**: `32` (Obese range)

### Expected Results:
- **Prediction**: **High Risk of CHD (Yes)**
- **Probability**: ~83.6% CHD risk
- **Decision Path**: 
  1. Age in [50-54, 55-59, 60-64, 65-69] → Yes (0.651)
  2. General Health Status in [Fair, Poor] → Yes (0.836)
  3. **Terminal Node**: Yes (83.6% CHD probability)

### UI Verification:
- ✅ Risk badge should display **"High Risk"** in red
- ✅ Probability bar should show ~80-85%
- ✅ Decision tree visualization should highlight path to terminal node
- ✅ Recommendation should emphasize immediate medical consultation

---

## Test Case 2: Lowest CHD Risk Profile
**Scenario**: Young adult with excellent health

### Input Parameters:
- **Age**: `18-24` or `25-29`
- **Sex**: `Male` or `Female`
- **General Health Status**: `Excellent` or `Very Good`
- **Diabetes Status**: `No`
- **Smoking Status**: `No`
- **Exercise Past 30 Days**: `Yes`
- **BMI Value**: `22` (Normal weight)

### Expected Results:
- **Prediction**: **Low Risk of CHD (No)**
- **Probability**: ~87.5% No CHD (12.5% CHD risk)
- **Decision Path**:
  1. Age in [18-24, 25-29, 30-34, 35-39, 40-44, 45-49] → No (0.798)
  2. General Health Status in [Excellent, Very Good, Good] → No (0.875)
  3. **Terminal Node**: No (87.5% No CHD probability)

### UI Verification:
- ✅ Risk badge should display **"Low Risk"** in green
- ✅ Probability bar should show ~10-15% CHD risk
- ✅ Decision tree should show clear path to "No CHD" terminal node
- ✅ Recommendation should focus on maintaining healthy lifestyle

---

## Test Case 3: Middle-Aged Male with Very Good Health
**Scenario**: Testing sex-based risk differentiation (ages 60-69)

### Input Parameters:
- **Age**: `60-64` or `65-69`
- **Sex**: `Male` ⚠️ (Important for this path)
- **General Health Status**: `Very Good`
- **Diabetes Status**: `No` or `Yes/pregnancy only`
- **Smoking Status**: `No`
- **Exercise Past 30 Days**: `Yes`
- **BMI Value**: `27` (Overweight)

### Expected Results:
- **Prediction**: **Moderate-High Risk of CHD (Yes)**
- **Probability**: ~60.6% CHD risk
- **Decision Path**:
  1. Age in [60-64, 65-69] → Yes (0.651)
  2. General Health Status in [Excellent, Very Good] → No (0.610)
  3. Age in [60-64, 65-69] → No (0.541)
  4. **Sex = Male** → Yes (0.557)
  5. General Health Status = Very Good → Yes (0.606)
  6. **Terminal Node**: Yes (60.6% CHD probability)

### UI Verification:
- ✅ Risk badge should display **"Moderate Risk"** in yellow/orange
- ✅ Probability should show ~60%
- ✅ Sex predictor should be highlighted in decision path
- ✅ Recommendation should note higher risk for males in this age group

---

## Test Case 4: Middle-Aged Female with Excellent Health
**Scenario**: Testing sex-based protection (ages 60-69)

### Input Parameters:
- **Age**: `60-64` or `65-69`
- **Sex**: `Female` ⚠️ (Important for this path)
- **General Health Status**: `Excellent` or `Very Good`
- **Diabetes Status**: `No`
- **Smoking Status**: `No`
- **Exercise Past 30 Days**: `Yes`
- **BMI Value**: `24` (Normal weight)

### Expected Results:
- **Prediction**: **Low-Moderate Risk of CHD (No)**
- **Probability**: ~69.0% No CHD (31.0% CHD risk)
- **Decision Path**:
  1. Age in [60-64, 65-69] → Yes (0.651)
  2. General Health Status in [Excellent, Very Good] → No (0.610)
  3. Age in [60-64, 65-69] → No (0.541)
  4. **Sex = Female** → No (0.657)
  5. Diabetes Status in [Yes/pregnancy only, No] → No (0.690)
  6. **Terminal Node**: No (69.0% No CHD probability)

### UI Verification:
- ✅ Risk badge should display **"Low Risk"** or **"Low-Moderate Risk"** in green/yellow
- ✅ Probability should show ~30% CHD risk
- ✅ Sex predictor should be highlighted showing protective effect for females
- ✅ Recommendation should acknowledge lower risk but maintain vigilance

---

## Test Case 5: Middle-Aged Adult with Good Health & Diabetes
**Scenario**: Testing diabetes impact in good health category (ages 55-59)

### Input Parameters:
- **Age**: `55-59`
- **Sex**: `Male` or `Female`
- **General Health Status**: `Good`
- **Diabetes Status**: `Yes/pregnancy only` ⚠️ (Important)
- **Smoking Status**: `No`
- **Exercise Past 30 Days**: `Yes`
- **BMI Value**: `28` (Overweight, >= 26.6)

### Expected Results:
- **Prediction**: **Moderate Risk of CHD (Yes)**
- **Probability**: ~55.5% CHD risk
- **Decision Path**:
  1. Age in [50-54, 55-59, 60-64, 65-69] → Yes (0.651)
  2. General Health Status in [Good, Fair, Poor] → Yes (0.750)
  3. General Health Status = Good → Yes (0.641)
  4. Age in [50-54, 55-59] → Yes (0.514)
  5. **Diabetes Status = Yes/pregnancy only** → No (0.540)
  6. **Age = 55-59** → Yes (0.515)
  7. **BMI_Value >= 26.6** → Yes (0.555)
  8. **Terminal Node**: Yes (55.5% CHD probability)

### UI Verification:
- ✅ Risk badge should display **"Moderate Risk"** in yellow
- ✅ Probability should show ~55%
- ✅ BMI threshold (26.6) should be highlighted if visualization supports it
- ✅ Recommendation should emphasize diabetes management and weight control

---

## Additional Test Scenarios

### Test Case 6: BMI Threshold Testing (Age 55-59, Good Health, Diabetes)
**Purpose**: Verify BMI cutoff at 26.6

**Test A - Below threshold**:
- Age: `55-59`
- BMI_Value: `25` (< 26.6)
- Diabetes: `Yes/pregnancy only`
- General Health: `Good`
- **Expected**: No CHD (57.5% No CHD probability)

**Test B - Above threshold**:
- Age: `55-59`
- BMI_Value: `28` (>= 26.6)
- Diabetes: `Yes/pregnancy only`
- General Health: `Good`
- **Expected**: Yes CHD (55.5% CHD probability)

