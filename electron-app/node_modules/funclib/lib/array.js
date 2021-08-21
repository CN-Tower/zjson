var isUdf = require('./isUdf');
var isFun = require('./isFun');

/**@function*/

/**
 * [fn.array] 返回一个指定长度和默认值的数组
 * @param value  : any|function [?]
 */
function array(length, value) {
  var tmpArr = [], tmpVal = 0, i = -1;
  while (++i < length) {
    if (isUdf(value)) {
      tmpArr.push(tmpVal++);
    } else if (isFun(value)) {
      tmpArr.push(value.length > 0 ? value(i) : value());
    } else {
      tmpArr.push(value);
    }
  }
  return tmpArr;
}

/**@function*/
module.exports = array;
