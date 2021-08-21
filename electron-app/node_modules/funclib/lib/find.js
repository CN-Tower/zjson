var UDF = undefined;
var indexOf = require('./indexOf');

/**@function*/

/**
 * [fn.find] 根据条件取一个值
 * @param srcArr    : array
 * @param predicate : object|function|any
 */
function find(srcArr, predicate) {
  var idx = indexOf(srcArr, predicate);
  return idx > -1 ? srcArr[idx] : UDF;
}

/**@function*/
module.exports = find;