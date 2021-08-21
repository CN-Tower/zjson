var typeVal = require('./typeVal');
var forEach = require('./forEach');
var get = require('./get');

/**@function*/

/**
 * [fn.pluck] 把结构中的字段取出合并到一个数组中
 * @param srcArr  : array
 * @param pathStr : string
 */
function pluck(srcArr, pathStr) {
  var tmpArr = [];
  if (typeVal(pathStr, 'str')) {
    forEach(srcArr, function (val) { tmpArr.push(get(val, pathStr)); });
  }
  return tmpArr;
}

/**@function*/
module.exports = pluck;