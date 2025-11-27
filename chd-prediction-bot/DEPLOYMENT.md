# 🚀 Deploying CHD Prediction Bot to GitHub Pages

This guide will help you deploy your Angular application to GitHub Pages for **FREE** hosting.

## Prerequisites

- Your code is already in a GitHub repository: `DhanushGWU1995/6101-mid-term-project`
- You have push access to the repository

## Step 1: Build the Production Version

```bash
cd /Users/dhanushmathivanan/dhanush_gwu/mid_term_project_live/6101-mid-term-project/chd-prediction-bot
npm run build:prod
```

This creates an optimized production build in the `dist/chd-prediction-bot` folder.

## Step 2: Deploy to GitHub Pages

```bash
npm run deploy
```

This command will:
1. Build your app for production
2. Create/update the `gh-pages` branch
3. Push the built files to GitHub

## Step 3: Enable GitHub Pages (First Time Only)

1. Go to your GitHub repository: https://github.com/DhanushGWU1995/6101-mid-term-project
2. Click on **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

## Step 4: Access Your Live App

After deployment completes (1-2 minutes), your app will be live at:

```
https://dhanushgwu1995.github.io/6101-mid-term-project/
```

## Alternative: GitHub Actions (Automated Deployment)

You can also set up automatic deployment on every push:

### Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]  # or your default branch
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: |
        cd chd-prediction-bot
        npm ci
        
    - name: Build
      run: |
        cd chd-prediction-bot
        npm run build:prod
        
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./chd-prediction-bot/dist/chd-prediction-bot
```

## Troubleshooting

### Issue: 404 Error on Refresh

If you get a 404 error when refreshing the page, it's because GitHub Pages doesn't support Angular routing by default.

**Solution**: Copy `index.html` to `404.html` in your dist folder before deploying:

```bash
cd dist/chd-prediction-bot
cp index.html 404.html
```

### Issue: Blank Page

Make sure your `base-href` is set correctly in the build command:

```bash
ng build --configuration production --base-href /6101-mid-term-project/
```

## Manual Deployment (Alternative)

If the automated deployment doesn't work:

1. Build the project:
   ```bash
   npm run build:prod
   ```

2. Install gh-pages globally:
   ```bash
   npm install -g gh-pages
   ```

3. Deploy:
   ```bash
   gh-pages -d dist/chd-prediction-bot
   ```

## Updating Your Deployed App

Whenever you make changes:

1. Commit and push your changes to GitHub
2. Run deployment again:
   ```bash
   npm run build:prod
   npm run deploy
   ```

3. Wait 1-2 minutes for GitHub to update

## Other Free Hosting Options

If GitHub Pages doesn't work, you can also use:

1. **Vercel** (https://vercel.com)
   - Connect your GitHub repo
   - Automatic deployments
   - Custom domain support

2. **Netlify** (https://netlify.com)
   - Drag and drop `dist` folder
   - Or connect GitHub repo
   - Free SSL certificate

3. **Firebase Hosting** (https://firebase.google.com)
   ```bash
   npm install -g firebase-tools
   firebase init hosting
   firebase deploy
   ```

## Your Live URL

Once deployed, your app will be accessible at:

**https://dhanushgwu1995.github.io/6101-mid-term-project/**

Share this link in your project documentation!
