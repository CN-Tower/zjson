const fn = require('funclib');
const config = require('../config');
const SharedJsonModel = require('../models/sharedJson.model');

/**
 * 定时移除过期的分享JSON
 * ------------------------------------------------------------*/
module.exports = function () {
  fn.interval('remove_Expired_SJ', 10 * 60 * 1000, () => {
    SharedJsonModel.getSjList((err, docs) => {
      if (err) fn.log(fn.get(err, 'message'), 'Get Shared Json Err');
      if (docs) {
        docs.forEach(doc => {
          if (fn.time() - doc.updateTime > config.sharedJsonExp) {
            SharedJsonModel.removeSjById(doc.userId, (err, doc) => {
              if (err) fn.log(fn.get(err, 'message'), 'Remove Shared Json Err');
            });
          }
        });
      }
    });
  });
}
