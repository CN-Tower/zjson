/**@function*/

/**
 * [fn.isReg] 判断类型是否为：RegExp
 * @param value : any
 */
function isReg(value) {
  return value instanceof RegExp;
};

/**@function*/
module.exports = isReg;