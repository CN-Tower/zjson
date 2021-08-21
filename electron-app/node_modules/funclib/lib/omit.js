var rest = require('./rest');
var extendBase = require('./_extendBase');

/**@function*/

/**
 * [fn.omit] 获取省略部分属性的对象副本
 * @param srcObj    : object
 * @param predicate : function|string|string[]
 * @param props     : ...string[]
 */
var omit = rest(function (srcObj, predicate, props) {
  return extendBase({}, srcObj, predicate, props, true, true);
});

/**@function*/
module.exports = omit;