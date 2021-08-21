var fs = require('fs');
var path = require('path');
var execSync = require('child_process').execSync
var forEach = require('./forEach');
var defer = require('./defer');

/**@function*/

/**
 * [fn.rm] 删除文件或文件夹
 * @param src : string
 */
function rm(src) {
  if (fs.existsSync(src)) {
    var stat = fs.statSync(src);
    if (stat.isFile()) {
      fs.unlinkSync(src);
    }
    else if (stat.isDirectory()) {
      var subSrcs = fs.readdirSync(src);
      forEach(subSrcs, function (file) {
        var subSrc = path.join(src, file);
        rm(subSrc);
      });
      try {
        fs.rmdirSync(src);
      } catch (e) {
        defer(function() {
          if (/^win/.test(process.platform)) {
            var absSrc = path.resolve(src);
            execSync('rd /s /q ' + absSrc);
          } else {
            execSync('rm -rf ' + src);
          }
        })
      }
    }
  }
}

/**@function*/
module.exports = rm;