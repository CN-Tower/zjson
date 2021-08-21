var rest = require('./rest');
var patternBase = require('./_patternBase');

/**@function*/

/**
 * [fn.matchPattern]与一个或几个通用正则匹配
 * @param srcStr : string
 * @param type_  : 'cnChar'|'dbChar'|'email'|'phone'|'telephone'|'idCard'|'uuid'|'base64Code'|'domain'|
 * 'port'|'ip'|'ipUrl'|'domainUrl'|'url'|'ipWithPortUrl'|'domainWithPortUrl'|'withPortUrl'
 * @param types  : ...string[]
 * @param limit  : boolean = true
 */
var matchPattern = rest(function (srcStr, type_, types) {
  if (!srcStr || !type_) return null;
  return patternBase(srcStr, [type_].concat(types), false);
});

/**@function*/
module.exports = matchPattern;