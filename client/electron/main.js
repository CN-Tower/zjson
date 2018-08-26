const {app, BrowserWindow, ipcMain} = require('electron')
const request = require("request");
const fn = require('funclib');
const fs = require('fs');
const path  = require('path');
const root = __dirname;
const tmpPath = path.resolve(__dirname, '../tmp');

let updateUrl, fileName;
let mainWindow;

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

function createWindow () {
  mainWindow = new BrowserWindow({width: 1200, height: 768});
  mainWindow.loadFile('index.html');
  mainWindow.on('closed', () => mainWindow = null);
}

function update() {
  fn.rm(tmpPath);
  fn.mk(tmpPath);
  const stream = fs.createWriteStream(path.join(tmpPath, 'zjson.zip'));
  request(updateUrl).pipe(stream).on("close", function (err) {
    console.log("文件[" + fileName + "]下载完毕");
  });
  fn.rm(path.join(root, 'zjson.js'));
  mainWindow.webContents.send('refresh', true);
}

function unPack() {

}