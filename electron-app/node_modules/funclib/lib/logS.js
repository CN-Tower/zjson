var isBol = require('./isBol');
var isObj = require('./isObj');
var has = require('./has');
var get = require('./get');
var chalk = require('./chalk');
var pretty = require('./pretty');
var array = require('./array');
var fmtDate = require('./fmtDate');
var cutString = require('./cutString');
var typeVal = require('./typeVal');
var config = require('./_config');

var colorEnd = config.colorEnd
  , colorList = config.colorList
  , version = config.version;

/**@function*/

/**
 * [fn.log] 在控制台打印格式化的值
 * @param value   : any
 * @param title   : string|boolean [?]
 * @param configs : object [?]
 * title: string,
 * width: number = 66 [30-100],
 * pre:   boolean = false,
 * end:   boolean = false,
 * breakPre: boolean = false,
 * breakEnd: boolean = false,
 * isFmt:      boolean = true
 * isShowTime: boolean = true
 * ttColor: 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow'
 * color:   'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow' = 'cyan'
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
  var isShowTime = has(configs, 'isShowTime') ? !!configs.isShowTime : true;
  var _time = fmtDate('hh:mm:ss', new Date());
  var time = isShowTime ? '[' + _time + '] ' : '';
  title = title.replace(/\n/mg, '');
  var originTtLength = (time + title + '[] ').length;
  if (!isFmt) {
    title = '( ' + title + ' )';
  }
  if (time) {
    time = '[' + chalk(_time, 'grey') + '] ';
  }
  title = chalk(title, get(configs, 'ttColor'));
  title = time + title;
  var width = get(configs, 'width', 'num');
  if (!width || width < 30 || width > 100) width = 66;
  if (originTtLength > width) {
    var fixLength = title.length - originTtLength - colorEnd.length;
    title = cutString(title, width + fixLength - 3) + colorEnd;
  }
  else if (isFmt) {
    title = array((width - originTtLength) / 2, ' ').join('') + title;
  }
  var valuec = get(configs, 'color');
  if (!has(colorList, valuec)) valuec = 'cyan';
  var isBreakPre = get(configs, 'breakPre', 'bol');
  var isBreakEnd = get(configs, 'breakEnd', 'bol');
  if (!isFmt) {
    if (isBreakPre) console.log('');
    console.log(title + ':');
    try {
      console.log(chalk(pretty(value), valuec));
    } catch (e) {
      console.log(colorList[valuec], value, colorEnd);
    }
    if (isBreakEnd) console.log('');
  }
  else {
    var sgLine_1 = '', dbLine_1 = '';
    for(var i = 0; i < width; i ++ ) { sgLine_1 += '-', dbLine_1 += '='; };
    if (get(configs, 'pre', 'bol')) {
      console.log('\n' + dbLine_1);
      console.log(title);
      console.log(sgLine_1);
    }
    else if (get(configs, '/end', 'bol')) {
      console.log(dbLine_1 + '\n');
    }
    else {
      if (isBreakPre) console.log('');
      console.log(dbLine_1);
      console.log(title);
      console.log(sgLine_1);
      try {
        console.log(chalk(pretty(value), valuec));
      } catch (e) {
        console.log(colorList[valuec], value, colorEnd);
      }
      console.log(dbLine_1);
      if (isBreakEnd) console.log('');
    }
  }
}
/**@function*/
module.exports = log;