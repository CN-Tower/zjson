const mongoose = require('mongoose');
const UserSchema = require('../schemas/users.schema');
const UsersModel = mongoose.model('zjson-version', UserSchema);
const util = require('../../tools/util');

UsersModel.getUsers = function(callback) {
    this.find().exec(callback);
}

UsersModel.getUserById = function(userId, callback) {
    this.findOne({userId: userId}, {}, callback);
}

UsersModel.getOnline = function(callback) {
    this.count().exec(callback);
}

UsersModel.putUser = function(userInfo, callback) {
    const user = new UsersModel(userInfo);
    this.create(userInfo, function(err, doc) {
        util.logErr(err);
    });
}

UsersModel.delUser = function(callback) {
    this.remove({"name": "zjson-version"}, {$set: {version: version}}, callback);
}

UsersModel.updateUser = function(userId, update, callback) {
    const userInfo = this.
    this.findOneAndUpdate({"name": "zjson-version"}, {$set: {version: version}}, callback);
}

module.exports = UsersModel;
