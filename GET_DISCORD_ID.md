# 🎮 Enable Discord Rich Presence

## ✅ App is Working!
Your VoidStream app is now running perfectly! Discord RPC is currently disabled but ready to enable.

## 🚀 Quick Discord Setup (5 minutes):

### Step 1: Create Discord Application
1. **Go to**: [https://discord.com/developers/applications](https://discord.com/developers/applications)
2. **Click**: "New Application" 
3. **Name**: "VoidStream"
4. **Click**: "Create"

### Step 2: Get Your Application ID
1. **Copy** the "Application ID" (long number like `1234567890123456789`)
2. **Open** `public/electron.js` in your code editor
3. **Find line 11**: `const clientId = '1401213821023948850';`
4. **Replace** with your ID: `const clientId = 'YOUR_ID_HERE';`

### Step 3: Upload App Logo
1. **Go to** "Rich Presence" → "Art Assets"
2. **Upload** your logo.png with name **"logo"**
3. **Save Changes**

### Step 4: Enable Discord RPC
**Option A**: Double-click `enable-discord.bat`
**Option B**: Run these commands:
```bash
npm install discord-rpc
npm run electron-dev
```

## 🎮 What You'll Get:
- Discord status showing "Playing VoidStream"
- Activity updates: "Browsing Home", "Watching: Movie Title", etc.
- Beautiful app logo in your Discord profile
- Episode information for TV shows

## 🔧 Troubleshooting:
- **Make sure Discord desktop app is running** (not browser)
- **Wait 10-15 seconds** for Discord to update
- **Check console logs** for connection status
- **Try restarting Discord** if it doesn't appear

## 💡 Current Status:
- ✅ **App works perfectly** without Discord
- ⚠️ **Discord RPC is disabled** (no errors)
- 🎯 **Ready to enable** when you get your Discord App ID

---

**Your app is fully functional! Discord RPC is just an optional bonus feature.**