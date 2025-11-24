# Quick Deployment Reference

## 🚀 Deploy in 3 Steps

### Step 1: Deploy Frontend (GitHub Pages)
```bash
cd chd-prediction-bot
ng build --configuration production --base-href "/6101-mid-term-project/"
npx angular-cli-ghpages --dir=dist/chd-prediction-bot
```
**Result:** https://DhanushGWU1995.github.io/6101-mid-term-project/

---

### Step 2: Push to GitHub
```bash
cd ..
git add .
git commit -m "Deploy CHD Prediction System"
git push origin dhanush-mid-term-project-data-science
```

---

### Step 3: Deploy Backend (Render.com)
1. Visit https://render.com
2. Sign in with GitHub
3. New → Web Service
4. Connect `6101-mid-term-project`
5. Click "Create Web Service"

**Result:** https://chd-prediction-api.onrender.com

---

## 📝 Important Files

- `DEPLOYMENT_GUIDE.md` - Full deployment documentation
- `api/Dockerfile` - Backend Docker config
- `render.yaml` - Render.com config
- `deploy.sh` - Automated deployment script
- `environment.prod.ts` - Production API URL

---

## 💰 Cost: $0 (100% Free)

- **Frontend:** GitHub Pages (Free)
- **Backend:** Render.com Free Tier (750 hrs/month)

---

## 🔗 Your URLs

**Frontend:**  
https://DhanushGWU1995.github.io/6101-mid-term-project/

**Backend:**  
https://chd-prediction-api.onrender.com

**API Docs:**  
https://chd-prediction-api.onrender.com/__docs__/
