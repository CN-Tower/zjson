const mongoose = require('mongoose');
const VisitCountSchema = require('../schemas/visitCount.schema');
const VisitCountModel = mongoose.model('version', VisitCountSchema);

VisitCountModel.addOneVisit = function(callback) {
    this.findOneAndUpdate({"name": "zjson-vc"}, {$inc: {count: 1}}, callback);
}

VisitCountModel.getVisitCount = function(callback) {
    return this.findOne({"name": "zjson-vc"}, {}, callback);
}

VisitCountModel.setVisitCount = function(count, callback) {
    this.getVisitCount((err, doc) => {
        if (doc) {
            this.findOneAndUpdate({"name": "zjson-vc"}, {$set: {count: count}}, callback);
        } else {
            this.create(new VisitCountModel({
                "name": "zjson-vc", "count": count
            }), callback);
        }
    });
}

module.exports = VisitCountModel;
