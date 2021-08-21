var has = require('./has');
var config = require('./_config');

var colorEnd = config.colorEnd
  , colorList = config.colorList;

/**@function*/

/**
 * [fn.chalk] 返回带颜色的字符串
 * @param srcStr : string
 * @param color  : 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow' [?]
 */
function chalk(srcStr, color) {
  return colorList[has(colorList, color) ? color : 'default'] + srcStr + colorEnd;
}

/**@function*/
module.exports = chalk;