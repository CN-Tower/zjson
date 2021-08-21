var isArr = require('./isArr');
var isObj = require('./isObj');
var len = require('./len');
var has = require('./has');
var keys = require('./keys');

/**@function*/

/**
 * [fn.isDeepEqual] 判断数组或对象是否相等
 * @param obj1     : object|array
 * @param obj2     : object|array
 * @param isStrict : boolean = false
 */
function isDeepEqual(obj1, obj2, isStrict) {
  if (typeof obj1 !== typeof obj2) {
    return false;
  }
  if (isArr(obj1) && isArr(obj2)) {
    if (obj1.length !== obj2.length) {
      return false;
    }
    for (var i = 0; i < obj1.length; i++) {
      if (!isDeepEqual(obj1[i], obj2[i]), isStrict) {
        return false;
      }
    }
    return true;
  } else if (isObj(obj1) && isObj(obj2)) {
    if (len(obj1) !== len(obj2)) {
      return false;
    }
    var ks = keys(obj1);
    if (isStrict && !isDeepEqual(ks, keys(obj2))) {
      return false;
    }
    for (var i = 0; i < ks.length; i++) {
      if (!has(obj2, ks[i]) || !isDeepEqual(obj1[ks[i]], obj2[ks[i]], isStrict)) {
        return false;
      }
    }
    return true;
  } else {
    return obj1 === obj2;
  }
}

/**@function*/
module.exports = isDeepEqual;