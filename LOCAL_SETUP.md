# Local Development Setup - CHD Prediction System

**Status:** ✅ All deployment files removed, back to local development

## What Was Reverted

### Removed Files
- `DEPLOYMENT_GUIDE.md` - Comprehensive deployment documentation
- `QUICK_DEPLOY.md` - Quick deployment reference
- `render.yaml` - Render.com configuration
- `deploy.sh` - Deployment automation script
- `deploy_static.sh` - Static deployment script
- `api/Dockerfile` - Docker configuration for R API
- `GITHUB_API_ALTERNATIVES.md` - Alternative deployment options
- `chd-prediction-bot/src/environments/` - Environment configurations
- `api/generate_all_predictions.R` - Pre-computation script
- `predictions_generation.log` - Log file

### Restored Configuration
- **Service:** `chd-prediction.service.ts` now uses `http://localhost:8000`
- **Method:** HttpParams-based API calls (original working version)
- **Git:** Deployment commit undone, clean working state

## How to Run Locally

### Prerequisites
- R with plumber, ranger, dplyr packages
- Node.js with Angular CLI
- Model file: `models/rf_chd_model.rds` (8.2 MB)

### Start API Server (Terminal 1)
```bash
cd api
Rscript -e "library(plumber); pr <- plumb('plumber_api.R'); pr$run(port=8000, host='0.0.0.0')"
```

**Expected Output:**
```
Running plumber API at http://127.0.0.1:8000
```

### Start Frontend (Terminal 2)
```bash
cd chd-prediction-bot
ng serve
```

**Expected Output:**
```
** Angular Live Development Server is listening on localhost:4200
```

### Access Application
Open browser to: **http://localhost:4200**

## Quick Test Cases

### Test 1: Minimum Risk (0.27%)
- Age: 30-34
- Sex: Female
- Smoking: No
- Diabetes: No
- Exercise: Yes
- Health: Excellent
- BMI: 23.5

**Expected:** Green background, "NO CHD" result

### Test 2: Maximum Risk (34.82%)
- Age: 65-69
- Sex: Male
- Smoking: Yes
- Diabetes: Yes
- Exercise: No
- Health: Poor
- BMI: 40

**Expected:** Deep Red background, "YES CHD" result

## Current Features

✅ **BMI Slider:** 10-70 range, float values, 0.1 step
✅ **No Selection Bias:** Sex field starts empty
✅ **Optimized Threshold:** 10% (based on 3.62% CHD prevalence)
✅ **Color Coding:** 5 levels from Green to Deep Red
✅ **Risk Bar:** Animated 0-35% scale
✅ **Change Answers:** Button to modify inputs
✅ **Model Transparency:** Shows training details
✅ **High Accuracy:** 210,428 samples, 3.21% OOB error

## API Endpoints

### Health Check
```bash
curl http://localhost:8000/health
```

### Prediction
```bash
curl -X POST "http://localhost:8000/predict?Age=30-34&Sex=Female&Smoking_Status=No&Diabetes_Status=No&Exercise_Past_30_Days=Yes&General_Health_Status=Excellent&BMI_Value=23.5"
```

## Troubleshooting

### API Server Won't Start
- Check if port 8000 is already in use: `lsof -ti:8000`
- Kill existing process: `kill -9 $(lsof -ti:8000)`
- Verify R packages installed: `R -e "library(plumber)"`

### Frontend Won't Start
- Check if port 4200 is in use: `lsof -ti:4200`
- Clear Angular cache: `rm -rf chd-prediction-bot/.angular`
- Reinstall dependencies: `cd chd-prediction-bot && npm install`

### CORS Errors
- Verify API server is running on port 8000
- Check CORS configuration in `plumber_api.R`
- Ensure service uses `http://localhost:8000` (not https)

## Model Details

- **Type:** Random Forest (ranger package)
- **Trees:** 500
- **Training Samples:** 210,428
- **Features:** 7 health indicators
- **CHD Prevalence:** 3.62% (7,619 Yes / 202,809 No)
- **Imbalance Ratio:** 26.6:1
- **OOB Error:** 3.21% (Brier score)
- **Threshold:** 10% (clinical recommendation)
- **Max Probability:** 34.82%

## Documentation Files

- `UI_TESTING_GUIDE.md` - Complete testing guide with 26 test cases
- `THRESHOLD_UPDATE_10_PERCENT.md` - Threshold optimization analysis
- `api/README.md` - API server documentation
- `api/QUICKSTART.md` - Quick start guide
- `chd-prediction-bot/README.md` - Frontend documentation

## Note

This is a **local development setup**. No deployment to GitHub Pages or Render.com is required. Everything runs on your machine.

Perfect for:
- Development and testing
- Demonstrations
- Model experimentation
- No internet required (after initial setup)

---
**Last Updated:** November 24, 2025
**Status:** Production Ready (Local)
