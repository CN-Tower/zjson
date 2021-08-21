var isBol = require('./isBol');
var isObj = require('./isObj');
var has = require('./has');
var get = require('./get');
var pretty = require('./pretty');
var array = require('./array');
var fmtDate = require('./fmtDate');
var cutString = require('./cutString');
var typeVal = require('./typeVal');
var version = require('./_config').version;

/**@function*/

/**
 * [fn.log] 在控制台打印格式化的值
 * @param value   : any
 * @param title   : string|boolean [?]
 * @param configs : object [?]
 * title: string
 * width: number = 66 [30-100]
 * breakPre: boolean = false,
 * breakEnd: boolean = false,
 * isFmt: boolean = true
 * isShowTime: boolean = true
 */
function log(value, title, configs) {
  var isFmt;
  function getIsFmt(configs) {
    return has(configs, 'isFmt', 'bol') ? configs.isFmt : true;
  };
  function getTitle(configs) {
    return get(configs, 'title', 'str') || 'funclib(' + version + ')';
  };
  if (typeVal(title, 'str')) {
    if (isBol(configs)) {
      isFmt = configs, configs = {};
    } else {
      isFmt = getIsFmt(configs);
    }
  }
  else if (isBol(title)) {
    isFmt = title, title = getTitle(configs);
  }
  else if (isObj(title)) {
    configs = title, isFmt = getIsFmt(configs), title = getTitle(configs);
  }
  else {
    isFmt = true;
    title = 'funclib(' + version + ')';
  }
  var isShowTime = has(configs, 'isShowTime') ? !!configs.isShowTime : true
    , time = isShowTime ? '[' + fmtDate('hh:mm:ss', new Date()) + '] ' : '';
  title = title.replace(/\n/mg, '');
  var originTtLength = (time + title + '[] ').length;
  if (!isFmt) {
    title = '( ' + title + ' )';
  }
  title = time + title;
  var width = get(configs, '/width');
  if (!width || width < 30 || width > 100) {
    width = 66;
  }
  if (originTtLength > width) {
    title = cutString(title, width - 3);
  }
  else if (isFmt) {
    title = array((width - originTtLength) / 2, ' ').join('') + title;
  }
  var isBreakPre = get(configs, 'breakPre', 'bol');
  var isBreakEnd = get(configs, 'breakEnd', 'bol');
  if (!isFmt) {
    if (isBreakPre) console.log('');
    console.log(title + ':');
    try {
      console.log(pretty(value));
    } catch (e) {
      console.log(value);
    }
    if (isBreakEnd) console.log('');
  }
  else {
    var dbLine_1 = '', sgLine_1 = '';
    for(var i = 0; i < width; i ++ ) dbLine_1 += '=', sgLine_1 += '-';
    if (isBreakPre) console.log('');
    console.log(dbLine_1 + '\n' + title + '\n' + sgLine_1);
    try {
      console.log(pretty(value));
    } catch (e) {
      console.log(value);
    }
    console.log(dbLine_1);
    if (isBreakEnd) console.log('');
  }
}

/**@function*/
module.exports = log;