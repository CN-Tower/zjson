const express = require('express');
const router = express.Router();
const vcService = require('../service/visit-count.service');
const VersionModel = require('../dao/models/version.model');
const VcModel = require('../dao/models/visitCount.model');
const UsersModel = require('../dao/models/users.model');
const util = require('../tools/util');

router.get('/', function(req, res, next) {
  res.status(200).send('Api work!');
});

router.get('/zjson/online', function(req, res, next) {
  UsersModel.getOnline((err, num) => {
    util.logErr(err, 'Get Online Error');
    res.status(200).send({'online': num});
  });
});

router.get('/zjson/users', function(req, res, next) {
  UsersModel.getUsers((err, docs) => {
    util.logErr(err, 'Get All Users Error');
    res.status(200).send({'online': docs.length, 'users': docs});
  });
});

router.get('/zjson/user/:userId', function(req, res, next) {
  UsersModel.getOneUserById(req.params['userId'], (err, doc) => {
    util.logErr(err, 'Get User Info Error');
    res.status(200).send(doc);
  });
});

router.get('/zjson/version', function(req, res, next) {
  VersionModel.getVersion((err, doc) => {
    util.logErr(err, 'Get Version Error');
    res.status(200).send({'version': doc.version});
  });
});

router.post('/zjson/version', function(req, res, next) {
  VersionModel.setVersion(req.body.version, (err, doc) => {
    util.logErr(err, 'Set Version Error');
    res.status(200).send({'status': 'ok', 'version': doc.version});
  });
});

router.post('/zjson/setVc', function(req, res, next) {
  VcModel.setVisitCount(req.body.vc, (err, doc) => {
    util.logErr(err, 'Set VC Error');
    res.status(200).send({'status': 'ok', 'vc': doc.count});
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
 
module.exports = router;
