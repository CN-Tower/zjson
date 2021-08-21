/**@function*/

/**
 * [fn.isNum] 判断类型是否为：number
 * @param value  : any
 * @param impure : boolean = false
 */
function isNum(value, impure) {
  var isNb = typeof value == 'number';
  return impure ? isNb : isNb && isFinite(value);
}

/**@function*/
module.exports = isNum;