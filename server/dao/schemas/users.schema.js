const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    'userId': String,
    'vtTime': Number,
    'isActive': Boolean,
    'isKeepAc': Boolean
}, {collection: 'users'});

module.exports = UsersSchema;
