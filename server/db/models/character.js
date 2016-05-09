

const mongoose = require('mongoose');
const Component = mongoose.model('Component');
var updateSubDocuments = require('./updateSubDocuments');

var schema = new mongoose.Schema({
	dialogue: [{type: mongoose.Schema.Types.ObjectId, ref: "Component", required: true}],
	name: {type: String},
	sex: {type: String, enum: ["male", "female", "other"]},
	custom: {}
});

schema.methods.update = function(toUpdate){
    var targetDoc = this;
    return updateSubDocuments(toUpdate, Component, 'dialogue', targetDoc);
};

module.exports = mongoose.model('Character', schema);