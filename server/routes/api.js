var express = require('express');
var router = express.Router();
var visitsWorker = require('../worker/visits-wroker');

router.get('/', function(req, res, next) {
  res.send('ok!');
});

router.get('/userId', function(req, res, next) {
  res.send(200, {id: visitsWorker.addUser()});
});

router.get('/visitCount/:userId', function(req, res, next) {
  visitsWorker.getAndSetVisits(req.params['userId'], (visits, newUserId) => {
    res.send(200, {nb: visits, id: newUserId || null});
  });
});

module.exports = router;
