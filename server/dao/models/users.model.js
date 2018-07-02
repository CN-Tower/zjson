const mongoose = require('mongoose');
const UserSchema = require('../schemas/users.schema');
const UsersModel = mongoose.model('zjson-users', UserSchema);
const util = require('../../tools/util');

UsersModel.getUsers = function(callback) {
    this.find().exec(callback);
}

UsersModel.getUserById = function(userId, callback) {
    this.findOne({userId: userId}, callback);
}

UsersModel.getOnline = function(callback) {
    this.count().exec(callback);
}

UsersModel.createUser = function(userInfo, callback) {
    this.create(new UsersModel(userInfo), callback);
}

UsersModel.removeUser = function(userId, callback) {
    this.remove({"userId": userId}, callback);
}

UsersModel.updateUser = function(update, callback) {
    this.findOneAndUpdate({"userId": update.userId}, {$set: update}, callback);
}

module.exports = UsersModel;
