var UDF = undefined;

/**@function*/

/**
 * [fn.isDat] 判断类型是否为：Date
 * @param value : any
 */
function isDat(value) {
  return value instanceof Date;
}

/**@function*/
module.exports = isDat;