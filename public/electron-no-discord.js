const { app, BrowserWindow, ipcMain, session } = require('electron');
const path = require('path');

// Simple development check instead of electron-is-dev
const isDev = process.env.NODE_ENV === 'development' || process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath);

// Ad blocking configuration
const adBlockingDomains = [
  // Google Ads
  '*://*.doubleclick.net/*',
  '*://*.googlesyndication.com/*',
  '*://*.googleadservices.com/*',
  '*://*.google-analytics.com/*',
  '*://*.googletagmanager.com/*',
  '*://*.googletagservices.com/*',
  
  // Common ad networks
  '*://*.adsafeprotected.com/*',
  '*://*.amazon-adsystem.com/*',
  '*://*.facebook.com/tr*',
  '*://*.outbrain.com/*',
  '*://*.taboola.com/*',
  '*://*.criteo.com/*',
  '*://*.adsystem.amazon.com/*',
  
  // Video ad networks
  '*://*.imasdk.googleapis.com/*',
  '*://*.youtube.com/api/stats/ads*',
  '*://*.youtube.com/ptracking*',
  '*://*.youtube.com/pagead/*',
  
  // Streaming-specific ad domains
  '*://*.ads.yahoo.com/*',
  '*://*.advertising.com/*',
  '*://*.adsystem.amazon.com/*',
  '*://*.amazon-adsystem.com/*',
  
  // Additional common ad patterns
  '*://*/ads/*',
  '*://*/advertisement/*',
  '*://*/advertising/*',
  '*://*ads*.*/*',
  '*://*advertisement*.*/*'
];

// Initialize ad blocking
function initAdBlocking() {
  console.log('🛡️ Initializing ad blocking...');
  
  session.defaultSession.webRequest.onBeforeRequest(
    { urls: adBlockingDomains },
    (details, callback) => {
      console.log('🚫 Blocked ad request:', details.url);
      callback({ cancel: true });
    }
  );
  
  // Also block based on resource type
  session.defaultSession.webRequest.onBeforeRequest(
    { urls: ['*://*/*'] },
    (details, callback) => {
      const url = details.url.toLowerCase();
      
      // Block common ad-related keywords in URLs
      const adKeywords = [
        'doubleclick', 'googlesyndication', 'googleadservices',
        'adsystem', 'advertising', 'advertisement', 'adsafeprotected',
        'outbrain', 'taboola', 'criteo', 'amazon-adsystem',
        'imasdk', 'pagead', 'adsense'
      ];
      
      const isAdRequest = adKeywords.some(keyword => url.includes(keyword));
      
      if (isAdRequest) {
        console.log('🚫 Blocked ad request (keyword match):', details.url);
        callback({ cancel: true });
      } else {
        callback({ cancel: false });
      }
    }
  );
  
  console.log('✅ Ad blocking initialized successfully');
}

let mainWindow;

// Dummy Discord RPC functions (no-op)
function setActivity(details, state, largeImageKey = 'logo', smallImageKey = null) {
  console.log('🎮 Discord RPC disabled - would set:', details, '-', state);
}

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
      preload: path.join(__dirname, 'preload.js')
    },
    titleBarStyle: 'default',
    show: false, // Don't show until ready
    backgroundColor: '#000000'
  });

  // Load the app
  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../build/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  // Show window when ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Focus on the window
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  console.log('✅ VoidStream started without Discord RPC');
}

// App event handlers
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers for Discord RPC updates from renderer (dummy implementations)
ipcMain.handle('update-discord-activity', (_, { details, state, largeImageKey, smallImageKey }) => {
  setActivity(details, state, largeImageKey, smallImageKey);
});

ipcMain.handle('set-watching-activity', (_, { title, episode }) => {
  const details = `Watching: ${title}`;
  const state = episode ? `Episode ${episode}` : 'Enjoying content';
  setActivity(details, state, 'logo', 'play');
});

ipcMain.handle('set-browsing-activity', (_, { section }) => {
  setActivity('Browsing VoidStream', section || 'Exploring content');
});