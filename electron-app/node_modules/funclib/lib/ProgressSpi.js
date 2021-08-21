var chalk = require('./chalk');

/**
 * Spin Progress
 * @param {string} title 
 * @param {object} options [optional]
 */
function ProgressSpi(title) {
  this.title = title
  this.stream = process.stderr;
  this.flag = '/';
  this.nextFlagMap = { '/': '-', '-': '\\', '\\': '|', '|': '/' };
}

ProgressSpi.prototype.tick = function () {
  this.stream.clearLine();
  this.stream.cursorTo(0);
  this.stream.write(chalk(this.flag, 'cyan') + ' ' + this.title);
  this.flag = this.nextFlagMap[this.flag];
}

ProgressSpi.prototype.terminate = function (isClear) {
  if (isClear) {
    this.stream.clearLine();
    this.stream.cursorTo(0);
  } else {
    this.stream.write('\n');
  }
}

module.exports = ProgressSpi;