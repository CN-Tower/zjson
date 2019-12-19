const fn = require('funclib');
const config = require('../config');
const UsersModel = require('../models/users.model');
const SharedJsonModel = require('../models/sharedJson.model');

/**
 * 定时移除过期的分享JSON
 * ------------------------------------------------------------*/
module.exports = function () {
  taskThread();
  fn.interval('remove_Expired_SJ', 10 * 60 * 1000, taskThread);
}

function taskThread() {
    UsersModel.getUsers((err, docs) => {
      if (err) fn.log(fn.get(err, 'message'), 'Get User List Err');
      if (docs) {
        docs.forEach(doc => {
          if (Date.now() - doc.vtTime > config.activeUserExp) {
            UsersModel.removeUser(doc.userId, (err, doc) => {
              if (err) fn.log(fn.get(err, 'message'), 'Remove User Err, UserId:' + doc.userId);
            });
          }
        });
      }
    });
    SharedJsonModel.getSjList((err, docs) => {
      if (err) fn.log(fn.get(err, 'message'), 'Get Shared Json Err');
      if (docs) {
        docs.forEach(doc => {
          if (Date.now() - doc.updateTime > config.sharedJsonExp) {
            SharedJsonModel.removeSjById(doc.userId, (err, doc) => {
              if (err) fn.log(fn.get(err, 'message'), 'Remove Shared Json Err');
            });
          }
        });
      }
    });
}
