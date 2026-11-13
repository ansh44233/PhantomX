# Discord Rich Presence Setup Guide

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Discord Application
1. **Open Discord Developer Portal**: [https://discord.com/developers/applications](https://discord.com/developers/applications)
2. **Click "New Application"**
3. **Name it "VoidStream"** (exactly like this)
4. **Click "Create"**

### Step 2: Get Your Application ID
1. In your new application, stay on **"General Information"** tab
2. **Copy the "Application ID"** (it's a long number like `1234567890123456789`)
3. **Open `public/electron.js`** in your code editor
4. **Replace the clientId** on line 11:
   ```javascript
   const clientId = 'YOUR_APPLICATION_ID_HERE'; // Paste your ID here
   ```

### Step 3: Upload App Logo
1. Go to **"Rich Presence"** tab in Discord Developer Portal
2. Click **"Art Assets"**
3. **Upload your logo.png** with the name **"logo"** (exactly like this)
4. **Click "Save Changes"**

### Step 4: Test It!
1. **Make sure Discord is running** on your computer
2. **Run the app**: `npm run electron-dev`
3. **Check your Discord profile** - you should see "Playing VoidStream"

## 🎮 Rich Presence Features

Your Discord status will show:
- **🏠 Browsing**: "Browsing Home", "Viewing Library", etc.
- **🎬 Watching**: "Watching: Movie Title" with episode info
- **🔍 Searching**: "Searching for: query"
- **📋 Details**: "Viewing Details: Movie Title"

## 🔧 Troubleshooting

### Not showing in Discord?
1. **Check Discord is running** (desktop app, not browser)
2. **Verify Client ID** is correct in `public/electron.js`
3. **Check console logs** in Electron dev tools for errors
4. **Wait 10-15 seconds** for Discord to update

### Common Issues:
- ❌ **"Invalid Client ID"**: Double-check you copied the Application ID correctly
- ❌ **"Logo not showing"**: Make sure you uploaded the asset as "logo" (lowercase)
- ❌ **"No activity"**: Ensure Discord desktop app is running, not browser version

### Debug Steps:
1. **Open Electron Dev Tools** (F12 in the app)
2. **Check Console** for Discord RPC messages:
   - ✅ "Discord RPC connected successfully!"
   - ❌ "Discord RPC login failed"
3. **Look for activity updates**: "Setting Discord activity"

## 📝 Example Setup

If your Application ID is `1234567890123456789`, your `electron.js` should look like:
```javascript
const clientId = '1234567890123456789'; // Your actual ID here
```

## 🎯 Pro Tips

- **Use Discord Desktop**: Rich Presence only works with desktop Discord, not browser
- **Keep Discord Open**: The app needs Discord running to show status
- **Asset Names Matter**: Upload logo as "logo" (lowercase, no extension)
- **Be Patient**: Discord can take 10-15 seconds to update status

---

**Need help?** Check the console logs in Electron dev tools for detailed error messages!