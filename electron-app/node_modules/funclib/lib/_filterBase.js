var isObj = require('./isObj');
var isFun = require('./isFun');
var keys = require('./keys');
var forEach = require('./forEach');

/**@function*/

/**
 * Basic methods of array filter and reject.
 */
function filterBase(srcArr, predicate, isFilter) {
  var fts = [], rjs = [];
  forEach(srcArr, function (item) {
    if (isObj(predicate)) {
      keys(predicate).every(function (key) {
        return predicate[key] === item[key];
      }) ? fts.push(item) : rjs.push(item);
    }
    else if (isFun(predicate)) {
      predicate(item) ? fts.push(item) : rjs.push(item);
    }
  });
  return isFilter ? fts : rjs;
}

/**@function*/
module.exports = filterBase;

