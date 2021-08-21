const fn = require('funclib');
const path = require('path');
const electronInstaller = require('electron-winstaller');
const pkg = require('../package.json');

const rootPath = path.resolve(__dirname, '../');
const srcPath = path.join(rootPath, 'package/zjson-win32-x64');
const pkgName = `zjson-win32-x64-v${pkg.version}.exe`;
const pkgPath = path.join(rootPath, pkgName);

(async () => {
  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: srcPath,
      outputDirectory: rootPath,
      authors: 'CN-Tower',
      //exe: pkgName,
      setupIcon: path.join(srcPath, 'resources/app/zjson.ico'),
      iconUrl: path.join(srcPath, 'resources/app/zjson.ico'),
      noMsi: true,
      setupExe: pkgName,
      title: 'zjson',
      description: 'A powerful json formate tool!',
    });
    fn.log(`打包完成: ${fn.chalk(pkgPath, 'blue')}`, '#zjson');
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }
})();
