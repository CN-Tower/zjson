var matchPattern = require('./matchPattern');

/**@function*/

/**
 * [fn.cutString] 裁切字符串到指定长度
 * @param srcStr : string
 * @param length : number
 */
function cutString(srcStr, length) {
  var tmpChar, tmpStr = '', count = 0, i = -1;
  while (++i < srcStr.length) {
    if (count >= length) break;
    tmpChar = srcStr.substr(i, 1);
    tmpStr += tmpChar;
    count += matchPattern(tmpChar, 'dbChar') ? 2 : 1;
  }
  return tmpStr + '...';
}

/**@function*/
module.exports = cutString;