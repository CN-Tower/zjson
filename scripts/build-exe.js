const fn = require('funclib');
const path = require('path');
const glob = require('glob');
const installer = require('electron-installer-windows');

const rootPath = path.resolve(__dirname, '../');
const srcPath = path.join(rootPath, 'package/zjson-win32-x64');
const outPath = path.join(rootPath, 'package');

const files = glob.sync(path.join(outPath, '*(RELEASES|*.nupkg|*.exe)'));
files.forEach(f => fn.rm(f));

(async () => {
  await installer({
    src: srcPath,
    dest: outPath,
    authors: [ 'CN-Tower' ],
    noMsi: true,
    name: 'zjson',
    productName: 'zjson',
    exe: 'zjson.exe',
    icon: path.join(rootPath, 'electron-app/zjson.ico'),
    iconNuget: path.join(rootPath, 'electron-app/zjson.ico'),
    homepage: 'https://www.zjson.net',
    description: 'A powerful json formate tool!',
  });
})();
