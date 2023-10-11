// preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('speed', {
    cpufan: () => ipcRenderer.invoke('cpufan')
})