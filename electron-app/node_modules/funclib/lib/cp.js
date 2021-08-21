var fs = require('fs');
var path = require('path');
var mk = require('./mk');

/**@function*/

/**
 * [fn.cp] 复制文件或文件夹
 * @param src  : string
 * @param dist : string
 * @param isInner : boolean
 */
function cp(src, dist, isInner) {
  function copy(src_, dst_, isOnInit) {
    if (fs.existsSync(src_)) {
      var stat = fs.statSync(src_);
      if (stat.isFile()) {
        if (!path.extname(dst_) && (path.extname(src_) || path.basename(src_) !== path.basename(dst_))) {
          mk(dst_);
          dst_ = path.join(dst_, path.basename(src_));
        }
        fs.createReadStream(src_).pipe(fs.createWriteStream(dst_));
      }
      else if (stat.isDirectory()) {
        if (isOnInit && !isInner) {
          dst_ = path.join(dst_, path.basename(src_));
        }
        mk(dst_);
        var subSrcs = fs.readdirSync(src_);
        subSrcs.forEach(function (file) {
          var subSrc = path.join(src_, file);
          var subDist = path.join(dst_, file);
          copy(subSrc, subDist, false);
        });
      }
    }
  }
  return copy(src, dist, true);
}

/**@function*/
module.exports = cp;