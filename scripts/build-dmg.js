const fn = require('funclib');
const path = require('path');
const glob = require('glob');
const createDMG = require('electron-installer-dmg');

const rootPath = path.resolve(__dirname, '../');
const srcPath = path.join(rootPath, 'package/zjson-darwin-x64/zjson.app');
const appPath = path.join(rootPath, 'package/zjson-darwin-x64/转杰森.app');
const outPath = path.join(rootPath, 'package');

const files = glob.sync(path.join(outPath, '*.dmg'));
files.forEach((f) => fn.rm(f));

// App重命名
fn.mv(srcPath, appPath);

createDMG(
  {
    appPath,
    out: outPath,
    name: 'zjson-darwin-x64',
    title: 'ZJSON',
    background: path.join(rootPath, 'electron-app/dmg-bg.png'),
    icon: path.join(rootPath, 'electron-app/zjson.icns'),
    overwrite: true,
  },
  (err) => {
    if (err) throw err;
  }
);
