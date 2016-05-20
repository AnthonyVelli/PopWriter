

const mongoose = require('mongoose');

var schema = new mongoose.Schema({
	name: {type: String},
	sex: {type: String, enum: ["male", "female", "other"]},
	custom: {},
    screenplay: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Screenplay'
    }
});


module.exports = mongoose.model('Character', schema);
