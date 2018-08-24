const express = require('express');
const router = express.Router();
const VersionModel = require('../dao/models/version.model');
const VcModel = require('../dao/models/visitCount.model');
const UsersModel = require('../dao/models/users.model');
const SharedJsonModel = require('../dao/models/sharedJson.model');
const vcService = require('../service/visit-count.service');
const util = require('../tools/util');
const fn = require('funclib');

router.get('/', function(req, res, next) {
  res.status(200).send('Api work!');
});

router.get('/zjson/online', function(req, res, next) {
  UsersModel.getOnline((err, num) => {
    if (err) return util.logErr(err, 'Get Online Error', res);
    res.status(200).send({'online': num});
  });
});

router.get('/zjson/users', function(req, res, next) {
  UsersModel.getUsers((err, docs) => {
    if (err) return util.logErr(err, 'Get All Users Error', res);
    res.status(200).send({'online': docs.length, 'users': docs});
  });
});

router.get('/zjson/user/:userId', function(req, res, next) {
  UsersModel.getOneUserById(req.params['userId'], (err, doc) => {
    if (err) return util.logErr(err, 'Get User Info Error', res);
    res.status(200).send(doc);
  });
});

router.get('/zjson/version', function(req, res, next) {
  VersionModel.getVersion((err, doc) => {
    if (err) return util.logErr(err, 'Get Version Error', res);
    res.status(200).send({'version': doc.version});
  });
});

router.post('/zjson/version', function(req, res, next) {
  const version = req.body.version;
  VersionModel.setVersion(version, err => {
    if (err) return util.logErr(err, 'Set Version Error', res);
    res.status(200).send({'status': 'ok', 'version': version});
  });
});

router.get('/refreshVc/:userId', function(req, res, next) {
  vcService.refreshVc(req.params['userId'], req.query['isExpire'], userId => {
    res.status(200).send({'id': userId});
  });
});

router.get('/pollingVc/:userId', function(req, res, next) {
  vcService.pollingVc(req.params['userId'], req.query['isOnInit'], vc => {
    res.status(200).send({'vc': vc});
  });
});

router.get('/sharedJsonList', function(req, res, next) {
  SharedJsonModel.getSjList((err, docs) => {
    if (err) return util.logErr(err, 'Get Shared Json List Error', res);
    res.status(200).send({'total': docs.length, 'sharedJsonList': docs});
  });
});

router.get('/sharedJson/:userId', function(req, res, next) {
  SharedJsonModel.getSjByUserId(req.params['userId'], (err, doc) => {
    if (err) return util.logErr(err, 'Get Shared Json Error', res);
    res.status(200).send(doc);
  });
});

router.post('/sharedJson', function(req, res, next) {
  const data = req.body;
  data.updateTime = fn.time();
  const logErr = err => util.logErr(err, 'Get Shared Json Error', res);
  SharedJsonModel.getSjsByUserId(data.userId, (err, docs) => {
    if (err) logErr(err);
    if (docs && docs.length === 1) {
      SharedJsonModel.updateSjById(data.userId, data, (err, doc) => {
        if (err) return logErr(err);
        res.status(200).send({'status': 'ok'});
      });
    } else {
      SharedJsonModel.removeSjById(data.userId, (err, doc) => {
        if (err) logErr(err);
        SharedJsonModel.createSj(data, (err, doc) => {
          if (err) return logErr(err);
          res.status(200).send({'status': 'ok'});
        });
      });
    }
  });
});
 
module.exports = router;
