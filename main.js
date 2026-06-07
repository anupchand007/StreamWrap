const { app, BrowserWindow, shell, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Disable touch events to prevent media servers from switching to touch-only UI
app.commandLine.appendSwitch('disable-touch-events');

let mainWindow;

function getSavedUrl() {
  const configPath = path.join(app.getPath('userData'), 'config.json');
  try {
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, 'utf8')).serverUrl || '';
    }
  } catch (e) {}
  return '';
}

function saveUrl(url) {
  const configPath = path.join(app.getPath('userData'), 'config.json');
  try {
    fs.writeFileSync(configPath, JSON.stringify({ serverUrl: url }));
  } catch (e) {}
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    title: 'StreamWrap',
    autoHideMenuBar: true, 
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
      allowRunningInsecureContent: true
    }
  });

  // Spoofing Chrome User-Agent prevents media servers from breaking due to Electron detection
  mainWindow.webContents.userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

  const savedUrl = getSavedUrl();

  if (savedUrl) {
    mainWindow.loadURL(savedUrl);
  } else {
    mainWindow.loadFile('setup.html');
  }

  // Inject script to keep native OSD active
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.executeJavaScript(`
      (function() {
        let lastMove = 0;
        window.addEventListener('mousemove', () => {
          const now = Date.now();
          if (now - lastMove > 1000) {
            lastMove = now;
            const ev = new KeyboardEvent('keydown', {
              bubbles: true, cancelable: true, keyCode: 17, key: 'Control'
            });
            document.dispatchEvent(ev);
          }
        }, { passive: true });
      })();
    `);
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

ipcMain.on('save-url', (event, url) => {
  saveUrl(url);
  if (mainWindow) {
    mainWindow.loadURL(url);
  }
});

ipcMain.handle('get-url', () => {
  return getSavedUrl();
});

app.on('browser-window-created', function (e, window) {
    window.setMenu(null);
});

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
