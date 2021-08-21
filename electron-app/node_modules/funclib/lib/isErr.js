/**@function*/

/**
 * [fn.isErr] 判断类型是否为：Error
 * @param value : any
 */
function isErr(value) {
  return value instanceof Error;
}

/**@function*/
module.exports = isErr;