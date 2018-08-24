const mongoose = require('mongoose');
const VisitCountSchema = require('../schemas/visitCount.schema');
const VisitCountModel = mongoose.model('visit-count', VisitCountSchema);

VisitCountModel.addOneVisit = function(callback) {
    this.findOneAndUpdate({"name": "zjson-vc"}, {$inc: {count: 1}}, callback);
}

VisitCountModel.getVisitCount = function(callback) {
    this.findOne({"name": "zjson-vc"}, {}, callback);
}

module.exports = VisitCountModel;
