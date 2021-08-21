var contains = require('./contains');

/**@function*/

/**
 * [fn.parseQueryStr] 解析Url参数成对象
 * @param url : string
 */
function parseQueryStr(url) {
  if (!contains(url, '?')) return {};
  var queryStr = url.substring(url.lastIndexOf('?') + 1);
  if (queryStr === '') return {};
  var querys = queryStr.split('&'), params = {}, i = -1;
  while (++i < querys.length) {
    var kw = querys[i].split('=')
      , decode = decodeURIComponent;
    params[decode(kw[0])] = decode(kw[1] || '');
  }
  return params;
}

/**@function*/
module.exports = parseQueryStr;