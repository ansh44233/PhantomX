const { contextBridge, ipcRenderer } = require('electron');

// Expose Discord RPC functions to renderer process
contextBridge.exposeInMainWorld('discordRPC', {
  updateActivity: (details, state, largeImageKey, smallImageKey) => 
    ipcRenderer.invoke('update-discord-activity', { details, state, largeImageKey, smallImageKey }),
  
  setWatchingActivity: (title, episode) => 
    ipcRenderer.invoke('set-watching-activity', { title, episode }),
  
  setBrowsingActivity: (section) => 
    ipcRenderer.invoke('set-browsing-activity', { section })
});

// No ad blocking - just Discord RPC
console.log('VoidStream preload script loaded (no ad blocking)');