/**@function*/

/**
 * [fn.clear] 命令行清屏
 */
function clear() {
  process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H');
}

/**@function*/
module.exports = clear;