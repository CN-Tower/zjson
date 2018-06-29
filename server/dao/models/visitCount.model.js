const mongoose = require('mongoose');
const VisitCountSchema = require('../schemas/visitCount.schema');
const VisitCountModel = mongoose.model('version', VisitCountSchema);
const util = require('../../tools/util');
const fn = require('funclib');

VisitCountModel.addOneVisit = function() {
    this.findOneAndUpdate({"name": "zjson-version"}, {$inc: {count: 1}}, function(err, doc) {
        util.logErr(err);
    });
}

VisitCountModel.getVisitCount = function(callback) {
    return this.findOne({"name": "zjson-version"}, {}, callback);
}

module.exports = VisitCountModel;
