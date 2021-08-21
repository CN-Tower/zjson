var UDF = undefined;
var isNum = require('./isNum');
var isBol = require('./isBol');

/**@function*/

/**
 * [fn.random] 返回一个指定范围内的随机数
 * @param start : number
 * @param end   : number [?]
 * @param isInt : boolean = true;
 */
function random(start, end, isInt) {
  if (!isNum(start)) return Math.random();
  if (isBol(end)) isInt = end, end = UDF;
  if (isInt !== false) isInt = true;
  var rdNum, temp;
  if (!isNum(end) || start === end) {
    rdNum = Math.random() * start;
    return isInt ?  Math.floor(rdNum) : rdNum;
  } else {
    var isStartGt = start > end
    if (isStartGt) temp = start, start = end, end = temp;
    rdNum = Math.random() * (end - start) + start;
    return isInt ? (isStartGt ? Math.ceil(rdNum) : Math.floor(rdNum)) : rdNum ;
  }
}

/**@function*/
module.exports = random;