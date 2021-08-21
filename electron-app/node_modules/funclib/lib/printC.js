var pretty = require('./pretty');

/**@function*/

/**
 * [fn.print] 在控制台打印值
 * @param value  : any
 */
function print(value) {
  console.log(pretty(value));
}

/**@function*/
module.exports = print;