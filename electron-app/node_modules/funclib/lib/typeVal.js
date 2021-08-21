var rest = require('./rest');
var typeOf = require('./typeOf');

/**@function*/

/**
 * [fn.typeVal] 获取期望类型的值
 * @param value : any
 * @param type_ : string|string[]
 * @param types : ...string[]
 */
var typeVal = rest(function (value, type_, types) {
  return typeOf.apply(void 0, [value, type_].concat(types)) && value;
});

/**@function*/
module.exports = typeVal;