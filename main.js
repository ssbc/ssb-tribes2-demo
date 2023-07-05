const { app, BrowserWindow, MessageChannelMain, ipcMain } = require('electron')

const startSSB = require('./window/ssb/index.js')
const startUI = require('./window/ui/index.js')

app.whenReady().then(() => {
  const ssb = startSSB();
  let ui = startUI()

  ipcMain.on('request-channel', (event) => {
    if (event.senderFrame !== ui.webContents.mainFrame) return
    // only the frames we expect can access the the backend

    const { port1, port2 } = new MessageChannelMain()
    ssb.webContents.postMessage('provide-ui-channel', null, [port1])
    ui.webContents.postMessage('provide-ssb-channel', null, [port2])
  })

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      ui = startUI();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
