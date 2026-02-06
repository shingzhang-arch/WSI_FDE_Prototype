# Quick Guide: Viewing Your LWC Component

## Option 1: Preview HTML (No Salesforce Needed) ✅

**You're already using this!** Just open `preview.html` in your browser.

```bash
# Already opened for you, or manually:
open preview.html
```

This shows the carousel design but **not** the actual LWC component.

---

## Option 2: View Actual LWC Component (Requires Salesforce Org)

### Step 1: Get a Salesforce Org

**Free Developer Org** (Recommended for testing):
1. Go to: https://developer.salesforce.com/signup
2. Sign up (free, takes 2 minutes)
3. You'll get a Developer Edition org

**Or use an existing Sandbox/Production org** if you have one.

### Step 2: Install Salesforce CLI

```bash
# Check if you have it
sf --version

# If not, install it:
npm install -g @salesforce/cli
```

### Step 3: Connect to Your Org

```bash
cd "/Users/shing.zhang/Documents/projects/WSI Feb 2026"
sf org login web
```

This opens a browser window to log in to your Salesforce org.

### Step 4: Deploy the Component

```bash
sf project deploy start --source-dir force-app/main/default/lwc
```

### Step 5: View in Salesforce

1. Go to your Salesforce org (the URL from Step 3)
2. Click the **Setup** gear icon (⚙️) → **Setup**
3. In Quick Find, search: **"Lightning App Builder"**
4. Click **"Lightning App Builder"**
5. Click **"New"** → Choose **"App Page"** or **"Home Page"**
6. Give it a name (e.g., "Personalized Picks Demo")
7. Drag **"Personalized Picks Demo"** from the left sidebar onto the page
8. Click **"Save"** → **"Activate"**
9. Assign it to an app (or create a new app)
10. Navigate to the page to see your component!

---

## Option 3: VS Code Preview (If You Have VS Code)

If you have VS Code with Salesforce extensions:

1. **Install Salesforce Extension Pack** in VS Code
2. **Authenticate**: Command Palette (Cmd+Shift+P) → "SFDX: Authorize an Org"
3. **Right-click** `personalizedPicksDemo.html`
4. **Select**: "SFDX: Preview Component Locally"
5. Browser opens with component preview

---

## Summary

| Method | Need Salesforce? | Setup Time | Best For |
|--------|----------------|------------|----------|
| **preview.html** | ❌ No | 0 min | Quick design review |
| **Deploy to Org** | ✅ Yes | 5 min | Full LWC testing |
| **VS Code Preview** | ✅ Yes | 3 min | Local development |

**Recommendation**: 
- Use **preview.html** for quick design checks (you're already doing this!)
- Use **Deploy to Org** when you want to test the actual LWC component

---

## Quick Commands Reference

```bash
# Check if Salesforce CLI is installed
sf --version

# Connect to org
sf org login web

# Deploy components
sf project deploy start --source-dir force-app/main/default/lwc

# Check deployment status
sf project deploy report
```
