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

const tsPath = 'src/app/app.component.ts';
const elPath = 'src/app/app.component.html';
let tsStr = fn.rd(tsPath)
let elStr = fn.rd(elPath)

if (process.argv[2] === 'electron') {
  tsStr = tsStr.replace(ignStaTs, ingStaTsStr_).replace(ingEndTs, ingEndTsStr_)
               .replace(eabStaTs_, eabStaTsStr).replace(eabEndTs_, eabEndTsStr);
  elStr = elStr.replace(ignStaEl, ingStaElStr_).replace(ingEndEl, ingEndElStr_)
               .replace(eabStaEl_, eabStaElStr).replace(eabEndEl_, eabEndElStr);
} else {
  tsStr = tsStr.replace(ignStaTs_, ingStaTsStr).replace(ingEndTs_, ingEndTsStr)
               .replace(eabStaTs, eabStaTsStr_).replace(eabEndTs, eabEndTsStr_);
  elStr = elStr.replace(ignStaEl_, ingStaElStr).replace(ingEndEl_, ingEndElStr)
               .replace(eabStaEl, eabStaElStr_).replace(eabEndEl, eabEndElStr_);
}

fn.wt(tsPath, tsStr);
fn.wt(elPath, elStr);

fn.rm('dist/');
