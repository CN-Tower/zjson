var typeVal = require('./typeVal');

/**@function*/

/**
 * [fn.capitalize] 字符串首字母大写
 * @param srcStr : string
 */
function capitalize(srcStr) {
  return typeVal(srcStr, 'str') ? srcStr[0].toUpperCase() + srcStr.substr(1) : srcStr;
}

/**@function*/
module.exports = capitalize;