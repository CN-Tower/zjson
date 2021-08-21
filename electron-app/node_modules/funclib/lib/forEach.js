var isFun = require('./isFun');
var keys = require('./keys');
var throwErr = require('./_throwErr');

/**@function*/

/**
 * [fn.forEach] 遍历数组或类数组
 * @alias fn.each
 * @param srcObj   : array|object
 * @param iteratee : function
 */
function forEach(srcObj, iteratee) {
  if (!srcObj) return srcObj;
  if (!isFun(iteratee)) throwErr('fun');
  var length = srcObj.length;
  if (length && length >= 0 && length < Math.pow(2, 53) - 1) {
    for (var i = 0; i < length; i++) iteratee(srcObj[i], i);
  } else {
    var ks = keys(srcObj), i = -1;
    while (++ i < ks.length) iteratee(srcObj[ks[i]], ks[i]);
  }
  return srcObj;
}

/**@function*/
module.exports = forEach;