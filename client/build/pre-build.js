const fn = require('funclib');

const ignStaTs = /\/\*\*electron ignore sta\*\//mgi;
const ingEndTs = /\/\*\*electron ignore end\*\//mgi;
const ignStaTs_ = /\/\*\*electron ignore sta_\*\/\/\*/mgi;
const ingEndTs_ = /\*\/\/\*\*electron ignore end_\*\//mgi;
const ingStaTsStr = '/**electron ignore sta*/';
const ingEndTsStr = '/**electron ignore end*/';
const ingStaTsStr_ = '/**electron ignore sta_*//*';
const ingEndTsStr_ = '*//**electron ignore end_*/';
const eabStaTs = /\/\*\*electron enable sta\*\//mgi;
const eabEndTs = /\/\*\*electron enable end\*\//mgi;
const eabStaTs_ = /\/\*\*electron enable sta_\*\/\/\*/mgi;
const eabEndTs_ = /\*\/\/\*\*electron enable end_\*\//mgi;
const eabStaTsStr = '/**electron enable sta*/';
const eabEndTsStr = '/**electron enable end*/';
const eabStaTsStr_ = '/**electron enable sta_*//*';
const eabEndTsStr_ = '*//**electron enable end_*/';
const ignStaEl = /<!--electron ignore sta-->/mgi;
const ingEndEl = /<!--electron ignore end-->/mgi;
const ignStaEl_ = /<!--electron ignore sta_--><!--/mgi;
const ingEndEl_ = /--><!--electron ignore end_-->/mgi;
const ingStaElStr = '<!--electron ignore sta-->';
const ingEndElStr = '<!--electron ignore end-->';
const ingStaElStr_ = '<!--electron ignore sta_--><!--';
const ingEndElStr_ = '--><!--electron ignore end_-->';
const eabStaEl = /<!--electron enable sta-->/mgi;
const eabEndEl = /<!--electron enable end-->/mgi;
const eabStaEl_ = /<!--electron enable sta_--><!--/mgi;
const eabEndEl_ = /--><!--electron enable end_-->/mgi;
const eabStaElStr = '<!--electron enable sta-->';
const eabEndElStr = '<!--electron enable end-->';
const eabStaElStr_ = '<!--electron enable sta_--><!--';
const eabEndElStr_ = '--><!--electron enable end_-->';

const isElectron = process.argv[2] === 'electron';

const tsPaths = [
  'src/app/app.component.ts',
  'src/app/monaco-editor/monaco-editor.base.ts'
];
const elPaths = ['src/app/app.component.html'];

tsPaths.forEach(tsPath => doElectronReplace('ts', tsPath));
elPaths.forEach(elPath => doElectronReplace('el', elPath));

function doElectronReplace(fileType, filePath) {
  fn.match(fileType, {
    'ts': () => {
      if (isElectron) {
        fn.wt(filePath, fn.rd(filePath)
          .replace(ignStaTs, ingStaTsStr_).replace(ingEndTs, ingEndTsStr_)
          .replace(eabStaTs_, eabStaTsStr).replace(eabEndTs_, eabEndTsStr)
        );
      } else {
        fn.wt(filePath, fn.rd(filePath)
          .replace(ignStaTs_, ingStaTsStr).replace(ingEndTs_, ingEndTsStr)
          .replace(eabStaTs, eabStaTsStr_).replace(eabEndTs, eabEndTsStr_)
        );
      }
    },
    'el': () => {
      if (isElectron) {
        fn.wt(filePath, fn.rd(filePath)
          .replace(ignStaEl, ingStaElStr_).replace(ingEndEl, ingEndElStr_)
          .replace(eabStaEl_, eabStaElStr).replace(eabEndEl_, eabEndElStr)
        );
      } else {
        fn.wt(filePath, fn.rd(filePath)
          .replace(ignStaEl_, ingStaElStr).replace(ingEndEl_, ingEndElStr)
          .replace(eabStaEl, eabStaElStr_).replace(eabEndEl, eabEndElStr_)
        );
      }
    }
  })
}

fn.rm('dist/');

if (isElectron) {
  const fnPath = './src/assets/lib/funclib.min.js';
  fn.rm(fnPath);
  fn.cp('./node_modules/funclib/funclib.min.js', fnPath);
}
