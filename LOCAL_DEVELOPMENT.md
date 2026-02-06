# Local Development Guide

## Option 1: Salesforce Local Development Server (Recommended)

The Salesforce Local Development Server allows you to preview LWC components locally while connected to your org.

### Setup

1. **Install Salesforce CLI** (if not already installed):
```bash
npm install -g @salesforce/cli
```

2. **Authenticate with your org**:
```bash
sf org login web
```

3. **Start the local development server**:
```bash
sf project deploy start --source-dir force-app/main/default/lwc/personalizedPicks
sf project deploy start --source-dir force-app/main/default/lwc/personalizedPicksDemo

# Start local dev server
sf project deploy start --source-dir force-app/main/default/lwc --target-org your-org-alias
```

4. **Access via VS Code**:
   - Install "Salesforce Extension Pack" in VS Code
   - Right-click on `personalizedPicksDemo.html`
   - Select "SFDX: Preview Component Locally"
   - This opens a browser window with the component

### Alternative: Use `sfdx` commands (if using older CLI)

```bash
# Authenticate
sfdx auth:web:login

# Start local dev server
sfdx force:lightning:lwc:start
```

Then navigate to the preview URL shown in the terminal.

---

## Option 2: VS Code Preview (Easiest)

If you have VS Code with Salesforce Extensions:

1. **Install Salesforce Extension Pack**:
   - Open VS Code
   - Extensions → Search "Salesforce Extension Pack"
   - Install

2. **Authenticate**:
   - Command Palette (Cmd+Shift+P / Ctrl+Shift+P)
   - Type "SFDX: Authorize an Org"
   - Follow prompts

3. **Preview Component**:
   - Right-click `personalizedPicksDemo.html`
   - Select "SFDX: Preview Component Locally"
   - Browser opens with component preview

---

## Option 3: Standalone HTML Preview (Limited)

I can create a standalone HTML file that mimics the component structure, but it will:
- ❌ Not use actual LWC runtime
- ❌ Not have SLDS styling (would need CDN)
- ❌ Not have base components (lightning-button, etc.)
- ✅ Show visual structure
- ✅ Work completely offline

Would you like me to create this? It's useful for design review but not functional.

---

## Option 4: Deploy and View in Org (Most Complete)

This is the recommended approach for full functionality:

1. **Deploy**:
```bash
cd "WSI Feb 2026"
sf org login web
sf project deploy start --source-dir force-app/main/default/lwc
```

2. **View in Salesforce**:
   - Go to your org
   - Setup → App Builder
   - Create/Edit Lightning Page
   - Add "Personalized Picks Demo" component
   - Save and view

---

## Quick Comparison

| Method | Setup Time | Functionality | SLDS Styling | Best For |
|--------|-----------|---------------|--------------|----------|
| **Local Dev Server** | 5 min | ✅ Full | ✅ Yes | Development |
| **VS Code Preview** | 2 min | ✅ Full | ✅ Yes | Quick preview |
| **Standalone HTML** | 1 min | ❌ Limited | ⚠️ Partial | Design review |
| **Deploy to Org** | 3 min | ✅ Full | ✅ Yes | Testing |

---

## Troubleshooting

### "Command not found: sf"
Install Salesforce CLI:
```bash
npm install -g @salesforce/cli
```

### "No org authenticated"
Run:
```bash
sf org login web
```

### VS Code preview not working
- Ensure Salesforce Extension Pack is installed
- Check that you're authenticated: Command Palette → "SFDX: Show All Active Orgs"

---

**Recommendation**: Use **VS Code Preview** for quick local viewing, or **deploy to org** for full testing.
