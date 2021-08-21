var timerBase = require('./_timerBase');

/**@function*/

/**
 * [fn.interval] 循环定时器
 * @param timerId  : string [?]
 * @param duration : number|false|null [?]
 * @param callback : function
 * @param leading  : boolean [?]
 */
function interval(timerId, duration, callback, leading) {
  return timerBase(timerId, duration, callback, leading, 'interval');
}

/**@function*/
module.exports = interval;