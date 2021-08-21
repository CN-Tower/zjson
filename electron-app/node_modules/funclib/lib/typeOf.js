var rest = require('./rest');
var toArr = require('./toArr');
var isStr = require('./isStr');
var isNum = require('./isNum');
var isBol = require('./isBol');
var isFun = require('./isFun');
var isNul = require('./isNul');
var isUdf = require('./isUdf');
var isErr = require('./isErr');
var isDat = require('./isDat');
var isReg = require('./isReg');
var isArr = require('./isArr');
var isObj = require('./isObj');

/**@function*/

/**
 * [fn.typeOf] 检查值的类型
 * @param value : any
 * @param type_ : string|string[]
 * @param types : ...string[]
 */
var typeOf = rest(function (value, type_, types) {
  if (!type_) return false;
  types = toArr(type_).concat(types);
  return types.some(function (_type) {
    switch (_type) {
      case 'str': return isStr(value);
      case 'num': return isNum(value);
      case 'bol': return isBol(value);
      case 'fun': return isFun(value);
      case 'nul': return isNul(value);
      case 'udf': return isUdf(value);
      case 'err': return isErr(value);
      case 'dat': return isDat(value);
      case 'reg': return isReg(value);
      case 'arr': return isArr(value);
      case 'obj': return isObj(value);
      default: return typeof value === _type;
    }
  });
});

/**@function*/
module.exports = typeOf;