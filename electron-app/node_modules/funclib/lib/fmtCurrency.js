var isUdf = require('./isUdf');

/**@function*/

/**
 * [fn.fmtCurrency] 格式化显示货币
 * @param number : number
 * @param digit  : number = 2
 */
function fmtCurrency(number, digit) {
  if (isUdf(digit)) digit = 2;
  var nbArr = String(number.toFixed(digit)).split('.')
    , integer = nbArr[0]
    , decimal = nbArr.length > 1 ? nbArr[1] : ''
    , integerStr, spn, sti, i;
  spn = Math.floor(integer.length / 3);
  sti = integer.length % 3;
  integerStr = integer.substr(0, sti);
  for (i = 0; i < spn; i++) {
    integerStr += (i === 0 && (integerStr === '-' || !integerStr)) ? integer.substr(sti, 3) : ',' + integer.substr(sti, 3);
    sti += 3;
  }
  return decimal ? integerStr + '.' + decimal : integerStr;
}

/**@function*/
module.exports = fmtCurrency;