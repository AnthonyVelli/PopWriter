'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['location', 'dialogue', 'action'],
        required: true
    },
    character: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character'
    },
    text: {
        type: String,
        required: true
    }
}, {toObject: {virtuals: true}, toJSON: {virtuals: true}});

schema.virtual('intExt').get(function () {
  if(this.type === 'location'){
    return this.text.slice(0, this.text.indexOf(' '));
  }
});

schema.virtual('location').get(function () {
  if(this.type === 'location'){
    return this.text.slice(this.text.indexOf(' ') + 1);
  }
});

mongoose.model('Component', schema);
