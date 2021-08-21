/**@config*/

var version = '6.0.5';

var undefined, UDF = undefined, F = function() {}
  , _global = typeof global == 'object' && global && global.Object === Object && global
  , _self = typeof self == 'object' && self && self.Object === Object && self
  , _exports = typeof exports == 'object' && exports && !exports.nodeType && exports
  , _module = _exports && typeof module == 'object' && module && !module.nodeType && module
  , root = _global || _self || Function('return this')()
  , oldFn = root.fn;

/**
 * HTML encode and decode characters.
 */
var deCodes = ['&', '<', '>', ' ', '\'', '"']
  , enCodes = ['&amp;', '&lt;', '&gt;', '&nbsp;', '&#39;', '&quot;'];

/**
 * String match variables.
 */
var MATCH_SYMBOL='__@fnMatch__'
  , MATCH_NEST = '@next';

/**
 * Frequently-used regular expression patterns.
 */
var patterns = {
  cnChar: /[\u4e00-\u9fa5]/,
  dbChar: /[^x00-xff]/,
  email: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
  phone: /(\+?0?86\-?)?1[3456789]\d{9}/,
  telephone: /((\d{3,4})|\d{3,4}-)?\d{7,8}/,
  idCard: /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)/,
  uuid: /[0-9a-zA-Z]{8}-([0-9a-zA-Z]{4}-){3}[0-9a-zA-Z]{12}/,
  base64Code: /([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?/,
  domain: /([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6}/,
  port: /([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])/,
  ip: /((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)/,
  url_: /(\/([^?#]*))?(\?([^#]*))?(#(.*))?/
};
patterns['ipUrl'] = new RegExp('http(s)?://' + patterns.ip.source + '(:' + patterns.port.source + ')?' + patterns.url_.source);
patterns['domainUrl'] = new RegExp('http(s)?://' + patterns.domain.source + '(:' + patterns.port.source + ')?' + patterns.url_.source);
patterns['url'] = new RegExp('http(s)?://(' + patterns.ip.source + '|' + patterns.domain.source + ')(:' + patterns.port.source + ')?' + patterns.url_.source);

/**
 * timers container.
 */
var intervalTimers = {}
  , timeoutTimers  = {};

/**
 * Char sets
 */
var charNb = '0123456789'
  , charLower = 'abcdefghijklmnopqrstuvwxyz'
  , charUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  , charPwd = '~!@#$%^&*_';

/**@conf-client*/
/**@conf-client*/
/**@conf-server*/
/**
 * Color string of console display.
 */
var colorPre = '\x1B[';
var colorEnd = colorPre + '0m';
var colorList = {
  'grey': colorPre + '90m',
  'blue': colorPre + '34m',
  'cyan': colorPre + '36m',
  'green': colorPre + '32m',
  'magenta': colorPre + '35m',
  'red': colorPre + '31m',
  'yellow': colorPre + '33m',
  'default': ''
};
/**@conf-server*/

/**@config*/
module.exports = {
  version: version,
  UDF: UDF,
  F: F,
  root: root,
  oldFn: oldFn,
  charNb: charNb,
  charLower: charLower,
  charUpper: charUpper,
  charPwd: charPwd,
  deCodes: deCodes,
  enCodes: enCodes,
  patterns: patterns,
  intervalTimers: intervalTimers,
  timeoutTimers: timeoutTimers,
  colorPre: colorPre,
  colorEnd: colorEnd,
  colorList: colorList,
  MATCH_SYMBOL: MATCH_SYMBOL,
  MATCH_NEST: MATCH_NEST
};
