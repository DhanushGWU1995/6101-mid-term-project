# Free Deployment Guide - CHD Prediction System

## 🚀 Complete Deployment Strategy

This guide will help you deploy your CHD Prediction System with **free hosting** for both frontend (Angular) and backend (R Plumber API).

---

## 📋 Overview

**Frontend (Angular):** GitHub Pages  
**Backend (R API):** Render.com or Hugging Face Spaces  
**Total Cost:** $0 (100% Free)

---

## Part 1: Deploy Frontend to GitHub Pages

### Step 1: Prepare Angular App for Production

```bash
cd chd-prediction-bot

# Install Angular CLI globally if needed
npm install -g @angular/cli

# Build for production
ng build --configuration production --base-href "/6101-mid-term-project/"
```

### Step 2: Install GitHub Pages Deployment Tool

```bash
# Install angular-cli-ghpages
npm install -g angular-cli-ghpages
```

### Step 3: Deploy to GitHub Pages

```bash
# Deploy (this will create/update gh-pages branch)
npx angular-cli-ghpages --dir=dist/chd-prediction-bot
```

**Your frontend will be available at:**
```
https://DhanushGWU1995.github.io/6101-mid-term-project/
```

### Step 4: Update API URL for Production

Create a production environment file if not exists:

**File:** `chd-prediction-bot/src/environments/environment.prod.ts`
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-api-name.onrender.com'  // Will update this after backend deployment
};
```

Update the service to use environment:

**File:** `chd-prediction-bot/src/app/services/chd-prediction.service.ts`
```typescript
import { environment } from '../../../environments/environment';

export class ChdPredictionService {
  private apiUrl = environment.production 
    ? environment.apiUrl 
    : 'http://localhost:8000';
  // ... rest of code
}
```

---

## Part 2: Deploy Backend (R API) to Render.com

### Option A: Render.com (Recommended - Easier)

#### Step 1: Create Dockerfile for R API

Create file: `api/Dockerfile`

```dockerfile
# Use R base image
FROM r-base:4.3.1

# Install system dependencies
RUN apt-get update && apt-get install -y \\
    libcurl4-openssl-dev \\
    libssl-dev \\
    libxml2-dev \\
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy R scripts and model
COPY plumber_api.R .
COPY ../models/rf_chd_model.rds ./models/

# Install required R packages
RUN R -e "install.packages(c('plumber', 'ranger', 'dplyr'), repos='https://cloud.r-project.org/')"

# Expose port
EXPOSE 8000

# Run the API
CMD ["R", "-e", "pr <- plumber::plumb('plumber_api.R'); pr$run(host='0.0.0.0', port=8000)"]
```

#### Step 2: Create render.yaml

Create file: `render.yaml` in project root

```yaml
services:
  - type: web
    name: chd-prediction-api
    env: docker
    dockerfilePath: ./api/Dockerfile
    plan: free
    healthCheckPath: /health
    envVars:
      - key: PORT
        value: 8000
```

#### Step 3: Push to GitHub

```bash
# Add files
git add .
git commit -m "Add deployment configuration"
git push origin dhanush-mid-term-project-data-science
```

#### Step 4: Deploy on Render.com

1. Go to https://render.com
2. Sign up with your GitHub account
3. Click "New" → "Web Service"
4. Connect your `6101-mid-term-project` repository
5. Render will detect `render.yaml` automatically
6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)

**Your API will be at:**
```
https://chd-prediction-api.onrender.com
```

**Note:** Free tier sleeps after 15 minutes of inactivity. First request may take 30 seconds to wake up.

---

### Option B: Hugging Face Spaces (Alternative)

#### Step 1: Create Space

1. Go to https://huggingface.co/spaces
2. Create new Space
3. Select "Docker" as Space SDK
4. Name it "chd-prediction-api"

#### Step 2: Create Dockerfile

Create file: `Dockerfile` in project root

```dockerfile
FROM r-base:4.3.1

RUN apt-get update && apt-get install -y \\
    libcurl4-openssl-dev \\
    libssl-dev \\
    libxml2-dev

WORKDIR /app

COPY api/plumber_api.R .
COPY models/rf_chd_model.rds ./models/

RUN R -e "install.packages(c('plumber', 'ranger', 'dplyr'), repos='https://cloud.r-project.org/')"

EXPOSE 7860

CMD ["R", "-e", "pr <- plumber::plumb('plumber_api.R'); pr$run(host='0.0.0.0', port=7860)"]
```

#### Step 3: Push to Hugging Face

```bash
# Install git-lfs
git lfs install

# Clone your space
git clone https://huggingface.co/spaces/YOUR_USERNAME/chd-prediction-api
cd chd-prediction-api

