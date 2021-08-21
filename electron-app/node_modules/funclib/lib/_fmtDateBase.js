var forIn = require('./forIn');
var dateBase = require('./_dateBase');
var getTimeObj = require('./_getTimeObj');

/**@function*/

/**
 * Basic methods of date formation.
 */
function fmtDateBase(fmtStr, time, isUtc) {
  var date = dateBase(time)
    , dateTime = date.getTime();
  if (!dateTime && dateTime !== 0) {
    return '';
  }
  var timeObj = getTimeObj(date, isUtc);
  forIn(timeObj, function (k) {
    if (new RegExp('(' + k + ')').test(fmtStr)) {
      if (k === 'y+') {
        fmtStr = fmtStr.replace(RegExp.$1, (timeObj['y+'] + '').substr(4 - RegExp.$1.length));
      } else {
        var tmk = timeObj[k]
          , fmt = RegExp.$1.length === 1 ? tmk : ('00' + tmk).substr((tmk + '').length);
        fmtStr = fmtStr.replace(RegExp.$1, fmt);
      }
    }
  });
  return fmtStr;
}

/**@function*/
module.exports = fmtDateBase;