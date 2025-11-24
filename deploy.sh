#!/bin/bash

# CHD Prediction System - Deployment Script
# This script helps deploy your application to GitHub Pages and Render.com

echo "╔══════════════════════════════════════════════════════════════════════════╗"
echo "║            CHD Prediction System - Deployment Script                    ║"
echo "╚══════════════════════════════════════════════════════════════════════════╝"
echo ""

# Function to display section headers
section() {
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "$1"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
}

# Check if we're in the correct directory
if [ ! -d "chd-prediction-bot" ]; then
    echo "❌ Error: Must run from project root directory"
    exit 1
fi

# Step 1: Build Frontend for Production
section "Step 1: Building Angular Frontend for Production"

cd chd-prediction-bot

echo "📦 Installing dependencies..."
npm install

echo "🏗️  Building production bundle..."
ng build --configuration production --base-href "/6101-mid-term-project/"

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors and try again."
    exit 1
fi

echo "✅ Build successful!"

# Step 2: Deploy to GitHub Pages
section "Step 2: Deploy Frontend to GitHub Pages"

echo "🚀 Deploying to GitHub Pages..."
npx angular-cli-ghpages --dir=dist/chd-prediction-bot --no-silent

if [ $? -eq 0 ]; then
    echo "✅ Frontend deployed successfully!"
    echo "🌐 Your app will be available at:"
    echo "   https://DhanushGWU1995.github.io/6101-mid-term-project/"
else
    echo "❌ Deployment failed!"
    exit 1
fi

cd ..

# Step 3: Prepare Backend for Deployment
section "Step 3: Preparing Backend for Render.com"

echo "📝 Checking Dockerfile..."
if [ -f "api/Dockerfile" ]; then
    echo "✅ Dockerfile found"
else
    echo "❌ Dockerfile not found in api/ directory"
    exit 1
fi

echo "📝 Checking render.yaml..."
if [ -f "render.yaml" ]; then
    echo "✅ render.yaml found"
else
    echo "❌ render.yaml not found"
    exit 1
fi

echo "📝 Checking model file..."
if [ -f "models/rf_chd_model.rds" ]; then
    echo "✅ Model file found"
else
    echo "❌ Model file not found in models/ directory"
    exit 1
fi

# Step 4: Commit and Push Changes
section "Step 4: Committing Changes to GitHub"

git add .
git status

echo ""
read -p "📝 Enter commit message (or press Enter for default): " commit_msg

if [ -z "$commit_msg" ]; then
    commit_msg="Deploy CHD Prediction System - $(date '+%Y-%m-%d %H:%M')"
fi

git commit -m "$commit_msg"

echo ""
read -p "🚀 Push to GitHub? (y/n): " push_confirm

if [ "$push_confirm" = "y" ] || [ "$push_confirm" = "Y" ]; then
    git push origin dhanush-mid-term-project-data-science
    echo "✅ Changes pushed to GitHub!"
else
    echo "⏸️  Skipped pushing to GitHub"
fi

# Step 5: Instructions for Render.com
section "Step 5: Deploy Backend on Render.com"

echo "📋 To complete backend deployment:"
echo ""
echo "1. Go to https://render.com and sign in with GitHub"
echo "2. Click 'New' → 'Web Service'"
echo "3. Connect your '6101-mid-term-project' repository"
echo "4. Render will automatically detect render.yaml"
echo "5. Click 'Create Web Service'"
echo "6. Wait 5-10 minutes for deployment"
echo ""
echo "Your API will be available at:"
echo "   https://chd-prediction-api.onrender.com"
echo ""
echo "After deployment, test your API:"
echo "   Health: https://chd-prediction-api.onrender.com/health"
echo "   Docs: https://chd-prediction-api.onrender.com/__docs__/"

# Step 6: Final Instructions
section "Deployment Complete!"

echo ""
echo "✅ Frontend deployed to GitHub Pages"
echo "📝 Backend ready for Render.com deployment"
echo ""
echo "🔗 Your URLs:"
echo "   Frontend: https://DhanushGWU1995.github.io/6101-mid-term-project/"
echo "   Backend: https://chd-prediction-api.onrender.com (after Render deployment)"
echo ""
echo "📖 Full deployment guide: DEPLOYMENT_GUIDE.md"
echo ""
echo "🎉 Happy deploying!"
