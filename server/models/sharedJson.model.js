const mongoose = require('mongoose');

const SharedJsonSchema = new mongoose.Schema({
  userId: String,
  sharedJson: String,
  updateTime: Number,
}, {
  collection: 'sharedJson'
});

const SharedJsonModel = mongoose.model('shared-json', SharedJsonSchema);

SharedJsonModel.getSjList = function (userId, callback) {
  this.find({}, callback);
}

SharedJsonModel.getSjsByUserId = function (userId, callback) {
  this.find({ "userId": userId }, callback);
}

SharedJsonModel.getSjByUserId = function (userId, callback) {
  this.findOne({ "userId": userId }, callback);
}

SharedJsonModel.createSj = function (sharedJson, callback) {
  this.create(new SharedJsonModel(sharedJson), callback);
}

SharedJsonModel.removeSjById = function (userId, callback) {
  this.remove({ "userId": userId }, callback);
}

SharedJsonModel.updateSjById = function (userId, data, callback) {
  this.findOneAndUpdate(
    { "userId": userId }, data, { "new": true }, callback
  );
}

module.exports = SharedJsonModel;
