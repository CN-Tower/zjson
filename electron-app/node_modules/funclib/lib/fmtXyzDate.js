var timestamp = require('./timestamp');
var fmtDate = require('./fmtDate');
var fmtUtcDate = require('./fmtUtcDate');
var dateBase = require('./_dateBase');

/**@function*/

/**
 * [fn.fmtXyzDate] 获取格式化指定时差的时间字符串
 * @param fmtStr : string
 * @param time   : date|string|number
 * @param offset : number
 */
function fmtXyzDate(fmtStr, time, offset) {
  var date = dateBase(time);
  if (!date.getTime()) return '';
  var ms = date.getUTCMilliseconds()
    , tm = timestamp(fmtUtcDate('yyyy/MM/dd hh:mm:ss', time)) + ms + (!+offset ? 0 : +offset);
  return fmtDate(fmtStr, tm);
}

/**@function*/
module.exports = fmtXyzDate;