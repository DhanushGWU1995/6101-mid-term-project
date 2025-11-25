# Random Forest CHD Prediction API & Angular Integration

This guide explains how to deploy your Random Forest model as a REST API and integrate it with an Angular application.

## Architecture Overview

```
┌─────────────────┐      HTTP/REST      ┌──────────────────┐
│                 │  ← API Requests →   │                  │
│  Angular App    │                     │   R Plumber      │
│  (Frontend)     │                     │   API Server     │
│                 │  ← JSON Response ←  │                  │
└─────────────────┘                     └──────────────────┘
                                               │
                                               ↓
                                        ┌──────────────┐
                                        │ Random Forest│
                                        │    Model     │
                                        │   (.rds)     │
                                        └──────────────┘
```

## Part 1: Setup R API (Backend)

### Step 1: Install Required R Packages

```r
# Install packages if not already installed
install.packages(c("plumber", "ranger", "dplyr", "jsonlite", "caret"))
```

### Step 2: Save Your Trained Model

Navigate to the `api` directory and run:

```r
# From your R console
setwd("/Users/dhanushmathivanan/dhanush_gwu/mid_term_project_live/6101-mid-term-project/api")
source("save_model.R")
```

This will:
- Train your Random Forest model using the same parameters from your R Markdown
- Save it as `models/rf_chd_model.rds`

### Step 3: Start the API Server

```r
# From your R console
setwd("/Users/dhanushmathivanan/dhanush_gwu/mid_term_project_live/6101-mid-term-project/api")
source("start_api.R")
```

The API will start on `http://localhost:8000`

You can view the interactive API documentation at: `http://localhost:8000/__docs__/`

### API Endpoints

#### 1. Health Check
```bash
GET http://localhost:8000/health
```
Response:
```json
{
  "status": "OK",
  "message": "CHD Prediction API is running"
}
```

#### 2. Get Model Info
```bash
GET http://localhost:8000/model-info
```

#### 3. Predict Single Patient
```bash
POST http://localhost:8000/predict
```
Parameters:
- `Age`: "45-49", "50-54", etc.
- `Sex`: "Male" or "Female"
- `Smoking_Status`: "Yes" or "No"
- `Diabetes_Status`: "Yes", "Yes/borderline", "Yes/pregnancy only", "No"
- `Exercise_Past_30_Days`: "Yes" or "No"
- `General_Health_Status`: "Excellent", "Very Good", "Good", "Fair", "Poor"
- `BMI_Value`: Numeric (e.g., 25.5)

Example using curl:
```bash
curl -X POST "http://localhost:8000/predict?Age=45-49&Sex=Male&Smoking_Status=Yes&Diabetes_Status=No&Exercise_Past_30_Days=Yes&General_Health_Status=Good&BMI_Value=28.5"
```

Response:
```json
{
  "success": true,
  "prediction": {
    "chd_probability": 15.23,
    "risk_level": "Moderate",
    "has_chd": false
  },
  "input": {
    "age": "45-49",
    "sex": "Male",
    "smoking": "Yes",
    "diabetes": "No",
    "exercise": "Yes",
    "general_health": "Good",
    "bmi": 28.5
  }
}
```

## Part 2: Setup Angular App (Frontend)

### Step 1: Install HttpClient Module

Ensure `HttpClientModule` is imported in your `app.module.ts`:

```typescript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    // ... other modules
  ]
})
```

### Step 2: Use the Service

The service is already created at:
`chd-prediction-bot/src/app/services/rf-prediction.service.ts`

### Step 3: Add the Component to Your Routes

In your `app.routes.ts` or routing module:

```typescript
import { RfPredictionComponent } from './components/rf-prediction/rf-prediction.component';

export const routes: Routes = [
  // ... other routes
  { path: 'rf-prediction', component: RfPredictionComponent },
];
```

### Step 4: Run the Angular App

```bash
cd chd-prediction-bot
npm install
ng serve
```

Navigate to: `http://localhost:4200/rf-prediction`

## Testing the Integration

### Test 1: API Health Check

```bash
curl http://localhost:8000/health
```

Expected: `{"status":"OK","message":"CHD Prediction API is running"}`

### Test 2: Make a Prediction

```bash
curl -X POST "http://localhost:8000/predict?Age=50-54&Sex=Female&Smoking_Status=No&Diabetes_Status=No&Exercise_Past_30_Days=Yes&General_Health_Status=Very%20Good&BMI_Value=24.5"
```

Expected: JSON with prediction results

### Test 3: From Angular App

1. Fill out the form with patient data
2. Click "Predict Risk"
3. View the prediction results with risk level and probability

## Deployment Options

### Option 1: Local Development
- R API: `localhost:8000`
- Angular: `localhost:4200`

### Option 2: Production Deployment

#### Deploy R API:
1. **Docker**: Containerize the Plumber API
2. **Heroku**: Deploy R app with buildpack
3. **AWS EC2**: Run R server on EC2 instance
4. **DigitalOcean**: Deploy on droplet

#### Deploy Angular App:
1. Build: `ng build --prod`
2. Deploy to:
   - **Netlify/Vercel**: Static hosting
   - **Firebase Hosting**
   - **AWS S3 + CloudFront**
   - **GitHub Pages**

Update the API URL in `rf-prediction.service.ts`:
```typescript
private apiUrl = 'https://your-api-domain.com';
```

## Alternative: Convert Model to JavaScript

If you want to avoid a backend API, you can:

1. Export the decision rules from your Random Forest
2. Implement the logic in TypeScript/JavaScript
3. Run predictions entirely in the browser

This is more complex but eliminates the need for an API server.

### Pros:
- No API server needed
- Faster predictions (no network latency)
- Works offline

### Cons:
- More difficult to implement complex models
- Model logic exposed in frontend code
- Harder to update model

## Troubleshooting

### CORS Issues
If you get CORS errors, ensure the API has CORS headers (already included in `plumber_api.R`).

### API Connection Failed
- Check that R API is running on port 8000
- Verify firewall settings
- Check API URL in Angular service

### Model Loading Error
- Ensure `rf_chd_model.rds` exists in `models/` directory
- Verify model was saved correctly
- Check R working directory

## Security Considerations

For production:
1. Add API authentication (API keys, JWT tokens)
2. Implement rate limiting
3. Use HTTPS
4. Validate all inputs server-side
5. Add logging and monitoring
6. Sanitize error messages

## Model Updates

To update the model:
1. Retrain in R Markdown
2. Run `save_model.R` again
3. Restart the API server
4. No Angular changes needed!

## License

This project uses the BRFSS 2024 dataset. Please review data usage policies.

---

**Questions?** Check the API documentation at `http://localhost:8000/__docs__/`
