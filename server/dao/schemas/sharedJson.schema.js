const mongoose = require('mongoose');

const SharedJsonSchema = new mongoose.Schema({
    userId: String,
    sharedJson: String,
    updateTime: Number,
}, {collection: 'sharedJson'});

module.exports = SharedJsonSchema;
