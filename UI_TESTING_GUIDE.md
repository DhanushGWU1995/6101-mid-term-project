# CHD Prediction UI Testing Guide

## 🎯 Quick Test (5 Essential Cases)

### 1. Very Low Risk (1.49%) → 🟢 Green, NO CHD
- Age: 18-24
- Sex: Female
- Smoking: No
- Diabetes: No
- Exercise: Yes
- Health: Excellent
- BMI: 22

**Expected:**
- Probability: ~1.49%
- CHD Status: NO (below 10% threshold)
- Background: Green
- Message: "Below the 10% clinical threshold, indicating standard risk levels"

### 2. Moderate Risk (3.04%) → 🟢 Green, NO CHD
- Age: 45-49
- Sex: Male
- Smoking: Yes
- Diabetes: No
- Exercise: No
- Health: Good
- BMI: 28

**Expected:**
- Probability: ~3.04%
- CHD Status: NO (below 10% threshold)
- Background: Green
- Message: "Below the 10% clinical threshold, indicating standard risk levels"

### 3. High Risk (21.99%) → 🔴 Orange-Red, YES CHD
- Age: 60-64
- Sex: Male
- Smoking: Yes
- Diabetes: Yes
- Exercise: No
- Health: Fair
- BMI: 32

**Expected:**
- Probability: ~21.99%
- CHD Status: YES (above 10% threshold)
- Background: Orange-Red
- Message: "Exceeds the 10% clinical threshold for elevated cardiovascular risk"

### 4. Very High Risk (33.84%) → �� Deep Red, YES CHD
- Age: 65-69
- Sex: Male
- Smoking: Yes
- Diabetes: Yes
- Exercise: No
- Health: Poor
- BMI: 35

**Expected:**
- Probability: ~33.84%
- CHD Status: YES (above 10% threshold)
- Background: Deep Red
- Message: "Exceeds the 10% clinical threshold for elevated cardiovascular risk"

### 5. Maximum Risk (34.82%) → 🚨 Deep Red, YES CHD
- Age: 65-69
- Sex: Male
- Smoking: Yes
- Diabetes: Yes
- Exercise: No
- Health: Poor
- BMI: 40

**Expected:**
- Probability: ~34.82% (MAXIMUM possible)
- CHD Status: YES (above 10% threshold)
- Background: Deep Red
- Message: "Exceeds the 10% clinical threshold for elevated cardiovascular risk"
