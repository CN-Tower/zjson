var rest = require('./rest');
var extendBase = require('./_extendBase');

/**@function*/

/**
 * [fn.extend] 给对象赋值
 * @param tarObj    : object
 * @param srcObj    : object
 * @param predicate : function|string|string[]|{ default?: any }
 * @param props     : ...string[]
 */
var extend = rest(function (tarObj, srcObj, predicate, props) {
  return extendBase(tarObj, srcObj, predicate, props, true);
});

/**@function*/
module.exports = extend;