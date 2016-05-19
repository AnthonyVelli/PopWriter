

const mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: {type: String},
	sex: {type: String, enum: ["male", "female", "other"]},
	custom: {},
    screenplay: mongoose.Schema.Type.ObjectId
});


module.exports = mongoose.model('Character', schema);
