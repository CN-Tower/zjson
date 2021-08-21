var typeOf = require('./typeOf');
var forIn = require('./forIn');
var len = require('./len');

/**@function*/

/**
 * [fn.stringifyQueryStr] 把对象编译成Url参数
 * @param obj : object
 */
function stringifyQueryStr(obj) {
  if (!typeOf(obj, 'obj', 'arr')) return '';
  obj = JSON.parse(JSON.stringify(obj));
  if (!len(obj)) return '';
  var pairs = [];
  forIn(obj, function (key, value) {
    var encode = encodeURIComponent;
    pairs.push(encode(key) + '=' + encode(value));
  });
  return '?' + pairs.join('&');
}

/**@function*/
module.exports = stringifyQueryStr;