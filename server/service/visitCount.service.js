const fn = require('funclib');
const VisitCountModel = require('../models/visitCount.model');
const UsersModel = require('../models/users.model');

/**
 * 轮询访问量
 * ------------------------------------------------------------*/
exports.pollingVc = function (userId, isOnInit, next, callback) {
  UsersModel.getUsersById(userId, (err, docs) => {
    if (err) return next(err);
    if (docs.length) {
      if (docs.length === 1) {
        setUserExpireTime(userId);
      } else {
        UsersModel.removeUser(userId, err => {
          if (err) fn.log(fn.get(err, 'message'), 'Remove User Err');
          addLoseUser(userId);
        });
      }
    } else if (isOnInit === 'no' && /^ZJSON-[0-9A-Z]{12}$/.test(userId)) {
      addLoseUser(userId);
    }
    VisitCountModel.getVisitCount((err, doc) => {
      if (err) return next(err);
      callback(doc && doc.count || 0);
    });
  });
}

/**
 * 刷新访问量
 * ------------------------------------------------------------*/
exports.refreshVc = function (userId, isExpire, next, callback) {
  UsersModel.getOneUserById(userId, (err, doc) => {
    if (err) return next(err);
    if (doc) {
      if (isExpire === 'yes' && doc.isKeepAc) {
        VisitCountModel.addOneVisit((err, doc) => {
          if (err) fn.log(fn.get(err, 'message'), 'Add One Visit Err');
        });
      }
      callback(null);
    } else {
      VisitCountModel.addOneVisit((err, doc) => {
        if (err) fn.log(fn.get(err, 'message'), 'Add One Visit Err');
      });
      userId = 'ZJSON-' + fn.rdid();
      addUser(userId, next, () => callback(userId));
    }
  });
}

function setUserExpireTime(userId) {
  fn.timeout(userId, 20000, () => {
    UsersModel.removeUser(userId, err => {
      if (err) fn.log(fn.get(err, 'message'), 'Set User Expire Err');
    });
  });
}

function addLoseUser(userId) {
  UsersModel.createUser({
    'userId': userId,
    'vtTime': fn.time(),
    'isActive': true,
    'isKeepAc': true
  });
  setUserExpireTime(userId);
}

function addUser(userId, next, callback) {
  const vtTime = fn.time();
  const newUser = {
    'userId': userId,
    'vtTime': vtTime,
    'isActive': true,
    'isKeepAc': false
  };
  UsersModel.createUser(newUser, err => {
    if (err) return next(err);
    callback();
  });
  setUserExpireTime(userId);
  fn.timeout(310000, () => {
    UsersModel.updateUser(userId, err => {
      if (err) fn.log(fn.get(err, 'message'), 'Update User Err');
    });
  });
}
