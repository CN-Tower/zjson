var isArr = require('./isArr');
var isObj = require('./isObj');
var has = require('./has');

/**@function*/

/**
 * [fn.deepCopy] 深拷贝对象或数组
 * @param srcObj : object
 */
function deepCopy(srcObj) {
  var objStack = [];
  function copyObj(obj) {
    var tmpObj = obj;
    if (isArr(obj)) {
      tmpObj = [];
      for (var i = 0; i < obj.length; i++) {
        tmpObj.push(copyObj(obj[i]));
      }
    } else if (isObj(obj)) {
      if (objStack.indexOf(obj) > -1) {
        tmpObj = obj.constructor && obj.constructor.name;
      } else {
        objStack.push(obj);
        tmpObj = {};
        for (var key in obj) {
          if (has(obj, key)) tmpObj[key] = copyObj(obj[key]);
        }
      }
    }
    return tmpObj;
  }
  return copyObj(srcObj);
}

/**@function*/
module.exports = deepCopy;