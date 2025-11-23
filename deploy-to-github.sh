#!/bin/bash

# Deploy $ENGRISH to GitHub
# Run this script with: bash deploy-to-github.sh

echo "🚀 Initializing Git repository..."
git init

echo "📝 Configuring Git..."
git config user.name "juicegodlivin"
git config user.email "juicegodlivin@gmail.com"

echo "📦 Adding all files..."
git add .

echo "💾 Creating initial commit..."
git commit -m "Initial commit - $ENGRISH website ready for deployment"

echo "🌿 Setting main branch..."
git branch -M main

echo "🔗 Adding remote repository..."
git remote add origin https://github.com/juicegodlivin/engrish.git

echo "🚀 Pushing to GitHub..."
git push -u origin main

echo "✅ Done! Your code is now on GitHub!"
echo "🌐 Visit: https://github.com/juicegodlivin/engrish"
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com/new"
echo "2. Import your GitHub repository"
echo "3. Add environment variables"
echo "4. Deploy!"

