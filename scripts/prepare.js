const fn = require('funclib');
const pkg = require('../package.json');

const ignStaTs  = /\/\*\*==================== electron ignore sta ====================\*\//mgi;
const ignEndTs  = /\/\*\*==================== electron ignore end ====================\*\//mgi;
const ignStaTs_ = /\/\*\*==================== electron ignore sta ======================/mgi;
const ignEndTs_ = /======================= electron ignore end ====================\*\//mgi;
const ignStaTsStr  = '/**==================== electron ignore sta ====================*/';
const ignEndTsStr  = '/**==================== electron ignore end ====================*/';
const ignStaTsStr_ = '/**==================== electron ignore sta ======================';
const ignEndTsStr_ = '======================= electron ignore end ====================*/';

const eabStaTs  = /\/\*\*==================== electron enable sta ====================\*\//mgi;
const eabEndTs  = /\/\*\*==================== electron enable end ====================\*\//mgi;
const eabStaTs_ = /\/\*\*==================== electron enable sta ======================/mgi;
const eabEndTs_ = /======================= electron enable end ====================\*\//mgi;
const eabStaTsStr  = '/**==================== electron enable sta ====================*/';
const eabEndTsStr  = '/**==================== electron enable end ====================*/';
const eabStaTsStr_ = '/**==================== electron enable sta ======================';
const eabEndTsStr_ = '======================= electron enable end ====================*/';

const ignStaEl  = /<!--==================== electron ignore sta ====================-->/mgi;
const ignEndEl  = /<!--==================== electron ignore end ====================-->/mgi;
const ignStaEl_ = /<!--==================== electron ignore sta ====================---/mgi;
const ignEndEl_ = /======================== electron ignore end ====================-->/mgi;
const ignStaElStr  = '<!--==================== electron ignore sta ====================-->';
const ignEndElStr  = '<!--==================== electron ignore end ====================-->';
const ignStaElStr_ = '<!--==================== electron ignore sta ====================---';
const ignEndElStr_ = '======================== electron ignore end ====================-->';

const eabStaEl  = /<!--==================== electron enable sta ====================-->/mgi;
const eabEndEl  = /<!--==================== electron enable end ====================-->/mgi;
const eabStaEl_ = /<!--==================== electron enable sta ====================---/mgi;
const eabEndEl_ = /======================== electron enable end ====================-->/mgi;
const eabStaElStr  = '<!--==================== electron enable sta ====================-->';
const eabEndElStr  = '<!--==================== electron enable end ====================-->';
const eabStaElStr_ = '<!--==================== electron enable sta ====================---';
const eabEndElStr_ = '======================== electron enable end ====================-->';

const isElectron = process.argv[2] === 'electron';

const tsPaths = [
  'src/app/app.component.ts',
  'src/app/monaco-editor/monaco-editor.base.ts'
];
const elPaths = [
  'src/app/app.component.html'
];
tsPaths.forEach(tsPath => doElectronReplace('ts', tsPath));
elPaths.forEach(elPath => doElectronReplace('el', elPath));

function doElectronReplace(fileType, filePath) {
  fn.match(fileType, {
    'ts': () => {
      if (isElectron) {
        fn.wt(filePath, fn.rd(filePath)
          .replace(ignStaTs, ignStaTsStr_).replace(ignEndTs, ignEndTsStr_)
          .replace(eabStaTs_, eabStaTsStr).replace(eabEndTs_, eabEndTsStr)
        );
      } else {
        fn.wt(filePath, fn.rd(filePath)
          .replace(ignStaTs_, ignStaTsStr).replace(ignEndTs_, ignEndTsStr)
          .replace(eabStaTs, eabStaTsStr_).replace(eabEndTs, eabEndTsStr_)
        );
      }
    },
    'el': () => {
      if (isElectron) {
        fn.wt(filePath, fn.rd(filePath)
          .replace(ignStaEl, ignStaElStr_).replace(ignEndEl, ignEndElStr_)
          .replace(eabStaEl_, eabStaElStr).replace(eabEndEl_, eabEndElStr)
        );
      } else {
        fn.wt(filePath, fn.rd(filePath)
          .replace(ignStaEl_, ignStaElStr).replace(ignEndEl_, ignEndElStr)
          .replace(eabStaEl, eabStaElStr_).replace(eabEndEl, eabEndElStr_)
        );
      }
    }
  })
}
const appServicePath = './src/app/app.service.ts';
fn.wt(
  appServicePath,
  fn.rd(appServicePath)
    .replace(/version:\s?'(\d{1,3}\.?){3}',/, `version: '${pkg.version}',`)
    .replace(/updateTime:\s?'\d{4}(-\d{2}){2}',/, `updateTime: '${fn.fmtDate('yyyy-MM-dd', new Date())}',`)
  );

const electronPkg = './electron-app/package.json';
fn.wt(electronPkg, fn.rd(electronPkg).replace(/"version":\s?"(\d{1,3}\.?){3}",/, `"version": "${pkg.version}",`));

fn.rm('dist/');

if (isElectron) {
  const fnPath = './src/assets/lib/funclib.min.js';
  fn.rm(fnPath);
  fn.cp('./node_modules/funclib/funclib.min.js', fnPath);
}
