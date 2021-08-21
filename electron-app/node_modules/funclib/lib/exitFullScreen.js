var isFun = require('./isFun');
var defer = require('./defer');
var interval = require('./interval');
var isFullScreen = require('./isFullScreen');
var sendF11 = require('./_sendF11');

/**@function*/

/**
 * [fn.exitFullScreen] 退出全屏显示
 * @param didExit : function [?]
 */
function exitFullScreen(didExit) {
  var cancelFullScreen = document.cancelFullScreen
    || document.webkitCancelFullScreen
    || document.mozCancelFullScreen || document.exitFullScreen;
  cancelFullScreen ? cancelFullScreen.call(document) : sendF11();
  if (isFun(didExit)) {
    var timer = interval(100, function () {
      if (!isFullScreen()) {
        clearInterval(timer);
        defer(didExit);
      }
    });
  }
}

/**@function*/
module.exports = exitFullScreen;