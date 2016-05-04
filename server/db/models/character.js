

const mongoose = mongoose = require('mongoose');

var schema = new mongoose.Schema({
	dialogue: [{type: mongoose.Schema.Types.ObjectId, ref: "Componet", required: true}],
	name: {type: String},
	sex: {type: String, enum: ["male", "female", "other"]},
	custom: [{type: Object}]
});

module.exports = mongoose.model('Character', schema);