#!/bin/bash
# Test script for CHD Prediction API
# File: api/test_api.sh

echo "======================================"
echo "CHD Prediction API Test Suite"
echo "======================================"
echo ""

# Test 1: Health Check
echo "Test 1: Health Check"
echo "--------------------"
curl -s http://localhost:8000/health | python3 -m json.tool
echo ""
echo ""

# Test 2: Model Info
echo "Test 2: Model Information"
echo "-------------------------"
curl -s http://localhost:8000/model-info | python3 -m json.tool
echo ""
echo ""

# Test 3: Low Risk Patient
echo "Test 3: Low Risk Patient Prediction"
echo "------------------------------------"
echo "Patient: 30-34, Female, Non-smoker, No diabetes, Exercises, Excellent health, BMI 22"
curl -s -X POST "http://localhost:8000/predict?Age=30-34&Sex=Female&Smoking_Status=No&Diabetes_Status=No&Exercise_Past_30_Days=Yes&General_Health_Status=Excellent&BMI_Value=22" | python3 -m json.tool
echo ""
echo ""

# Test 4: High Risk Patient
echo "Test 4: High Risk Patient Prediction"
echo "-------------------------------------"
echo "Patient: 60-64, Male, Smoker, Diabetes, No exercise, Poor health, BMI 35"
curl -s -X POST "http://localhost:8000/predict?Age=60-64&Sex=Male&Smoking_Status=Yes&Diabetes_Status=Yes&Exercise_Past_30_Days=No&General_Health_Status=Poor&BMI_Value=35" | python3 -m json.tool
echo ""
echo ""

# Test 5: Moderate Risk Patient
echo "Test 5: Moderate Risk Patient Prediction"
echo "-----------------------------------------"
echo "Patient: 50-54, Female, Non-smoker, Borderline diabetes, Exercises, Good health, BMI 28"
curl -s -X POST "http://localhost:8000/predict?Age=50-54&Sex=Female&Smoking_Status=No&Diabetes_Status=Yes/borderline&Exercise_Past_30_Days=Yes&General_Health_Status=Good&BMI_Value=28" | python3 -m json.tool
echo ""
echo ""

echo "======================================"
echo "All tests completed!"
echo "======================================"
