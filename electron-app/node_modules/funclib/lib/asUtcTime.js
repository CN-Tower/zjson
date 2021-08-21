var dateBase = require('./_dateBase');
var getTimeObj = require('./_getTimeObj');

/**@function*/

/**
 * [fn.asUtcTime] 转化为相同时间的UTC时间戳
 * @param time : date|string|number
 */
function asUtcTime(time) {
  var date = dateBase(time);
  if (!date.getTime()) return NaN;
  var timeObj = getTimeObj(date);
  return Date.UTC(
    timeObj['y+'], timeObj['M+'] - 1, timeObj['d+'],
    timeObj['h+'], timeObj['m+'], timeObj['s+'], timeObj['S']
  );
}

/**@function*/
module.exports = asUtcTime;