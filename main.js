import { app, BrowserWindow } from 'electron';

let mainWindow = null;

process.env.RUN_ENVIRON = 'client'

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({width: 1280, height: 720});
  mainWindow.loadURL('file://' + __dirname + '/desktop.html');
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
