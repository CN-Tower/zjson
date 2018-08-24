var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var btService = require('./service/base-thread.service');

var index = require('./routes/index');
var api = require('./routes/api');

btService.start();

// connect to mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/zjson');
// mongoose.connect('mongodb://10.40.154.118/zjson');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'unable to connect to mongodb'));
db.once('open', function() {
  console.log("connect to mongodb success...");
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /zjson
//app.use(favicon(path.join(__dirname, 'zjson', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'zjson')));

app.use('/', index);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
