const express = require('express');
const fn = require('funclib');
const router = express.Router();
const vcService = require('../service/visitCount.service');
const VersionModel = require('../models/version.model');
const UsersModel = require('../models/users.model');
const SharedJsonModel = require('../models/sharedJson.model');

router.get('/', function(req, res, next) {
  res.status(200).send('Api work!');
});

/* ### 获取在线人数
 * ===================================== */
router.get('/zjson/online', function(req, res, next) {
  try {
    UsersModel.getOnline((err, num) => {
      if (err) return next(err);
      res.status(200).send({'online': num});
    });
  } catch (err) {
    return next(err);
  }
});

/* ### 获取在线用户列表
 * ===================================== */
router.get('/zjson/users', function(req, res, next) {
  try {
    UsersModel.getUsers((err, docs) => {
      if (err) return next(err);
      res.status(200).send({'online': docs.length, 'users': docs});
    });
  } catch (err) {
    return next(err);
  }
});

/* ### 获取用户信息
 * ===================================== */
router.get('/zjson/user/:userId', function(req, res, next) {
  try {
    UsersModel.getOneUserById(req.params['userId'], (err, doc) => {
      if (err) return next(err);
      res.status(200).send(doc);
    });
  } catch (err) {
    return next(err);
  }
});

/* ### 获取ZJSON版本
 * ===================================== */
router.get('/zjson/version', function(req, res, next) {
  try {
    VersionModel.getVersion((err, doc) => {
      if (err) return next(err);
      res.status(200).send({'version': doc.version});
    });
  } catch (err) {
    fn.log(err);
    return next(err);
  }
});

/* ### 设置ZJSON版本
 * ===================================== */
router.post('/zjson/version', function(req, res, next) {
  try {
    const version = fn.get(req.body, 'version');
    if (fn.typeVal(version, 'str')) {
      VersionModel.setVersion(version, err => {
        if (err) return next(err);
        res.status(200).send({'status': 'ok', 'version': version});
      });
    } else {
      res.status(400).send({'errorMsg': 'Request Body is invalid!'});
    }
  } catch (err) {
    return next(err);
  }
});

/* ### 获取ZJSON桌面安装版版本
 * ===================================== */
router.get('/zjson/appVersion', function(req, res, next) {
  try {
    VersionModel.getAppVersion((err, doc) => {
      if (err) return next(err);
      const info = {version: doc.version, updateUrl: doc.updateUrl};
      res.status(200).send(info);
    });
  } catch (err) {
    return next(err);
  }
});

/* ### 设置ZJSON桌面安装版版本
 * ===================================== */
router.post('/zjson/appVersion', function(req, res, next) {
  try {
    const data = req.body;
    if (['version', 'updateUrl'].every(key => fn.get(data, key, 'str'))) {
      VersionModel.setAppVersion(data, err => {
        if (err) return next(err);
        const info = {'version': data.version, 'updateUrl': data.updateUrl};
        res.status(200).send(info);
      });
    } else {
      res.status(400).send({'errorMsg': 'Request Body is invalid!'});
    }
  } catch (err) {
    return next(err);
  }
});

/* ### 刷新访问量
 * ===================================== */
router.get('/refreshVc/:userId', function(req, res, next) {
  try {
    vcService.refreshVc(req.params['userId'], req.query['isExpire'], next, userId => {
      res.status(200).send({'id': userId});
    });
  } catch (err) {
    return next(err);
  }
});

/* ### 轮询访问量
 * ===================================== */
router.get('/pollingVc/:userId', function(req, res, next) {
  try {
    vcService.pollingVc(req.params['userId'], req.query['isOnInit'], next, vc => {
      res.status(200).send({'vc': vc});
    });
  } catch (err) {
    return next(err);
  }
});

/* ### 获取所用用户分享的JSON
 * ===================================== */
router.get('/sharedJsonList', function(req, res, next) {
  try {
    SharedJsonModel.getSjList((err, docs) => {
      if (err) return next(err);
      res.status(200).send({'total': docs.length, 'sharedJsonList': docs});
    });
  } catch (err) {
    return next(err);
  }
});

/* ### 获取用户分享的JSON
 * ===================================== */
router.get('/sharedJson/:userId', function(req, res, next) {
  try {
    SharedJsonModel.getSjByUserId(req.params['userId'], (err, doc) => {
      if (err) return next(err);
      res.status(200).send(doc);
    });
  } catch (err) {
    return next(err);
  }
});

/* ### 分享的JSON
 * ===================================== */
router.post('/sharedJson', function(req, res, next) {
  try {
    const data = req.body;
    data.updateTime = fn.time();
    SharedJsonModel.getSjsByUserId(data.userId, (err, docs) => {
      if (err) return next(err);
      if (docs && docs.length === 1) {
        SharedJsonModel.updateSjById(data.userId, data, (err, doc) => {
          if (err) return next(err);
          res.status(200).send({'status': 'ok'});
        });
      } else {
        SharedJsonModel.removeSjById(data.userId, (err, doc) => {
          if (err) return next(err);
          SharedJsonModel.createSj(data, (err, doc) => {
            if (err) return next(err);
            res.status(200).send({'status': 'ok'});
          });
        });
      }
    });
  } catch (err) {
    return next(err);
  }
});
 
module.exports = router;
