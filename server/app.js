const express = require('express');
const fn = require('funclib');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const timeout = require('connect-timeout');
const mongoose = require('mongoose');
const routers = require('./routes');
const config = require('./config');

require('./service/taskThread.service')();

mongoose.connect(config.dburl);

const db = mongoose.connection;
db.on('error', () => {
  fn.log('数据库连接失败！', { title: 'MongoDB', color: 'red' });
});
db.once('open', () => {
  fn.log('数据库连接成功！', { title: 'MongoDB', color: 'green' });
});

const app = express();

app.all('*', (req, res, next) => {
  res.header("X-Powered-By", '1.0.1');
  if (req.method === 'OPTIONS') {
    res.status(200).send({ status: 1, message: 'ok' });
  } else {
    next();
  }
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'zjson')));
app.use(timeout(10000));
app.use((req, res, next) => {
  if (!req.timedout) next();
});

app.use('/api', routers);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || fn.typeVal(err.code, 'num') || 500);
  res.json({ status: 0, message:  err.message });
});

app.listen(config.port, () => {
  fn.log(`Listenig on port: ${config.port}`, { title: 'ZJSON.NET', color: 'green' });
});

