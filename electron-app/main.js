const {app, BrowserWindow, ipcMain} = require('electron');
const { ebtMain } = require('electron-baidu-tongji');
const windowStateKeeper = require('./window-state');

// const fetch = require('node-fetch');
// const fn = require('funclib');
// const fs = require('fs');
// const path  = require('path');
// const root = __dirname;
// const tmpPath = path.join(path.dirname(__dirname), 'tmp');
// let updateUrl, fileName;

let mainWindow;

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

/**
 * 程序主窗口
 */
function createWindow () {
  // 记录window的大小和位置
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1200,
    defaultHeight: 768,
  });
  const { x, y, width, height } = mainWindowState;

  // 创建主窗口
  mainWindow = new BrowserWindow({
    x,
    y,
    width,
    height,
    maximizable: true,
    minimizable: true,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      // 设置允许在渲染进程中使用require
      contextIsolation: false,
    },
  });

  // 开启开发者工具
  // mainWindow.webContents.openDevTools();
  
  mainWindow.setMenu(null);
  mainWindow.loadFile('index.html');
  mainWindow.on('closed', () => mainWindow = null);

  mainWindowState.manage(mainWindow);
}

ipcMain.on('minWindow', () => {
  if (mainWindow) mainWindow.unmaximize();
});
ipcMain.on('maxWindow', () => {
 if (mainWindow) mainWindow.maximize();
});

ebtMain(ipcMain);

// function update() {
//   fn.rm(tmpPath);
//   fn.mk(tmpPath);
//   const stream = fs.createWriteStream(path.join(tmpPath, 'zjson.zip'));
//   fetch(updateUrl).pipe(stream).on("close", function (err) {
//     if (err) mainWindow.webContents.send('refresh', true);
//   });
//   fn.rm(path.join(root, 'zjson.js'));
//   mainWindow.webContents.send('refresh', true);
// }
