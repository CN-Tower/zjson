var indexOf = require('./indexOf');

/**@function*/

/**
 * [fn.contains] 判断数组是否包含符合条件的值
 * @param srcArr    : array
 * @param predicate : object|function|any
 */
function contains(srcArr, predicate) {
  return indexOf(srcArr, predicate) > -1;
}

/**@function*/
module.exports = contains;