# Collaboration Guide

## Adding Collaborators to the Repository

### For Repository Owner (DhanushGWU1995)

To provide write access to team members, follow these steps:

#### Method 1: GitHub Web Interface (Recommended)
1. Go to your repository on GitHub: `https://github.com/DhanushGWU1995/6101-mid-term-project`
2. Click on the **Settings** tab
3. In the left sidebar, click on **Manage access** (or **Collaborators**)
4. Click the **Add people** button
5. Enter the GitHub username: `hengjuichu`
6. Select the permission level: **Write** (allows push access)
7. Click **Add hengjuichu to this repository**
8. The user will receive an email invitation to collaborate

#### Method 2: GitHub CLI (Alternative)
If you have GitHub CLI installed, you can use:
```bash
gh repo add-collaborator hengjuichu --permission write
```

#### Method 3: GitHub API (Advanced)
```bash
curl -X PUT \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/DhanushGWU1995/6101-mid-term-project/collaborators/hengjuichu \
  -d '{"permission":"write"}'
```

### For hengjuichu (Collaborator)

Once you receive the collaboration invitation:

1. Check your email for the GitHub invitation
2. Click **Accept invitation** in the email
3. Or go to: `https://github.com/DhanushGWU1995/6101-mid-term-project/invitations`
4. Accept the pending invitation

After accepting, you will have write access to:
- Push commits directly to branches
- Create and merge pull requests
- Manage issues and discussions
- Edit repository files through the web interface

### Repository Access Levels

- **Read**: Can view and clone the repository
- **Triage**: Can manage issues and pull requests without write access
- **Write**: Can push to the repository and manage issues/PRs
- **Maintain**: Can manage the repository without access to sensitive actions
- **Admin**: Full access to the repository including settings

### Team Member GitHub Usernames

Based on the README.md, the team consists of:
- **Dhanush** (Repository Owner: DhanushGWU1995)
- **Heng Jui** (GitHub Username: hengjuichu) ← **Needs write access**
- **Adithya** (GitHub Username: TBD)
- **Nikhil** (GitHub Username: TBD)

### Next Steps

1. **Immediate Action Required**: Repository owner should add `hengjuichu` as a collaborator with write permissions
2. **Future Actions**: Collect GitHub usernames for Adithya and Nikhil, then add them as collaborators
3. **Best Practices**: Consider creating a branching strategy and contribution guidelines

### Troubleshooting

**Issue**: User doesn't receive invitation email
- **Solution**: Check spam folder, or go directly to the repository and look for invitation banner

**Issue**: User can't push to repository
- **Solution**: Ensure invitation was accepted and permission level is set to "Write" or higher

**Issue**: Private repository not visible
- **Solution**: User must be added as collaborator first, then accept invitation

### Security Best Practices

1. Only add trusted team members as collaborators
2. Use branch protection rules for important branches
3. Review pull requests before merging
4. Regularly audit collaborator access
5. Remove access when team members leave the project