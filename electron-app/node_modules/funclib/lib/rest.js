var isFun = require('./isFun');
var throwErr = require('./_throwErr');

/**@function*/

/**
 * [fn.rest] 获取函数的剩余参数
 * @param func : function
 */
function rest(func) {
  if (!isFun(func)) throwErr('fun');
  var start = func.length - 1;
  return function () {
    var len = Math.max(arguments.length - start, 0);
    var rst = Array(len), i = -1;
    while (++i < len) rst[i] = arguments[start + i];
    var args = Array(start + 1);
    for (i = 0; i < start; i ++) args[i] = arguments[i];
    args[start] = rst;
    switch (args.length) {
      case 0: return func.call(this);
      case 1: return func.call(this, args[0]);
      case 2: return func.call(this, args[0], args[1]);
      case 3: return func.call(this, args[0], args[1], args[2]);
    }
    return func.apply(this, args);
  };
}

/**@function*/
module.exports = rest;
