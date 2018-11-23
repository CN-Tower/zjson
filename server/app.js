const fn = require('funclib');
const mongoose = require('mongoose');
const config = require('../config');

module.exports = function () {

  mongoose.Promise = global.Promise;
  const db = mongoose.connection;

  db.on('connected', function() {
    fn.log('Connect to MongoDB success!', { title: 'MongoDB', color: 'green' });
  });

  db.on('error', err => {
    fn.log(`Connect to MongoDB failed: ${err}`, { title: 'MongoDB', color: 'red' });
    mongoose.disconnect();
  });

  db.on('disconnected', () => {
    fn.log('Reconnecting to MongoDB...', { title: 'MongoDB', color: 'green' });
    fn.timeout(5000, () => mongoose.connect(config.dbUrl, { useNewUrlParser: true }));
  });

  mongoose.connect(config.dbUrl, { useNewUrlParser: true }); 

}
