var UDF = undefined;
var isNum = require('./isNum');
var isUdf = require('./isUdf');

/**@function*/

/**
 * [fn.range] 返回一个范围数组
 * @param start  : number [?]
 * @param length : number
 */
function range(start, length) {
  var rgArr = [];
  if (isNum(start)) {
    function rangeLoop(isAdd) {
      if (length >= 0) {
        for (var i = 0; i < length; i++) rgArr.push(isAdd ? i + start : i);
      } else if (length < 0) {
        for (var i = 0; i > length; i--) rgArr.push(isAdd ? i + start : i);
      }
    };
    if (isUdf(length)) {
      length = start, start = UDF;
      rangeLoop(false);
    } else if (isNum(length)) {
      rangeLoop(true);
    }
  }
  return rgArr;
}

/**@function*/
module.exports = range;