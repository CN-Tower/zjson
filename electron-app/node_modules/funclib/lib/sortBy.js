var get = require('./get');

/**@function*/

/**
 * [fn.sortBy] 返回对象数组根据字段排序后的副本
 * @param srcArr    : array
 * @param fieldPath : string
 * @param isDesc    : boolean = false
 */
function sortBy(srcArr, fieldPath, isDesc) {
  return srcArr.slice().sort(function (row1, row2) {
    var rst1 = get(row1, fieldPath), rst2 = get(row2, fieldPath);
    if (rst1 !== 0 && !rst1) {
      return isDesc ? 1 : -1;
    } else if (rst2 !== 0 && !rst2) {
      return isDesc ? -1 : 1;
    } else if (rst1 === rst2) {
      return 0;
    } else {
      return (rst1 > rst2) ? (isDesc ? -1 : 1) : (isDesc ? 1 : -1);
    }
  });
}

/**@function*/
module.exports = sortBy;