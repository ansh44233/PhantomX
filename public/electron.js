const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Disable security warnings and enable API access
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// Add command line switches for better API access (must be before app ready)
app.commandLine.appendSwitch('--disable-web-security');
app.commandLine.appendSwitch('--disable-features', 'VizDisplayCompositor');
app.commandLine.appendSwitch('--ignore-certificate-errors');
app.commandLine.appendSwitch('--ignore-ssl-errors');
app.commandLine.appendSwitch('--ignore-certificate-errors-spki-list');

// Simple development check instead of electron-is-dev
const isDev = process.env.NODE_ENV === 'development' || process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath);

// Discord Rich Presence setup (Ultra-safe implementation)
const clientId = '1406172988881113098'; // Replace with your Discord app client ID
let rpc = null;
let discordEnabled = false;
let mainWindow;

// Discord RPC initialization - ENABLED
async function initDiscordRPC() {
  try {
    console.log('🎮 Loading Discord RPC module...');
    const DiscordRPC = require('discord-rpc');
    
    console.log('🎮 Creating Discord RPC client...');
    console.log('🎮 Client ID:', clientId);
    rpc = new DiscordRPC.Client({ transport: 'ipc' });
    
    // Set up event handlers
    rpc.on('ready', () => {
      console.log('✅ Discord RPC connected successfully!');
      console.log('✅ Discord user:', rpc.user?.username || 'Unknown');
      discordEnabled = true;
      
      // Set initial activity immediately
      console.log('🎮 Setting initial Discord activity...');
      safeSetActivity('Browsing', 'Exploring VoidStream');
    });

    rpc.on('disconnected', () => {
      console.log('❌ Discord RPC disconnected');
      discordEnabled = false;
      rpc = null;
    });

    // Attempt login
    console.log('🎮 Attempting Discord RPC login...');
    await rpc.login({ clientId });
    console.log('✅ Discord RPC login initiated successfully');
    
  } catch (error) {
    console.error('❌ Discord RPC initialization failed:', error);
    console.log('💡 Make sure Discord desktop app is running');
    console.log('💡 Check if Client ID is correct:', clientId);
    rpc = null;
    discordEnabled = false;
  }
}

// Discord activity setter - ENABLED
function safeSetActivity(details, state, largeImageKey = 'logo', smallImageKey = null, buttons = null, party = null, joinSecret = null) {
  if (!rpc || !discordEnabled) {
    console.log('⚠️ Discord RPC not connected - skipping activity:', details);
    return;
  }
  
  try {
    const activity = {
      details: details,
      state: state,
      startTimestamp: Date.now(),
      largeImageKey: largeImageKey,
      largeImageText: 'VoidStream',
      instance: false,
    };

    if (smallImageKey) {
      activity.smallImageKey = smallImageKey;
      activity.smallImageText = 'Watching';
    }

    if (buttons) {
      activity.buttons = buttons;
    }

    if (party) {
      activity.party = party;
    }

    if (joinSecret) {
      activity.joinSecret = joinSecret;
    }

    console.log('🎮 Setting Discord activity:', details, '-', state);
    
    rpc.setActivity(activity)
      .then(() => {
        console.log('✅ Discord activity updated successfully!');
      })
      .catch((error) => {
        console.error('❌ Discord activity failed:', error);
        console.log('💡 Disabling Discord RPC due to error');
        discordEnabled = false;
        rpc = null;
      });
      
  } catch (error) {
    console.error('❌ Discord activity error:', error);
    discordEnabled = false;
    rpc = null;
  }
}

// Alias for compatibility
const setActivity = safeSetActivity;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, 'logo.png'), // App icon
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false, // Allow external API calls
      allowRunningInsecureContent: true, // Allow mixed content
      experimentalFeatures: true, // Enable experimental web features
      backgroundThrottling: false, // Prevent throttling of background requests
      additionalArguments: ['--disable-web-security', '--disable-features=VizDisplayCompositor']
    },
    titleBarStyle: 'hidden', // Hide the default title bar
    frame: false, // Remove window frame completely
    show: false, // Don't show until ready
    backgroundColor: '#111111',
    autoHideMenuBar: true, // Hide menu bar
    menuBarVisible: false // Ensure menu bar is not visible
  });

  // Load the app
  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../build/index.html')}`;
  
  // Configure session for better API access
  const { session } = require('electron');
  const ses = session.defaultSession;
  
  // Set user agent
  ses.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 VoidStream/1.0.0');
  
  // Handle certificate errors
  ses.setCertificateVerifyProc((request, callback) => {
    // Allow all certificates for API calls
    callback(0);
  });

  // Set permissions for external requests
  ses.setPermissionRequestHandler((webContents, permission, callback) => {
    // Allow all permissions for API access
    callback(true);
  });

  // Handle CORS and security headers
  ses.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Access-Control-Allow-Origin': ['*'],
        'Access-Control-Allow-Methods': ['GET, POST, PUT, DELETE, OPTIONS'],
        'Access-Control-Allow-Headers': ['*'],
      }
    });
  });

  mainWindow.loadURL(startUrl);

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Only open dev tools in development mode
    if (isDev) {
      mainWindow.webContents.openDevTools();
      console.log('Development mode - Dev tools opened');
    }
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Handle window focus/blur for Discord RPC (safely)
  mainWindow.on('focus', () => {
    setActivity('Using VoidStream', 'Active in app');
  });

  mainWindow.on('blur', () => {
    setActivity('VoidStream', 'Made By Rishab');
  });
}

// App event handlers
app.whenReady().then(() => {
  // Remove default menu bar completely
  const { Menu } = require('electron');
  Menu.setApplicationMenu(null);
  
  createWindow();
  console.log('✅ VoidStream started successfully');
  
  // Initialize Discord RPC immediately
  console.log('🎮 Starting Discord RPC initialization...');
  initDiscordRPC();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // Safe Discord cleanup
  if (rpc && discordEnabled) {
    try {
      rpc.clearActivity().catch(() => {}); // Ignore errors
      rpc.destroy().catch(() => {}); // Ignore errors
    } catch (error) {
      // Ignore cleanup errors
    }
  }
  
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  console.log('👋 VoidStream shutting down...');
  
  // Safe Discord cleanup
  if (rpc && discordEnabled) {
    try {
      rpc.clearActivity().catch(() => {});
      rpc.destroy().catch(() => {});
    } catch (error) {
      // Ignore cleanup errors
    }
  }
});

// IPC handlers for Discord RPC updates from renderer
ipcMain.handle('update-discord-activity', (_, { details, state, largeImageKey, smallImageKey, buttons, party, joinSecret }) => {
  setActivity(details, state, largeImageKey, smallImageKey, buttons, party, joinSecret);
});

ipcMain.handle('set-watching-activity', (_, { title, episode, buttons, party, joinSecret }) => {
  const details = `Watching: ${title}`;
  const state = episode ? `Episode ${episode}` : 'Enjoying content';
  setActivity(details, state, 'logo', 'play', buttons, party, joinSecret);
});

ipcMain.handle('set-browsing-activity', (_, { section }) => {
  setActivity('Browsing VoidStream', section || 'Exploring content');
});

// Window control handlers
ipcMain.handle('minimize-window', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.handle('maximize-window', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.handle('close-window', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});