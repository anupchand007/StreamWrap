const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  saveUrl: (url) => ipcRenderer.send('save-url', url),
  getUrl: () => ipcRenderer.invoke('get-url')
});

// OSD Bug Fix: The video player can block mouse events from bubbling up.
// By adding the listener in preload.js with `capture: true`, we intercept the mousemove
// *before* it gets blocked, and we dispatch a harmless 'Control' keypress to force the OSD open.
let lastMove = 0;
function wakeUpOSD() {
  const now = Date.now();
  if (now - lastMove > 1000) {
    lastMove = now;
    const ev = new KeyboardEvent('keydown', {
      bubbles: true, cancelable: true, keyCode: 17, key: 'Control'
    });
    document.dispatchEvent(ev);
  }
}
window.addEventListener('mousemove', wakeUpOSD, { capture: true, passive: true });
window.addEventListener('pointermove', wakeUpOSD, { capture: true, passive: true });
