'use strict'

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    scenes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Scene"
    },
    lastUpdate: Date
});

schema.pre('update', function() {
  this.update({ lastUpdate : new Date() } );
  next()
});



module.exports = mongoose.model('Screenplay', schema);
