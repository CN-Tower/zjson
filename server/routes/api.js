const express = require('express');
const router = express.Router();
const vcWork = require('../worker/visit-count.wroker');
const VersionModel = require('../dao/models/version.model');
const VcModel = require('../dao/models/visitCount.model');
const UsersModel = require('../dao/models/users.model')
const util = require('../tools/util');
const fn = require('funclib');

router.get('/', function(req, res, next) {
  res.status(200).send('Api work!')
});

router.get('/zjson/users', function(req, res, next) {
  UsersModel.getUsers((err, doc) => {
    util.logErr(err, 'Get All visits Error');
    res.status(200).send({'visits': doc});
  });
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
    res.status(200).send({version: version});
  });
});

router.get('/online', function(req, res, next) {
  VcModel.getOnline(num => res.status(200).send({'online': num}));
});

router.get('/user/:userId', function(req, res, next) {
  res.status(200).send(vcWork.getUser(req.params['userId']) || {})
});

router.get('/refreshVc/:userId', function(req, res, next) {
  vcWork.refreshVc(req.params['userId'], req.query['isExpire'], (userId) => {
    res.status(200).send({'id': userId});
  });
});

router.get('/pollingVc/:userId', function(req, res, next) {
  vcWork.pollingVc(req.params['userId'], vc => {
    res.status(200).send({'vc': vc});
  });
});
 
module.exports = router;
