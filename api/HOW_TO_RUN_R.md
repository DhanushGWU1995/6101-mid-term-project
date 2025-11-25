# How to Run R Files - Complete Guide

## Method 3: RStudio (GUI)

**Steps:**
1. Open RStudio
2. File → Open File → Select `save_model.R`
3. Click "Source" button (top-right of editor)
   OR
4. Press `Cmd + Shift + S` (Mac) or `Ctrl + Shift + S` (Windows)

---

## Quick Reference for Your Project Files

### Save the Random Forest Model
```bash
cd /Users/dhanushmathivanan/dhanush_gwu/mid_term_project_live/6101-mid-term-project/api
Rscript save_model.R
```
**Output:** Creates `models/rf_chd_model.rds`

---

### Start the API Server
```bash
cd /Users/dhanushmathivanan/dhanush_gwu/mid_term_project_live/6101-mid-term-project/api
Rscript start_api.R
```
**Output:** API running on http://localhost:8000 (keeps running until you press Ctrl+C)

---

### Alternative: Start API in Background
```bash
cd /Users/dhanushmathivanan/dhanush_gwu/mid_term_project_live/6101-mid-term-project/api
nohup Rscript start_api.R > api.log 2>&1 &
echo $! > api.pid  # Save process ID
```

**To stop the background API:**
```bash
kill $(cat api.pid)
```

---

## Common Issues & Solutions

### Issue 1: "Rscript: command not found"

**Solution:** R is not in your PATH. Use full path:
```bash
/usr/local/bin/Rscript save_model.R
```

Or find R location:
```bash
which R
which Rscript
```

---

### Issue 2: "cannot open file 'save_model.R'"

**Solution:** You're in the wrong directory. Check:
```bash
pwd  # Shows current directory
ls   # List files - should see save_model.R
```

Navigate to correct directory:
```bash
cd /Users/dhanushmathivanan/dhanush_gwu/mid_term_project_live/6101-mid-term-project/api
```

---

### Issue 3: Package not found

**Solution:** Install missing packages first:
```bash
R -e "install.packages(c('plumber', 'ranger', 'dplyr', 'caret'))"
```

---

### Issue 4: Permission denied

**Solution:** Make file executable:
```bash
chmod +x save_model.R
./save_model.R  # Then run directly
```

---

## Your Complete Workflow

### First Time Setup:

```bash
# 1. Navigate to api directory
cd /Users/dhanushmathivanan/dhanush_gwu/mid_term_project_live/6101-mid-term-project/api

# 2. Install R packages (one time only)
R -e "install.packages(c('plumber', 'ranger', 'dplyr', 'caret', 'pROC', 'jsonlite'))"

# 3. Save the model
Rscript save_model.R
```

### Every Time You Start Development:

**Terminal 1 (API Server):**
```bash
cd /Users/dhanushmathivanan/dhanush_gwu/mid_term_project_live/6101-mid-term-project/api
Rscript start_api.R
```
*Keep this running - don't close this terminal*

**Terminal 2 (Angular App):**
```bash
cd /Users/dhanushmathivanan/dhanush_gwu/mid_term_project_live/6101-mid-term-project/chd-prediction-bot
ng serve
```

**Terminal 3 (Testing):**
```bash
cd /Users/dhanushmathivanan/dhanush_gwu/mid_term_project_live/6101-mid-term-project/api
./test_api.sh
```

---

## Pro Tips

### 1. Check if API is running:
```bash
curl http://localhost:8000/health
```

### 2. View API processes:
```bash
ps aux | grep Rscript
```

### 3. Kill stuck R processes:
```bash
pkill -f "Rscript.*start_api"
```

### 4. Run with verbose output:
```bash
Rscript --verbose save_model.R
```

### 5. Check R version:
```bash
R --version
```

---

## Summary

**For this project, recommended:**

1. **Save model:** `Rscript save_model.R` (one time)
2. **Start API:** `Rscript start_api.R` (keep running)
3. **Test API:** `./test_api.sh`
4. **Debug issues:** Use R Console with `source()`

---

**Your model is now saved and ready to use!**

Next: Run `Rscript start_api.R` to start the prediction server.
