const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  'userId': String,
  'vtTime': Number,
  'isActive': Boolean,
  'isKeepAc': Boolean
}, {
  timestamps: true,
  collection: 'users'
});

const UsersModel = mongoose.model('zjson-users', UserSchema);

UsersModel.getUsers = function (callback) {
  this.find().exec(callback);
}

UsersModel.getOneUserById = function (userId, callback) {
  this.findOne({ userId: userId }, callback);
}

UsersModel.getUsersById = function (userId, callback) {
  this.find({ userId: userId }, callback);
}

UsersModel.getOnline = function (callback) {
  this.count().exec(callback);
}

UsersModel.createUser = function (userInfo, callback) {
  this.create(new UsersModel(userInfo), callback);
}

UsersModel.removeUser = function (userId, callback) {
  this.remove({ "userId": userId }, callback);
}

UsersModel.updateUser = function (userId, callback) {
  this.findOneAndUpdate( { "userId": userId }, { $set: { 'isKeepAc': true, 'vtTime': Date.now() } }, callback );
}

module.exports = UsersModel;
