var isStr = require('./isStr');
var isReg = require('./isReg');
var isObj = require('./isObj');
var forIn = require('./forIn');
var throwErr = require('./_throwErr');
var patterns = require('./_config').patterns;

/**@function*/

/**
 * [fn.setPattern]设置一个正则表达式
 * @param ptnMap  : string|object
 * @param pattern : regexp [?]
 */
function setPattern(ptnMap, pattern) {
  if (ptnMap && isStr(ptnMap)) {
    isReg(pattern) ? patterns[ptnMap] = pattern : throwErr('reg');
  } else if (isObj(ptnMap)) {
    forIn(ptnMap, function (ptn, ptnVal) {
      isReg(ptnVal) ? patterns[ptn] = ptnVal : throwErr('reg');
    });
  };
}

/**@function*/
module.exports = setPattern;