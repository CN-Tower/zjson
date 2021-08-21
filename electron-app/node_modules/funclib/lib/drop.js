var typeOf = require('./typeOf');
var forEach = require('./forEach');
var len = require('./len');

/**@function*/

/**
 * [fn.drop] 去掉空数组、空对象及布尔化后为false的值
 * @param srcArr  : array
 * @param isDrop0 : boolean = false
 */
function drop(srcArr, isDrop0) {
  var tmpArr = [];
  forEach(srcArr, function (val) {
    var isLen0 = typeOf(val, 'arr', 'obj') && len(val) === 0;
    if ((val && !isLen0) || (!isDrop0 && val === 0)) {
      tmpArr.push(val);
    }
  });
  return tmpArr;
}

/**@function*/
module.exports = drop;