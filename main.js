// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain} = require('electron')
const path = require('node:path')
const ffi = require('ffi-napi')

const isDev = process.env.APP_DEV ? (process.env.APP_DEV.trim() == "true") : false;

// Load DLL
var dllPath = path.join(__dirname, 'lib\\SioSdk.dll');
if (!isDev) {
  dllPath = path.resolve(__dirname, '..\\lib\\SioSdk.dll');
}
console.log(`dllPath ${dllPath}`);
const SioSdk = ffi.Library(dllPath, {
    'Install': ['bool', []],
    'Open': ['bool', []],
    'Close': ['bool', []],
    'GetCpuFanSpeed': ['uint', []]
});

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
        	preload: path.join(__dirname, 'preload.js')
        }
    })

    // and load the index.html of the app.
    if (isDev) {
        mainWindow.loadURL('http://localhost:3000/');
        mainWindow.webContents.openDevTools()
    } else {
        mainWindow.loadFile('./build/index.html');
    }

    // Install and open service
    var result = SioSdk.Install();
    console.log(`Dev:${isDev}. Install service ${result}`);
    result = SioSdk.Open();
    console.log(`Open service ${result}`);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    result = SioSdk.Close();
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

function GetCpuFanSpeed() {
    const Speed = SioSdk.GetCpuFanSpeed();
    return Speed;
}

ipcMain.on('call-cpu-fan-speed', (event) => {
    const webContents = event.sender;
    const Speed = GetCpuFanSpeed();
    webContents.send('update-cpu-fan-speed', Speed);
})