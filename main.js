const { app, BrowserWindow } = require("electron");

const randomId = Math.floor(Math.random() * 1000);
app.setPath("userData", "/tmp/ssb-tribes2-demo-userdata-" + randomId);

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");

  win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
