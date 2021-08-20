const fn = require('funclib');
const path = require('path');
const electronInstaller = require('electron-winstaller');
const pkg = require('../package.json');

const rootPath = path.resolve(__dirname, '../');
const srcPath = path.join(rootPath, 'build/package/zjson-win32-x64');
const pkgName = `zjson-win32-x64-v${pkg.version}.exe`;
const pkgPath = path.join(rootPath, pkgName);

(async () => {
  try {
    await electronInstaller.createWindowsInstaller({
      appDirectory: 'build/package/zjson-win32-x64',
      outputDirectory: '.',
      authors: 'CN-Tower',
      exe: pkgName,
    });
    fn.log(`打包完成: ${fn.chalk(pkgPath, 'blue')}`, '#zjson');
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }
})();
