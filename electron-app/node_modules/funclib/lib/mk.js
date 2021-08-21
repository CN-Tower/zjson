var fs = require('fs');
var path = require('path');

/**@function*/

/**
 * [fn.mk] 创建文件夹
 * @param dir : string
 */
function mk(dir) {
  var absDir = path.resolve(dir);
  if (!fs.existsSync(absDir)) {
    try {
      fs.mkdirSync(absDir);
    }
    catch (e) {
      mk(path.dirname(absDir));
      fs.mkdirSync(absDir);
    }
  }
}

/**@function*/
module.exports = mk;