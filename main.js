// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const isDev = require('electron-is-dev');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow


// To prevent window from closing
let preventWindowClose = false
let loading = false

function setPreventWindowClose(toggle) {
  preventWindowClose = toggle
}

function setLoading(status) {
  loading = status
}


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.setMinimumSize(600, 500)
  mainWindow.maximize()

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')

  if (isDev) {
     mainWindow.loadURL(`file://${__dirname}/index.html`);
   } else {
     // TODO fix this
     mainWindow.loadURL(`file://${__dirname}/build/index.html`);
   }

  mainWindow.on("closed", () => (mainWindow = null));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Prevent window from closing
  mainWindow.on('close', e => { if(preventWindowClose || loading) e.preventDefault() })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  app.quit()
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if(mainWindow === null) createWindow()
})

app.on('browser-window-focus', (event, win) => {
  if (!win.isDevToolsOpened()) {
    win.openDevTools();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


module.exports = {
  setPreventWindowClose,
  setLoading
}
