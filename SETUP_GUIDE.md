# VoidStream Desktop App Setup Guide

## Quick Start (Windows)

### Option 1: Using Batch Files (Easiest)
1. Double-click `start-dev.bat` to start development
2. Double-click `build-app.bat` to build the desktop app

### Option 2: Manual Setup
1. Install Node.js 16+ from [nodejs.org](https://nodejs.org)
2. Open Command Prompt or PowerShell in the project folder
3. Run: `npm install`
4. Run: `npm run electron-dev` for development
5. Run: `npm run electron-pack-win` to build the app

## Discord Rich Presence Setup

1. Follow the guide in `DISCORD_SETUP.md`
2. Create a Discord application at [discord.com/developers/applications](https://discord.com/developers/applications)
3. Replace the Client ID in `public/electron.js`
4. Upload your logo as the "logo" asset

## App Features

### Desktop Integration
- ✅ Native Windows application
- ✅ Custom app icon (logo.png)
- ✅ System tray support
- ✅ Auto-updater ready
- ✅ Installer creation (NSIS)

### Discord Integration
- ✅ Rich Presence showing current activity
- ✅ Movie/show titles in status
- ✅ Episode information for TV shows
- ✅ Beautiful status icons

### Streaming Features
- ✅ Multiple streaming sources
- ✅ Built-in ad blocker
- ✅ Full-screen support
- ✅ Episode navigation
- ✅ Library management

## Building for Distribution

### Development Build
```bash
npm run electron-dev
```

### Production Build
```bash
npm run electron-pack-win    # Windows installer
npm run electron-pack-mac    # macOS app (requires macOS)
npm run electron-pack-linux  # Linux AppImage
```

### Output Files
- Windows: `dist/VoidStream Setup 1.0.0.exe`
- macOS: `dist/VoidStream-1.0.0.dmg`
- Linux: `dist/VoidStream-1.0.0.AppImage`

## Troubleshooting

### Common Issues
1. **Node.js not found**: Install Node.js 16+
2. **npm not recognized**: Restart terminal after Node.js installation
3. **Build fails**: Run `npm install` first
4. **Discord not working**: Check Client ID and Discord app setup
5. **App won't start**: Check if port 3000 is available

### Development Tips
- Use `npm run electron-dev` for hot reloading
- Check browser console for React errors
- Check Electron console for main process errors
- Use Discord Developer Mode to test Rich Presence

## File Structure
```
voidstream/
├── public/
│   ├── electron.js      # Main Electron process
│   ├── preload.js       # Preload script
│   └── logo.png         # App icon
├── src/
│   ├── services/
│   │   └── discordRPC.js # Discord integration
│   └── ...
├── build/               # React build output
├── dist/                # Electron build output
└── node_modules/        # Dependencies
```

## Support

For issues or questions:
1. Check this guide first
2. Look at the console for error messages
3. Ensure all dependencies are installed
4. Try rebuilding the app

---

**Happy Streaming! 🎬**