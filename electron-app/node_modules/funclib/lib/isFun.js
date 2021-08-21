/**@function*/

/**
 * [fn.isFun] 判断类型是否为：function
 * @param value : any
 */
function isFun(value) {
  return typeof value == 'function';
}

/**@function*/
module.exports = isFun;