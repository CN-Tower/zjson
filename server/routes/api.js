var express = require('express');
var router = express.Router();
var fn = require('funclib');
var vcWork = require('../work/visit-count.wrok');

router.get('/', function(req, res, next) {
  res.status(200).send('ok')
});

router.get('/zjson/version', function(req, res, next) {
  res.status(200).send({'version': vcWork.getVersion()});
});

router.get('/online', function(req, res, next) {
  res.status(200).send({'online': vcWork.getOnline()});
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
  res.status(200).send({'vc': vcWork.pollingVc(req.params['userId'])});
});
 
module.exports = router;
