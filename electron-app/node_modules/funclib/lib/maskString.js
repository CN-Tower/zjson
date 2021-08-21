var isUdf = require('./isUdf');
var isStr = require('./isStr');

/**@function*/

/**
 * [fn.maskString] 编码字符串或其子串
 * @param srcStr : any
 * @param start  : number
 * @param length : number
 * @param mask   : string = '*'
 */
function maskString(srcStr, start, length, mask) {
  var str = String(srcStr), ptn = /[^\u4e00-\u9fa5]/mg, ptn_ = /[\u4e00-\u9fa5]/mg;
  if (isStr(length)) mask = length, length = UDF;
  if (!isStr(mask)) mask = '*';
  var maskStr = str.substr(start, length).replace(ptn, mask).replace(ptn_, mask + mask);
  return str.substr(0, start) + maskStr + (isUdf(length) ? '' : str.substr(start + length));
}

/**@function*/
module.exports = maskString;