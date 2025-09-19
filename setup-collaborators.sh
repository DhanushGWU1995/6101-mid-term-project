#!/bin/bash

# GitHub Repository Collaborator Setup Script
# Usage: ./setup-collaborators.sh

set -e

REPO="DhanushGWU1995/6101-mid-term-project"
TARGET_USER="hengjuichu"
PERMISSION="write"

echo "🚀 Setting up repository collaborators for $REPO"
echo "=================================================="

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "📋 Please use the manual method described in COLLABORATION.md"
    echo "🔗 Install GitHub CLI: https://cli.github.com/"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ You are not authenticated with GitHub CLI."
    echo "🔐 Please run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is installed and authenticated"

# Add collaborator
echo "➕ Adding $TARGET_USER as a collaborator with $PERMISSION permissions..."

if gh repo add-collaborator "$TARGET_USER" --permission "$PERMISSION" --repo "$REPO"; then
    echo "✅ Successfully added $TARGET_USER as a collaborator!"
    echo "📧 $TARGET_USER will receive an email invitation"
    echo "🔗 They can also accept at: https://github.com/$REPO/invitations"
else
    echo "❌ Failed to add collaborator. This might be because:"
    echo "   • You don't have admin access to the repository"
    echo "   • The username '$TARGET_USER' doesn't exist"
    echo "   • The user is already a collaborator"
    echo ""
    echo "📋 Please use the manual method described in COLLABORATION.md"
fi

echo ""
echo "📚 For more detailed instructions, see COLLABORATION.md"
echo "🔗 Repository settings: https://github.com/$REPO/settings/access"