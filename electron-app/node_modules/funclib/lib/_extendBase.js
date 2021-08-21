var isObj = require('./isObj');
var isFun = require('./isFun');
var flatten = require('./flatten');
var keys = require('./keys');
var has = require('./has');
var typeOf = require('./typeOf');
var toArr = require('./toArr');
var forIn = require('./forIn');
var forEach = require('./forEach');
var contains = require('./contains');

/**@function*/

/**
 * Basic methods of collection extention.
 */
function extendBase(tarObj, srcObj, predicate, propList, isTraDft, isOmit) {
  if (!isObj(srcObj)) return tarObj;
  propList = flatten(propList);
  var isPdtObj = isObj(predicate)
    , srcKs = keys(srcObj);
  function traversal(tarObj, srcObj, propList) {
    forEach(propList, function (prop) {
      if (has(srcObj, prop)) {
        tarObj[prop] = srcObj[prop];
      } else if (isPdtObj && has(predicate, 'default')) {
        tarObj[prop] = predicate.default;
      }
    });
  }
  if (typeOf(predicate, 'str', 'arr', 'obj')) {
    var props = isPdtObj ? propList : toArr(predicate).concat(propList);
    if (isOmit) {
      props = srcKs.filter(function (key) {
        return !contains(props, key);
      });
    }
    traversal(tarObj, srcObj, props);
  } else if (isFun(predicate)) {
    forIn(srcObj, function (key, val) {
      var isPred = predicate(key, val);
      if ((isPred && !isOmit ) || (!isPred && isOmit)) {
        tarObj[key] = val;
      }
    });
  }
  else if (isTraDft) {
    traversal(tarObj, srcObj, srcKs);
  }
  return tarObj;
}

/**@function*/
module.exports = extendBase;