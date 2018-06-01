var express = require('express');
var router = express.Router();
var visitsWork = require('../work/visits-count.wrok');

router.get('/', function(req, res, next) {
  res.send('ok!');
});

router.get('/userId', function(req, res, next) {
  res.send(200, {id: visitsWork.addUser()});
});

router.get('/visitCount/:userId', function(req, res, next) {
  visitsWork.getAndSetVisits(req.params['userId'], (visits, newUserId) => {
    res.send(200, {nb: visits, id: newUserId || null});
  });
});

module.exports = router;
