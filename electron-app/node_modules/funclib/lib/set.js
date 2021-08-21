var isStr = require('./isStr');
var typeVal = require('./typeVal');
var getPaths = require('./_getPaths');

/**@function*/

/**
 * [fn.set] 设置对象或子孙对象的属性
 * @param srcObj  : object
 * @param pathStr : string
 * @param value   : any
 */
function set(srcObj, pathStr, value) {
  function setBase(origin, srcObj, pathStr, value) {
    if (!srcObj || !isStr(pathStr)) return origin;
    var paths = getPaths(pathStr), prop = paths.shift();
    if (!prop) return origin;
    if (paths.length) {
      if (!typeVal(srcObj[prop], 'object', 'fun')) return origin;
      return setBase(origin, srcObj[prop], paths.join('/'), value);
    } else {
      srcObj[prop] = value;
      return origin;
    }
  }
  return setBase(srcObj, srcObj, pathStr, value);
}

/**@function*/
module.exports = set;