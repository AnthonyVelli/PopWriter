'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');

var schema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    components: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Component', index: true}
    ],
    synposis: {
        type: String
    },
    custom: {
        type: Object
    },
    date: {
        type: Date
    }
});

schema.virtual('IntExt').get(() => {
    return this.heading.find(/[Ii]nt[.]?|[Ee]xt[.]?/)[0];
});

schema.virtual('location').get(() => {
    return this.heading.replace(/[Ii]nt[.]?\s|[Ee]xt[.]?\s/, '');
});


mongoose.model('Scene', schema);
