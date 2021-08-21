var isStr = require('./isStr');
var isUdf = require('./isUdf');
var random = require('./random');
var config = require('./_config');

var charNb = config.charNb
  , charLower = config.charLower
  , charUpper = config.charUpper
  , charPwd = config.charPwd;

/**@function*/

/**
 * [fn.randomId] 返回一个指定长度的随机ID
 * @param length : number = 12
 * @param charSet: string?
 * charSet presets: [pwd] | [0-9] | [a-z] | [A-A] | [0-9a-z]... | string.
 */
function randomId(length, charSet) {
  if (isUdf(length)) length = 12;
  if (!charSet || !isStr(charSet)) {
    charSet = charNb + charUpper;
  } else {
    if (charSet.match(/^\[.*\]$/)) {
      var chars = '';
      if (charSet === '[pwd]') {
        chars = charUpper + charLower + charNb + charPwd;
      } else {
        if (charSet.match(/0-9/)) chars += charNb;
        if (charSet.match(/a-z/)) chars += charLower;
        if (charSet.match(/A-Z/)) chars += charUpper;
      }
      if (chars) charSet = chars;
    }
  }
  var str = '', i = -1;
  while (++i< length) str += charSet[random(charSet.length)];
  return str;
}

/**@function*/
module.exports = randomId;