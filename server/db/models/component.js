'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['location', 'dialogue', 'action'],
        required: true
    },
    character: {
        type: Schema.Types.ObjectId,
        ref: 'Character'
    },
    text: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Component', schema);
