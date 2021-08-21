var isUdf = require('./isUdf');
var isObj = require('./isObj');
var isFun = require('./isFun');
var has = require('./has');
var len = require('./len');
var keys = require('./keys');
var throwErr = require('./_throwErr');
var config = require('./_config');

var UDF = config.UDF
  , MATCH_SYMBOL = config.MATCH_SYMBOL
  , MATCH_NEST = config.MATCH_NEST;

/**@function*/

/**
 * [fn.match] 字符串匹配
 * @param source : any
 * @param cases  ：object
 * @param isExec : boolean = true
 */
function match(source, cases, isExec) {
  if (!isObj(cases)) throwErr('obj');
  if (isUdf(isExec)) isExec = true;
  var symbol = MATCH_SYMBOL;
  if (has(cases, source)) {
    symbol = source;
  } else if (has(cases, 'default')) {
    symbol = 'default';
  }
  var matched = cases[symbol];
  if (matched === MATCH_NEST) {
    var ks = keys(cases), i = ks.indexOf(symbol) - 1;
    while (++i < ks.length) if (cases[ks[i]] !== MATCH_NEST) {
      matched = cases[ks[i]];
      break;
    }
  }
  if (isExec && isFun(matched)) {
    return len(matched) ? matched(source) : matched();
  } else {
    return matched === MATCH_NEST ? UDF : matched;
  }
}

/**@function*/
module.exports = match;