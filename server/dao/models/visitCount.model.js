const mongoose = require('mongoose');
const VisitCountSchema = require('../schemas/visitCount.schema');
const VisitCountModel = mongoose.model('version', VisitCountSchema);
const util = require('../../tools/util');
const fn = require('funclib');

VisitCountModel.addOneVisit = function(callback) {
    this.findOneAndUpdate({"name": "zjson-version"}, {$inc: {count: 1}}, callback);
}

VisitCountModel.getVisitCount = function(callback) {
    return this.findOne({"name": "zjson-version"}, {}, callback);
}

VisitCountModel.setVisitCount = function(count, callback) {
    this.getVisitCount((err, doc) => {
        if (doc) {
            this.findOneAndUpdate({"name": "zjson-version"}, {$set: {count: count}}, callback);
        } else {
            this.create(new VisitCountModel({
                "name": "zjson-version", "count": count
            }), callback);
        }
    });
}

module.exports = VisitCountModel;
