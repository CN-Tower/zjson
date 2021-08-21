var isObj = require('./isObj');
var isFun = require('./isFun');
var has = require('./has');
var get = require('./get');
var typeVal = require('./typeVal');
var timeout = require('./timeout');
var interval = require('./interval');
var ProgressBar = require('./ProgressBar');
var ProgressSpi = require('./ProgressSpi');

/**@function*/
/**
 * [fn.progress] 进度显示工具
 * @param title: string
 * @param options: object [?]
 * title: string
 * width: number = 40
 * type : 'bar'|'spi' = 'bar'
 * isClear: boolean = true
 * isBreak: boolean = true
 */
function progress(title, options) {
  var progressInstance, duration, pgType, flag
    , isStoped = false
    , progressTimerId = 'FN_PROGRESS_TIMER'
    , isClear = get(options, 'isClear', 'bol');
  if (isObj(title)) {
    options = title, title = UDF;
  }
  if (!options) options = {};
  title = typeVal(title, 'str') || get(options, 'title', 'str') || 'funclib ' + version;
  pgType = get(options, 'type', 'str');
  pgType = pgType === 'spi' ? pgType : 'bar';
  if (has(options, 'isBreak', 'bol') ? options.isBreak : true) console.log('');
  if (pgType === 'bar') {
    timeout(progressTimerId).clear();
    pgType = 'bar';
    duration = 250;
    progressInstance = new ProgressBar((title || '[fn.progress]') + ' [:bar] :percent', {
      clear: isClear,
      complete: '=',
      incomplete: ' ',
      width: options['width'] || 40,
      total: options['total'] || 20,
    });
  } else {
    interval(progressTimerId).clear();
    progressInstance = new ProgressSpi(title);
  }
  start();

  /**
   * [fn.progress.pause] 暂停进度
   */
  function pause() {
    if (pgType === 'bar') {
      timeout(progressTimerId).clear();
    } else {
      flag = progressInstance.flag;
      interval(progressTimerId).clear();
    }
  }

  /**
   * [fn.progress.start] 开始进度
   */
  function start() {
    if (pgType === 'bar') {
      tick(isStoped ? '-' : '+');
    } else {
      interval(progressTimerId, 180, function () {
        if (flag) {
          progressInstance.flag = flag;
          flag = '';
        }
        progressInstance.tick();
      });
    }
  }

  /**
   * [fn.progress.stop] 结束进度
   * @param onStopped : function [?]
   */
  function stop(onStopped) {
    isStoped = true;
    if (pgType === 'bar') {
      duration = 600;
      tick('-', function () {
        pgType = null;
        progressInstance.terminate();
        if (isFun(onStopped)) onStopped();
      });
    } else {
      interval(progressTimerId).clear();
      pgType = null;
      progressInstance.terminate(isClear);
      if (isFun(onStopped)) onStopped();
    }
  }

  /**
   * [fn.progress.clear] 立即结束进度条，并触发回调
   * @param onStopped : function [?]
   * @param isBrk : function [?]
   */
  function clear(onStopped) {
    if (pgType === 'bar') {
      progressInstance.complete = true;
      timeout(progressTimerId).clear();
      progressInstance.terminate();
    } else {
      interval(progressTimerId).clear();
      progressInstance.terminate(isClear);
    }
    pgType = null;
    if (isFun(onStopped)) onStopped();
  }

  function tick(tickType, onStopped, limited) {
    timeout(progressTimerId, duration, function () {
      if (!limited) progressInstance.tick();
      switch (tickType) {
        case '+': duration += 300; break;
        case '-': duration -= duration * 0.2; break;
      };
      if (!progressInstance.complete) {
        var isLimit = tickType === '+' && progressInstance.curr === progressInstance.total -1;
        tick(tickType, onStopped, isLimit);
      }
      else if (onStopped) {
        onStopped();
      }
    });
  }

  progress.pause = pause;
  progress.start = start;
  progress.stop = stop;
  progress.clear = clear;
}

/**@function*/
module.exports = progress;