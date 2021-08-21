const fn = require('funclib');
const path = require('path');
const pkg = require('../package.json');
const installer = require('electron-installer-windows')

const rootPath = path.resolve(__dirname, '../');
const srcPath = path.join(rootPath, 'package/zjson-win32-x64');
const pkgName = `zjson-win32-x64-v${pkg.version}.exe`;
const exeName = `${pkgName}.exe`;
const pkgPath = path.join(rootPath, exeName);

(async () => {
  try {
    await installer({
      src: srcPath,
      dest: rootPath,
      authors: [ 'CN-Tower' ],
      noMsi: true,
      name: pkgName,
      productName: pkgName,
      exe: exeName,
      icon: path.join(srcPath, 'resources/app/zjson.ico'),
      iconNuget: path.join(srcPath, 'resources/app/zjson.ico'),
      homepage: 'https://www.zjson.net',
      description: 'A powerful json formate tool!',
    });
    fn.log(`打包完成: ${fn.chalk(pkgPath, 'blue')}`, '#zjson');
  } catch (err) {
    console.error(err, err.stack);
    process.exit(1);
  }
})();
