var rest = require('./rest');
var isUdf = require('./isUdf');
var isFun = require('./isFun');
var keys = require('./keys');
var forEach = require('./forEach');

/**@function*/

/**
 * [fn.chain] funclib链接调用
 * @param value: any
 */
function chain(value) {
  var chainedFn = { 'value': value };
  chainedFn.val = function () {
    return chainedFn.value;
  };
  forEach(keys(funclib), function (method) {
    if (method === 'match') {
      chainedFn[method] = function () {
        strProto[method].call(arguments);
      }
    } else {
      chainedFn[method] = rest(function (args) {
        if (!isUdf(chainedFn.value)) {
          args = [chainedFn.value].concat(args);
        }
        return chain(isFun(fn[method]) ? fn[method].apply(void 0, args) : fn[method]);
      });
    }
  });
  return chainedFn;
}

/**@function*/
module.exports = chain;