/**@function*/

/**
 * Get data methods object.
 */
function getTimeObj(date, isUtc) {
  return isUtc ? {
    'y+': date.getUTCFullYear(),
    'M+': date.getUTCMonth() + 1,
    'd+': date.getUTCDate(),
    'h+': date.getUTCHours(),
    'm+': date.getUTCMinutes(),
    's+': date.getUTCSeconds(),
    'S':  date.getUTCMilliseconds(),
    'q+': Math.floor((date.getUTCMonth() + 3) / 3)
  } : {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'S': date.getMilliseconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3)
  }
}

/**@function*/
module.exports = getTimeObj;