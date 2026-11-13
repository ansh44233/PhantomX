const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Discord RPC methods
  updateDiscordActivity: (data) => ipcRenderer.invoke('update-discord-activity', data),
  setWatchingActivity: (data) => ipcRenderer.invoke('set-watching-activity', data),
  setBrowsingActivity: (data) => ipcRenderer.invoke('set-browsing-activity', data),
  
  // Window controls
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),
  
  // App info
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  
  // Platform info
  platform: process.platform
});

// Remove the loading text when the page loads
window.addEventListener('DOMContentLoaded', () => {
  console.log('VoidStream loaded successfully');
});