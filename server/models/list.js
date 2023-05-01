var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListSchema = new Schema({
    name: String,
    owner: String,
    games: [String]
});

module.exports = mongoose.model('List', ListSchema);