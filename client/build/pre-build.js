const fn = require('funclib');
const elePrePtn = /\/\*\*electron ignore \-\*\//mgi;
const eleEndPtn = /\/\*\*electron ignore \|\*\//mgi;
const elePrePtn_ = /\/\*\*electron ignore \-\-\*\/\/\*/mgi;
const eleEndPtn_ = /\*\/\/\*\*electron ignore \|\|\*\//mgi;
const elePreStr = '/**electron ignore -*/';
const eleEndStr = '/**electron ignore |*/';
const elePreStr_ = '/**electron ignore --*//*';
const eleEndStr_ = '*//**electron ignore ||*/';
const componentPath = 'src/app/app.component.ts';
let componentStr = fn.rd(componentPath)

componentStr = process.argv[2] === 'electron'
  ? componentStr.replace(elePrePtn, elePreStr_).replace(eleEndPtn, eleEndStr_)
  : componentStr.replace(elePrePtn_, elePreStr).replace(eleEndPtn_, eleEndStr);

fn.wt(componentPath, componentStr);
fn.rm('dist/');