# Copy files
cp -r ../api/* .
cp -r ../models .

# Add and push
git add .
git commit -m "Initial deployment"
git push
```

**Your API will be at:**
```
https://YOUR_USERNAME-chd-prediction-api.hf.space
```

---

## Part 3: Connect Frontend to Deployed Backend

### Step 1: Update Environment

Update `chd-prediction-bot/src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://chd-prediction-api.onrender.com'  // Your Render URL
};
```

### Step 2: Update Service to Use Environment

`chd-prediction-bot/src/app/services/chd-prediction.service.ts`:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChdPredictionService {
  private apiUrl = environment.production 
    ? 'https://chd-prediction-api.onrender.com'  // Production URL
    : 'http://localhost:8000';  // Development URL

  constructor(private http: HttpClient) {}
  
  // ... rest of your code
}
```

### Step 3: Update API CORS Settings

Update `api/plumber_api.R` to allow your GitHub Pages domain:

```r
#* @filter cors
cors <- function(req, res) {
  res$setHeader("Access-Control-Allow-Origin", "*")  # Or specific domain
  res$setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
  res$setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization")
  
  if (req$REQUEST_METHOD == "OPTIONS") {
    res$status <- 200
    return(list())
  } else {
    plumber::forward()
  }
}
```

### Step 4: Rebuild and Redeploy Frontend

```bash
cd chd-prediction-bot

# Build with production config
ng build --configuration production --base-href "/6101-mid-term-project/"

# Deploy to GitHub Pages
npx angular-cli-ghpages --dir=dist/chd-prediction-bot
```

---

## Part 4: Alternative - Deploy Everything on Render.com

### Deploy Both Frontend & Backend on Render

#### Create render.yaml for both services:

```yaml
services:
  # Backend API
  - type: web
    name: chd-prediction-api
    env: docker
    dockerfilePath: ./api/Dockerfile
    plan: free
    healthCheckPath: /health
    envVars:
      - key: PORT
        value: 8000

  # Frontend Angular App
  - type: web
    name: chd-prediction-frontend
    env: node
    buildCommand: cd chd-prediction-bot && npm install && npm run build
    startCommand: cd chd-prediction-bot && npx http-server dist/chd-prediction-bot -p 3000
    plan: free
    envVars:
      - key: NODE_ENV
        value: production
```

---

## 📦 Complete Deployment Checklist

### Pre-Deployment

- [ ] Model file (`rf_chd_model.rds`) is committed to repo
- [ ] All dependencies listed in package.json (frontend)
- [ ] All R packages listed in Dockerfile
- [ ] CORS configured in plumber_api.R
- [ ] Environment files created

### Backend Deployment (Render.com)

- [ ] Create Dockerfile in `api/` folder
- [ ] Create render.yaml in root
- [ ] Push to GitHub
- [ ] Sign up on Render.com
- [ ] Connect GitHub repo
- [ ] Deploy web service
- [ ] Test API at `/health` endpoint
- [ ] Test API at `/predict` endpoint with sample data
- [ ] Copy deployment URL

### Frontend Deployment (GitHub Pages)

- [ ] Update environment.prod.ts with API URL
- [ ] Update service to use environment
- [ ] Build production: `ng build --configuration production --base-href "/6101-mid-term-project/"`
- [ ] Deploy: `npx angular-cli-ghpages --dir=dist/chd-prediction-bot`
- [ ] Visit GitHub Pages URL
- [ ] Test complete flow (form → API → results)

### Post-Deployment Testing

- [ ] Test all 5 quick test cases
- [ ] Verify colors display correctly
- [ ] Verify probabilities match expected values
- [ ] Test "Change Answers" button
- [ ] Test on mobile device
- [ ] Test on different browsers

---

## 🔧 Troubleshooting

### Frontend Issues

**Issue:** 404 errors on GitHub Pages
- **Solution:** Check `--base-href` matches your repo name
- **Solution:** Ensure `dist/chd-prediction-bot` folder exists

**Issue:** API calls failing (CORS errors)
- **Solution:** Check CORS settings in plumber_api.R
- **Solution:** Ensure API URL is correct in environment.prod.ts

### Backend Issues

**Issue:** Render deployment fails
- **Solution:** Check Dockerfile syntax
- **Solution:** Ensure model file is in correct location
- **Solution:** Check build logs on Render dashboard

**Issue:** API is slow (30+ seconds)
- **Solution:** This is normal for free tier on first request (cold start)
- **Solution:** Consider upgrading to paid tier ($7/month) for always-on

**Issue:** Model file too large for GitHub
- **Solution:** Use Git LFS: `git lfs track "*.rds"`
- **Solution:** Alternatively, host model file separately (S3, Hugging Face)

---

## 🌐 Final URLs

After deployment, you'll have:

**Frontend:** `https://DhanushGWU1995.github.io/6101-mid-term-project/`

**Backend API:** `https://chd-prediction-api.onrender.com`

**API Docs:** `https://chd-prediction-api.onrender.com/__docs__/`

**Health Check:** `https://chd-prediction-api.onrender.com/health`

---

## 💰 Cost Breakdown

| Service | Plan | Cost | Limitations |
|---------|------|------|-------------|
| GitHub Pages | Free | $0 | Public repos only, 1GB storage |
| Render.com | Free | $0 | Sleeps after 15min inactivity, 750 hours/month |
| **Total** | | **$0** | |

### Upgrade Options (Optional)

**Render.com Starter:** $7/month
- No sleep
- Always available
- Better for production use

---

## 📝 Quick Start Commands

```bash
# 1. Build Frontend
cd chd-prediction-bot
ng build --configuration production --base-href "/6101-mid-term-project/"
npx angular-cli-ghpages --dir=dist/chd-prediction-bot

# 2. Push Backend
cd ..
git add .
git commit -m "Deploy to Render"
git push origin main

# 3. Deploy on Render.com
# - Visit render.com
# - Connect repo
# - Deploy
```

---

## 🎉 Success Criteria

Your deployment is successful when:

✅ Frontend loads at GitHub Pages URL  
✅ API health check returns 200 OK  
✅ Test case works end-to-end:
   - Age: 30-34, Female, all healthy → Shows ~0.27%, Green, NO CHD  
✅ All 5 colors display correctly  
✅ "Change Answers" button works  
✅ Mobile responsive

---

## 📧 Support Resources

- **Render.com Docs:** https://render.com/docs
- **GitHub Pages:** https://pages.github.com/
- **Angular Deployment:** https://angular.io/guide/deployment
- **Plumber API:** https://www.rplumber.io/

---

**Last Updated:** November 24, 2025  
**Deployment Type:** Free Tier (Frontend + Backend)  
**Estimated Setup Time:** 30-45 minutes
