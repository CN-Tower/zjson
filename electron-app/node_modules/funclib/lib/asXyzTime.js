var asUtcTime = require('./asUtcTime');

/**@function*/

/**
 * [fn.asXyzTime] 转化为相同时间的指定时差的时间戳
 * @param time : date|string|number
 * @param offset : number
 */
function asXyzTime(time, offset) {
  return asUtcTime(time) - (!+offset ? 0 : +offset);
}

/**@function*/
module.exports = asXyzTime;