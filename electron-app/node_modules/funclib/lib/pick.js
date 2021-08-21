var rest = require('./rest');
var extendBase = require('./_extendBase');

/**@function*/

/**
 * [fn.pick] 获取包含部分属性的对象副本
 * @param srcObj    : object
 * @param predicate : function|string|string[]|{ default?: any }
 * @param props     : ...string[]
 */
var pick = rest(function (srcObj, predicate, props) {
  return extendBase({}, srcObj, predicate, props);
});

/**@function*/
module.exports = pick;