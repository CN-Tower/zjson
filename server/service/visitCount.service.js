const fn = require('funclib');
const VisitCountModel = require('../models/visitCount.model');
const UsersModel = require('../models/users.model');

/**
 * 轮询访问量
 * ------------------------------------------------------------*/
exports.pollingVc = function (req, res, next) {
  try {
    const userId = req.params['userId'];
    const isOnInit = req.query['isOnInit'];
    UsersModel.getUsersById(userId, (err, docs) => {
      if (req.timedout) return;
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
        if (req.timedout) return;
        if (err) return next(err);
        res.status(200).send({'vc': doc && doc.count || 0});
      });
    });
  } catch (err) {
    return next(err);
  }
}

/**
 * 刷新访问量
 * ------------------------------------------------------------*/
exports.refreshVc = function (req, res, next) {
  try {
    let userId = req.params['userId'];
    UsersModel.getOneUserById(userId, (err, doc) => {
      if (req.timedout) return;
      if (err) return next(err);
      if (doc) {
        UsersModel.updateUser(userId, err => {
          if (err) fn.log(fn.get(err, 'message'), 'Update User Err, UserId: ' + userId);
        });
        if (req.query['isExpire'] === 'yes' && doc.isKeepAc) {
          VisitCountModel.addOneVisit(err => {
            if (err) fn.log(fn.get(err, 'message'), 'Add One Visit Err, UserId: ' + userId);
          });
        }
        res.status(200).send({'id': null});
      } else {
        VisitCountModel.addOneVisit(err => {
          if (err) fn.log(fn.get(err, 'message'), 'Add One Visit Err, UserId: ' + userId);
        });
        userId = 'ZJSON-' + fn.randomId();
        const vtTime = Date.now();
        const newUser = {
          'userId': userId,
          'vtTime': vtTime,
          'isActive': true,
          'isKeepAc': false
        };
        UsersModel.createUser(newUser, err => {
          if (req.timedout) return;
          if (err) return next(err);
          res.status(200).send({'id': userId});
        });
        setUserExpireTime(userId);
        fn.timeout(300000, () => {
          UsersModel.getUsersById(userId, (err, doc) => {
            if (err) fn.log(fn.get(err, 'message'), 'Get User Err, UserId: ' + userId);
            if (doc) {
              UsersModel.updateUser(userId, err => {
                if (err) fn.log(fn.get(err, 'message'), 'Update User Err, UserId: ' + userId);
              });
            }
          });
        });
      }
    });
  } catch (err) {
    return next(err);
  }
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
    'vtTime': Date.now(),
    'isActive': true,
    'isKeepAc': true
  });
  setUserExpireTime(userId);
}
