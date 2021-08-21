var isUdf = require('./isUdf');
var isFun = require('./isFun');
var isNum = require('./isNum');
var contains = require('./contains');
var typeVal = require('./typeVal');
var isNul = require('./isNul');
var config = require('./_config');

var intervalTimers = config.intervalTimers
  , timeoutTimers  = config.timeoutTimers
  , F = config.F;

/**@function*/

/**
 * Basic methods of timers.
 */
function timerBase(timerId, duration, callback, leading, type_) {
  var timers, setTimer, clearTimer, tempVar;
  if (type_ === 'interval') {
    timers = intervalTimers,
    setTimer = setInterval,
    clearTimer = clearInterval;
  } else if (type_ === 'timeout') {
    timers = timeoutTimers,
    setTimer = setTimeout,
    clearTimer = clearTimeout;
  }
  if (isUdf(timerId) || isNul(timerId)) {
    return { id: null,  stop: F, clear: F };
  } else if (typeVal(timerId, 'str')) {
    if (isUdf(duration)) {
      return { id: timers[timerId], stop: invokeClear, clear: invokeClear };
    } else if (contains([null, false], duration)) {
      invokeClear();
      return timers[timerId] = null;
    } else if (isFun(duration)) {
      tempVar = duration,
      duration = typeVal(callback, 'num') || 0,
      callback = tempVar;
    }
  } else if (isNum(timerId) && isFun(duration)) {
    if (isBol(callback)) leading = callback;
    callback = duration, duration = timerId, timerId = UDF;
  } else if (isFun(timerId)) {
    tempVar = timerId;
    if (isNum(duration)) {
      timerId = typeVal(callback, 'str') || UDF;
    } else if (typeVal(duration, 'str')) {
      timerId = duration,
      duration = typeVal(callback, 'num') || 0;
    } else {
      timerId = UDF, duration = 0;
    }
    callback = tempVar;
  }
  if (isFun(callback) && isNum(duration)) {
    if (leading) callback();
    if (duration < 0) duration = 0;
    if (!timerId) return setTimer(callback, duration);
    if (typeVal(timerId, 'str')) {
      invokeClear();
      return timers[timerId] = setTimer(callback, duration);
    }
  }
  function invokeClear() {
    return clearTimer(timers[timerId]);
  };
}

/**@function*/
module.exports = timerBase;