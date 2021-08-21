var isArr = require('./isArr');
var forEach = require('./forEach');

/**@function*/

/**
 * [fn.flatten] 把有结构的数组打散，减少层数
 * @param srcArr : array
 * @param isDeep : boolean = false
 */
function flatten(srcArr, isDeep) {
  var tmpArr = [];
  forEach(srcArr, function (val) {
    if (isArr(val)) {
      tmpArr.push.apply(tmpArr, isDeep ? flatten(val, true) : val);
    } else {
      tmpArr.push(val);
    }
  });
  return tmpArr;
}

/**@function*/
module.exports = flatten;