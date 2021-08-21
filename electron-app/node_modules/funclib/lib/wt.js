var fs = require('fs');

/**@function*/

/**
 * [fn.wt] 写文件
 * @param file : string
 * @param text : string
 * @param flag : 'w'|'a' = 'w'
 */
function wt(file, text, flag) {
  if (flag === void 0) { flag = 'w'; }
  fs.writeFileSync(file, text, { encoding: 'utf8', flag: flag });
}

/**@function*/
module.exports = wt;