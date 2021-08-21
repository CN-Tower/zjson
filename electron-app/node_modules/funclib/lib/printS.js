var chalk = require('./chalk');
var pretty = require('./pretty');

/**@function*/

/**
 * [fn.print] 在控制台打印值
 * @param value  : any
 * @param color  : 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow' [?]
 */
function print(value, color) {
  console.log(chalk(pretty(value), color));
}

/**@function*/
module.exports = print;