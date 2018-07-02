const express = require('express');
const router = express.Router();
const vcWork = require('../worker/visit-count.wroker');
const VersionModel = require('../dao/models/version.model');
const VcModel = require('../dao/models/visitCount.model');
const UsersModel = require('../dao/models/users.model');
const fn = require('funclib');
const util = require('../tools/util');

router.get('/', function(req, res, next) {
  res.status(200).send('Api work!')
});

router.get('/zjson/online', function(req, res, next) {
  UsersModel.getOnline((err, num) => res.status(200).send({'online': num}));
});

router.get('/zjson/users', function(req, res, next) {
  UsersModel.getUsers((err, collections) => {
    util.logErr(err, 'Get All users Error');
    res.status(200).send({'online': collections.length, 'users': collections});
  });
});

router.get('/zjson/user/:userId', function(req, res, next) {
  res.status(200).send(vcWork.getUser(req.params['userId']) || {})
});

router.get('/zjson/version', function(req, res, next) {
  VersionModel.getVersion((err, doc) => {
    util.logErr(err, 'Get Version Error');
    res.status(200).send({'version': doc.version});
  });
});

router.post('/zjson/version', function(req, res, next) {
  const version = req.body.version
  VersionModel.setVersion(version, (err, doc) => {
    util.logErr(err, 'Set Version Error');
    res.status(200).send({'status': 'ok', 'version': version});
  });
});

router.post('/zjson/setVc', function(req, res, next) {
  const count = req.body.vc
  VcModel.setVisitCount(count, (err, doc) => {
    util.logErr(err, 'Set VC Error');
    res.status(200).send({'status': 'ok', 'vc': count});
  });
});

router.get('/refreshVc/:userId', function(req, res, next) {
  vcWork.refreshVc(req.params['userId'], req.query['isExpire'], (userId) => {
    res.status(200).send({'id': userId});
  });
});

router.get('/pollingVc/:userId', function(req, res, next) {
  vcWork.pollingVc(req.params['userId'], req.query['isOnInit'], vc => {
    res.status(200).send({'vc': vc});
  });
});
 
module.exports = router;
