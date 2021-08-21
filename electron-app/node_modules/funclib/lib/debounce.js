var isFun = require('./isFun');
var isObj = require('./isObj');
var isUdf = require('./isUdf');
var has = require('./has');
var timeout = require('./timeout');
var typeVal = require('./typeVal');
var throwErr = require('./_throwErr');
var UDF = undefined;

/**@function*/

/**
 * [fn.debounce] 防抖函数, 适用于获取用户输入或防止函数频繁调用
 * @param  func    : function
 * @param  wait    : number
 * @param  options : object|boolean [?] 为true时，leading = true, trailing = false;
 * leading: boolean = false
 * maxing: boolean = false
 * maxWait: number = Math.max(0, wait)
 * trailing: boolean = true
 */
function debounce(func, wait, options) {
  if (!isFun(func)) throwErr('fun');
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime
    , lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  wait = +wait || 0;
  if (typeVal(options, 'bol')) {
    leading = true, trailing = false;
  } else if (isObj(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    if (maxing) maxWait = Math.max(+options.maxWait || 0, wait);
    if (has(options, 'trailing')) trailing= !!options.trailing;
  };
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = UDF;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime;
    return (isUdf(lastCallTime) || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && (time - lastInvokeTime) >= maxWait));
  }
  function timerExpired() {
    var time = Date.now();
    if (shouldInvoke(time)) return trailingEdge(time);
    var timeWaiting = wait - (time - lastCallTime)
      , waitingTime = maxing ? Math.min(timeWaiting, maxWait - (time - lastInvokeTime)) : timeWaiting;
    timerId = timeout(waitingTime, timerExpired);
  }
  function trailingEdge(time) {
    timerId = UDF;
    if (trailing && lastArgs) return invokeFunc(time);
    lastArgs = lastThis = UDF;
    return result;
  }
  function debounced() {
    var time = Date.now(), isInvoking = shouldInvoke(time);
    lastArgs = arguments, lastThis = this, lastCallTime = time;
    if (isInvoking) {
      if (isUdf(timerId)) {
        lastInvokeTime = lastCallTime;
        timerId = timeout(wait, timerExpired);
        return leading ? invokeFunc(lastCallTime) : result;
      }
      if (maxing) {
        timerId = timeout(wait, timerExpired);
        return invokeFunc(lastCallTime);
      }
    }
    if (isUdf(timerId)) timerId = timeout(wait, timerExpired);
    return result;
  }
  debounced.cancel = function () {
    if (!isUdf(timerId)) clearTimeout(timerId);
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = UDF;
  };
  debounced.flush = function () {
    return isUdf(timerId) ? result : trailingEdge(Date.now());
  };
  return debounced;
}

/**@function*/
module.exports = debounce;