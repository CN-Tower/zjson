const mongoose = require('mongoose');

const VisitCountSchema = new mongoose.Schema({
    name: String,
    count: Number,
}, {collection: 'visitCount'});

module.exports = VisitCountSchema;
