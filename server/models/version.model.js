const mongoose = require('mongoose');
const VersionSchema = require('../schemas/version.schema');
const VersionModel = mongoose.model('zjson-version', VersionSchema);

VersionModel.getVersion = function(callback) {
    this.findOne({"name": "zjson-version"}, callback);
}

VersionModel.setVersion = function(version, callback) {
    this.findOneAndUpdate({"name": "zjson-version"}, {$set: {version: version}}, callback);
}

VersionModel.getAppVersion = function(callback) {
  this.findOne({"name": "zjson-version-app"}, callback);
}

VersionModel.setAppVersion = function(data, callback) {
  data.name = 'zjson-version-app';
  this.findOneAndUpdate({"name": "zjson-version-app"}, data, {"new": true}, callback);
}

module.exports = VersionModel;
