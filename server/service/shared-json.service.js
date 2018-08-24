const SharedJsonModel = require('../dao/models/sharedJson.model');
const fn = require('funclib');
const util = require('../tools/util');

const expireTime = 3600000 * 24 * 2;

module.exports = {
  removeExpireJson: removeExpireJson
}

function removeExpireJson() {
  SharedJsonModel.getSjList((err, docs) => {
    util.logErr(err, 'Get SJ List error');
    if (docs) {
      docs.forEach(doc => {
        if (fn.time() - doc.updateTime > expireTime) {
          SharedJsonModel.removeSjById(doc.userId, (err, doc) => {
            util.logErr(err, 'Remove expire SJ error');
          });
        }
      });
    }
  });
}
