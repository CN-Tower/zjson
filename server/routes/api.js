var express = require('express');
var router = express.Router();
var fn = require('funclib');
var vcWork = require('../work/visit-count.wrok');
var vcService = require('../service/visit-count.service');

router.get('/', function(req, res, next) {
  res.send('ok!');
});

router.get('/vc/refreshVc/:userId', function(req, res, next) {
  vcWork.refreshVisitCount(req.params['userId'], (userId) => {
    res.send(200, {'id': userId});
  });
});

router.get('/vc/pollingVc/:userId', function(req, res, next) {
  res.send(200, {'vc': vcService.getVisitCount()});
});

module.exports = router;
