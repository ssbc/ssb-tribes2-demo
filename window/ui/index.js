const { BrowserWindow } = require('electron')
const path = require('path')

module.exports = function startUI () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  })

  // and load the index.html of the app.
  win.loadFile(path.join(__dirname, 'index.html'))

  // Open the DevTools.
  win.webContents.openDevTools()

  return win
}
