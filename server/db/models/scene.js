'use strict';
var mongoose = require('mongoose');
var Component = mongoose.model('Component');
var updateSubDocuments = require('./updateSubDocuments');


var schema = new mongoose.Schema({
    header: {type: String, required: true},
    components: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Component'}
    ],
    synopsis: {
        type: String
    },
    custom: {},
    date: {
        type: Date
    }
});

schema.methods.update = function(toUpdate){
    var targetDoc = this;
    return updateSubDocuments(toUpdate, Component, 'components', targetDoc);
};




mongoose.model('Scene', schema);
