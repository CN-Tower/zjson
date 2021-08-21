var filterBase = require('./_filterBase');

/**@function*/

/**
  * [fn.reject] 根据条件过滤值
  * @param srcArr    : array
  * @param predicate : object|function|any
  */
  function reject(srcArr, predicate) {
  return filterBase(srcArr, predicate, false);
}

/**@function*/
module.exports = reject;