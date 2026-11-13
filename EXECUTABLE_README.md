# VoidStream - Standalone Executable

## 🎉 Build Complete!

Your VoidStream app has been successfully built as a standalone executable! No need to manually run any backend servers - everything is integrated into the app.

## 📁 What Was Built

### Installer
- **`dist/VoidStream Setup 1.0.0.exe`** - Full installer for Windows
  - Installs the app to Program Files
  - Creates desktop and start menu shortcuts
  - Includes uninstaller

### Portable Version
- **`dist/win-unpacked/VoidStream.exe`** - Portable executable
  - No installation required
  - Can be run from any location
  - Self-contained with all dependencies

## 🚀 How to Use

### Option 1: Install the App
1. Run `dist/VoidStream Setup 1.0.0.exe`
2. Follow the installation wizard
3. Launch VoidStream from desktop or start menu

### Option 2: Run Portable Version
1. Navigate to `dist/win-unpacked/`
2. Double-click `VoidStream.exe`
3. The app will start immediately

### Option 3: Quick Test
Run the provided test script:
```bash
test-exe.bat
```

## ✅ What's Included

The executable includes everything needed to run VoidStream:

- **React Frontend** - Complete UI built and bundled
- **Electron Runtime** - Desktop app framework
- **Discord RPC** - Rich presence integration (if Discord is running)
- **All Dependencies** - No need to install Node.js or npm
- **Streaming Sources** - All configured streaming APIs
- **TMDB Integration** - Movie/TV show data fetching

## 🔧 Features

- **Self-Contained**: No external servers or manual setup required
- **Discord Integration**: Shows what you're watching (if Discord is running)
- **Multiple Streaming Sources**: Built-in support for various streaming providers
- **Offline Capable**: Core functionality works without internet (except streaming)
- **Auto-Updates**: Built-in update mechanism (can be configured)

## 📋 System Requirements

- **OS**: Windows 10/11 (64-bit)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 200MB for installation
- **Internet**: Required for streaming content
- **Discord**: Optional, for rich presence features

## 🛠️ Technical Details

### Architecture
- **Frontend**: React 18.2.0 with styled-components
- **Desktop**: Electron 19.1.9
- **Build Tool**: electron-builder 23.1.0
- **Package Size**: ~150MB (includes Chromium runtime)

### Security
- Context isolation enabled
- Node integration disabled in renderer
- Secure preload scripts
- No remote module access

## 🎮 Discord Integration

The app includes Discord Rich Presence that shows:
- Current viewing status
- Movie/show titles
- Episode information
- Custom VoidStream branding

Discord integration is automatic if Discord desktop app is running.

## 📦 Distribution

You can distribute the app by sharing:
- **For end users**: `VoidStream Setup 1.0.0.exe` (installer)
- **For portable use**: The entire `win-unpacked` folder
- **For developers**: The source code with build instructions

## 🔄 Updates

The app includes auto-update functionality. To enable:
1. Configure the `publish` section in `package.json`
2. Set up a GitHub release or other update server
3. Users will be notified of updates automatically

## 🐛 Troubleshooting

### App Won't Start
- Check Windows Defender/antivirus isn't blocking it
- Run as administrator if needed
- Ensure Windows 10/11 compatibility

### Discord Not Working
- Make sure Discord desktop app is running
- Check the client ID in the app settings
- Restart both Discord and VoidStream

### Streaming Issues
- Check internet connection
- Try different streaming sources
- Some sources may be region-restricted

## 📞 Support

If you encounter issues:
1. Check the console logs (Ctrl+Shift+I in the app)
2. Verify system requirements
3. Try running the portable version
4. Check firewall/antivirus settings

---

**Congratulations! Your VoidStream app is now ready for distribution! 🎊**