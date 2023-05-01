var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    admin: Boolean,
    locked: Boolean,
    lists: [String]
});

module.exports = mongoose.model('User', UserSchema);