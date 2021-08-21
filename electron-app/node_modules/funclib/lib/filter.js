var filterBase = require('./_filterBase');

/**@function*/

/**
 * [fn.filter] 根据条件取过滤值
 * @param srcArr    : array
 * @param predicate : object|function|any
 */
function filter(srcArr, predicate) {
  return filterBase(srcArr, predicate, true);
}

/**@function*/
module.exports = filter;