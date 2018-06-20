var express = require('express');
var router = express.Router();
var fn = require('funclib');
var vcWork = require('../work/visit-count.wrok');
var vcService = require('../service/visit-count.service');

router.get('/', function(req, res, next) {
  res.status(200).send('ok')
});

router.get('/zjson/version', function(req, res, next) {
  res.status(200).send({'version': vcService.getVersion()});
});

router.get('/vc/refreshVc/:userId', function(req, res, next) {
  vcWork.refreshVisitCount(req.params['userId'], (userId) => {
    res.status(200).send({'id': userId});
  });
});

router.get('/vc/pollingVc/:userId', function(req, res, next) {
  res.status(200).send({'vc': vcService.getVisitCount()});
});

module.exports = router;
