var fs = require('fs');
var isNum = require('./isNum');
var match = require('./match');

/**@function*/

/**
 * [fn.size] 获取文件的大小
 * @param file   : string
 * @param unit  : 'b'|'kb'|'mb'|'gb'|'tb' = 'kb'
 * @param digit : number = 2
 */
function size(file, unit, digit) {
  if (fs.existsSync(file)) {
    if (isNum(unit)) digit = unit, unit = UDF;
    if (!isNum(digit)) digit = 2;
    var flSize = fs.statSync(file)['size'];
    var rlSize = match(unit, {
      'b': flSize,
      'kb': flSize / 1024,
      'mb': flSize / 1024 / 1024,
      'gb': flSize / 1024 / 1024 / 1024,
      'tb': flSize / 1024 / 1024 / 1024 / 1024,
      'default': flSize / 1024
    });
    return Number(rlSize).toFixed(digit);
  }
}

/**@function*/
module.exports = size;