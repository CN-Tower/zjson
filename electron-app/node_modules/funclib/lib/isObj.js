var isArr = require('./isArr');
var isFun = require('./isFun');
var isErr = require('./isErr');
var isDat = require('./isDat');
var isReg = require('./isReg');
var config = require('./_config');

var _global = config._global
  , _self = config._self;

/**@function*/

/**
 * [fn.isObj] 判断是否为：正常Object
 * @param value : any
 */
function isObj(value) {
  return !!value && typeof value == 'object'
    && [_global, _self].indexOf(value) == -1
    && [isArr, isFun, isErr, isDat, isReg].every(function(func) { return !func(value); });
}

/**@function*/
module.exports = isObj;