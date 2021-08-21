var isUdf = require('./isUdf');
var has = require('./has');
var keys = require('./keys');
var contains = require('./contains');
var patterns = require('./_config').patterns;

/**@function*/

/**
 * [fn.getPattern]获取一个通用的正则表达式
 * @param type_ : string
 * @param limit : boolean = true
 */
function getPattern(type_, limit) {
  if (!type_) return;
  if (isUdf(limit)) limit = true;
  if (contains(['all', 'list'], type_)) return keys(patterns);
  if (!has(patterns, type_)) return UDF;
  var pattern = patterns[type_];
  return limit ? new RegExp('^(' + pattern.source.replace(/^(\^|\$)$/mg, '') + ')$') : pattern;
}

/**@function*/
module.exports = getPattern;