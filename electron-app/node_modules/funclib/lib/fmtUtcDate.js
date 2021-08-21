var fmtDateBase = require('./_fmtDateBase');

/**@function*/

/**
 * [fn.fmtUtcDate] 获取格式化的UTC时间字符串
 * @param fmtStr : string
 * @param time   : date|string|number
 */
function fmtUtcDate(fmtStr, time) {
  return fmtDateBase(fmtStr, time, true);
}

/**@function*/
module.exports = fmtUtcDate;