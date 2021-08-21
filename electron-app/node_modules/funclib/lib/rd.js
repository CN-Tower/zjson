var fs = require('fs');

/**@function*/

/**
 * [fn.rd] 读文件
 * @param file : string
 */
function rd(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, { encoding: 'utf8' }) : '';
}

/**@function*/
module.exports = rd;