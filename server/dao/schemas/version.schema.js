const mongoose = require('mongoose');

const VersionSchema = new mongoose.Schema({
    name: String,
    version: String
}, {collection: 'version'});

module.exports = VersionSchema;
