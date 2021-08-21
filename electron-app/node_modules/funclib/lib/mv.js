var fs = require('fs');
var cp = require('./cp');
var rm = require('./rm');

/**@function*/

/**
 * [fn.mv] 移动文件或文件夹
 * @param src  : string
 * @param dist : string
 */
function mv(src, dist) {
  try {
    fs.renameSync(src, dist);
  }
  catch (e) {
    cp(src, dist);
    rm(src);
  }
}

/**@function*/
module.exports = mv;