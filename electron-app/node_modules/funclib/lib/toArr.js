var isArr = require('./isArr');

/**@function*/

/**
 * [fn.toArr] 值数组化
 * @param value : any
 */
function toArr(value) {
  return isArr(value) ? value : [value];
}

/**@function*/
module.exports = toArr;