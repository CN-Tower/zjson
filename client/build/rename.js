const fn = require('funclib');
const path = require('path');
const pkg = require('../package.json');

const rootPath = path.resolve(__dirname, '../');

const programType = process.argv[2];

if (programType === 'dmg') {
  const srcPath = path.join(rootPath, 'zjson-darwin-x64.dmg');
  const pkgName = path.join(rootPath, `zjson-darwin-x64-v${pkg.version}.dmg`);
  fn.mv(srcPath, pkgName);
  fn.log(`打包完成: ${fn.chalk(pkgName, 'blue')}`, '#zjson');
}