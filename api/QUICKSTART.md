# Quick Start Guide: Random Forest CHD Prediction in Angular

## Summary

You have a **Random Forest model** trained in R that predicts coronary heart disease. To use it in your **Angular app**, follow these steps:

## 🚀 Quick Setup (5 Minutes)

### Step 1: Start the R API Server

```bash
# Open R console
cd /Users/dhanushmathivanan/dhanush_gwu/mid_term_project_live/6101-mid-term-project/api
R

# In R console:
source("start_api.R")
```

Keep this terminal window open! The API runs on **http://localhost:8000**

### Step 2: Test the API

```bash
# In a new terminal
cd /Users/dhanushmathivanan/dhanush_gwu/mid_term_project_live/6101-mid-term-project/api
./test_api.sh
```

You should see prediction results for different patient profiles.

### Step 3: Run Your Angular App

```bash
# In another terminal
cd /Users/dhanushmathivanan/dhanush_gwu/mid_term_project_live/6101-mid-term-project/chd-prediction-bot
ng serve
```

Navigate to: **http://localhost:4200/rf-prediction**

## 📁 Files Created

```
api/
├── plumber_api.R          # REST API endpoints for predictions
├── save_model.R           # Script to save trained RF model
├── start_api.R            # Script to start the API server
├── test_api.sh            # Test script for API
└── README.md              # Detailed documentation

chd-prediction-bot/src/app/
├── services/
│   └── rf-prediction.service.ts    # Angular service to call API
└── components/rf-prediction/
    ├── rf-prediction.component.ts   # Component logic
    ├── rf-prediction.component.html # UI template
    └── rf-prediction.component.scss # Styling
```

## 🔄 How It Works

```
User fills form in Angular
         ↓
Angular sends HTTP POST to R API
         ↓
R API loads Random Forest model
         ↓
Model makes prediction
         ↓
R API returns JSON with probability & risk level
         ↓
Angular displays results with visualization
```

## 📊 What the Model Predicts

**Input:** 7 health factors
- Age group
- Sex
- BMI
- Smoking status
- Diabetes status
- Exercise (past 30 days)
- General health status

**Output:**
- CHD probability (0-100%)
- Risk level (Low, Moderate, High, Very High)
- Risk interpretation

## 🎨 Example Angular Usage

```typescript
// In your component
constructor(private rfService: RfPredictionService) {}

predict() {
  const patient = {
    Age: '50-54',
    Sex: 'Male',
    Smoking_Status: 'Yes',
    Diabetes_Status: 'No',
    Exercise_Past_30_Days: 'Yes',
    General_Health_Status: 'Good',
    BMI_Value: 28.5
  };

  this.rfService.predictCHD(patient).subscribe(result => {
    console.log('CHD Probability:', result.prediction.chd_probability);
    console.log('Risk Level:', result.prediction.risk_level);
  });
}
```

## 🛠️ Customization

### Change Risk Thresholds

Edit `api/plumber_api.R`:

```r
risk_level <- if(pred_prob < 0.1) {
  "Low"
} else if(pred_prob < 0.3) {
  "Moderate"
} else if(pred_prob < 0.5) {
  "High"
} else {
  "Very High"
}
```

### Add More Predictors

1. Update the model in your R Markdown
2. Re-run `save_model.R`
3. Add new parameters to `plumber_api.R`
4. Update Angular form in `rf-prediction.component.html`
5. Update interface in `rf-prediction.service.ts`

### Change API Port

Edit `api/start_api.R`:

```r
api$run(port = 9000)  # Change from 8000 to 9000
```

Then update Angular service:

```typescript
private apiUrl = 'http://localhost:9000';
```

## 🐛 Troubleshooting

### "API not running" error in Angular

**Problem:** R API server is not started

**Solution:**
```bash
cd api
R
source("start_api.R")
```

### "Model not found" error

**Problem:** Model file doesn't exist

**Solution:**
```bash
cd api
R
source("save_model.R")
```

### CORS errors in browser console

**Problem:** Cross-origin issues

**Solution:** Already handled in `plumber_api.R` with CORS filter. Restart the API.

### Port already in use

**Problem:** Another process using port 8000

**Solution:** Change port in `start_api.R` and Angular service

## 📈 Next Steps

1. **Add authentication:** Protect your API with API keys
2. **Deploy to cloud:** Host on Heroku, AWS, or DigitalOcean
3. **Add logging:** Track predictions for analysis
4. **Improve UI:** Add charts, graphs, recommendations
5. **Multiple models:** Compare Random Forest with Logistic Regression

## 💡 Understanding Random Forest in Production

**Why use an API instead of running R in Angular?**

1. ✅ **Separation of concerns:** ML logic separate from UI
2. ✅ **Language flexibility:** R for ML, TypeScript for UI
3. ✅ **Easy updates:** Update model without changing frontend
4. ✅ **Scalability:** Can add caching, load balancing
5. ✅ **Security:** Model code not exposed in browser

**Random Forest = Ensemble of Decision Trees**

Your model contains 500 decision trees. Each tree:
- Looks at different subsets of your data
- Makes a prediction (Yes/No for CHD)
- Final prediction = majority vote of all trees

The API handles all this complexity and just returns a simple probability!

## 📞 Support

- API docs: http://localhost:8000/__docs__/
- Full README: `api/README.md`
- Test API: Run `./test_api.sh`

---

**Happy predicting! 🎯**
