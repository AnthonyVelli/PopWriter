

const mongoose = require('mongoose');

var schema = new mongoose.Schema({
	dialogue: [{type: mongoose.Schema.Types.ObjectId, ref: "Component", required: true}],
	name: {type: String},
	sex: {type: String, enum: ["male", "female", "other"]},
	custom: [{}]
});

module.exports = mongoose.model('Character', schema);