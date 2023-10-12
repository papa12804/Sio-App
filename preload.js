// preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('speed', {
    CallCpuFanSpeed: () => {
        ipcRenderer.send('call-cpu-fan-speed')
    }
})

ipcRenderer.on('update-cpu-fan-speed', (event, value) => {
    console.log(value);
    document.getElementById('cpu-fan-speed').innerHTML = value;
})