var config = require('./_config');

var root = config.root
  , oldFn = config.oldFn;

/**@function*/

/**
 * [fn.noConflict] 释放fn变量占用权
 */
function noConflict() {
  if (root.fn === this) root.fn = oldFn;
  return this;
}

/**@function*/
module.exports = noConflict;