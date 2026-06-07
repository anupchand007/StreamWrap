const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  saveUrl: (url) => ipcRenderer.send('save-url', url),
  getUrl: () => ipcRenderer.invoke('get-url')
});
