var forEach = require('./forEach');
var config = require('./_config');

var deCodes = config.deCodes
  , enCodes = config.enCodes;

/**@function*/

/**
 * [fn.unescape] 解码HTML字符串
 * @param srcStr : string
 */
function unescape(srcStr) {
  forEach(enCodes, function (str, idx) {
    srcStr = srcStr.replace(new RegExp(str, 'g'), deCodes[idx]);
  });
  return srcStr;
}

/**@function*/
module.exports = unescape;