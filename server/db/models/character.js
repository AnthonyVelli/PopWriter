

const mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: {type: String},
	sex: {type: String, enum: ["male", "female", "other"]},
	custom: {}
});


module.exports = mongoose.model('Character', schema);