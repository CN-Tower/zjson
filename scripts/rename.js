const fn = require('funclib');
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');
const glob = require('glob');

const rootPath = path.resolve(__dirname, '../');
const programType = process.argv[2];

if (programType === 'dmg') {
  const srcPath = path.join(rootPath, 'package/zjson-darwin-x64.dmg');
  const pkgName = path.join(rootPath, `zjson-darwin-x64-v${pkg.version}.dmg`);
  if (fs.existsSync(pkgName)) fn.rm(pkgName);
  fn.timeout(500, () => {
    fn.mv(srcPath, pkgName);
    fn.log(`打包完成: ${fn.chalk(pkgName, 'blue')}`, '#zjson');
  });
}
else if (programType === 'exe') {
  const srcPath = path.join(rootPath, `package`);
  const pkgName = path.join(rootPath, `zjson-win32-x64-v${pkg.version}.exe`);
  const exes = glob.sync(`${srcPath}/*.exe`);
  const nupkgs = glob.sync(`${srcPath}/*.nupkg`);
  nupkgs.forEach(nupkg => fn.rm(nupkg));
  fn.rm(path.join(srcPath, 'RELEASES'));
  if (exes.length) {
    const exe = exes.shift();
    exes.forEach(ex => fn.rm(ex));
    if (fs.existsSync(pkgName)) fn.rm(pkgName);
    fn.timeout(500, () => {
      fn.mv(exe, pkgName);
      fn.log(`打包完成: ${fn.chalk(pkgName, 'blue')}`, '#zjson');
    });
  }
}
