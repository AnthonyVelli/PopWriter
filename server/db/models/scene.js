'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');

var schema = new mongoose.Schema({
    header: {type: mongoose.Schema.Types.ObjectId, ref: 'Component'},
    components: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Component', index: true}
    ],
    synposis: {
        type: String
    },
    custom: [{type: Object}],
    date: {
        type: Date
    }
});

schema.pre('save', function(next) {
    this.populate('components')
    //can populate only of a query
        .then(populatedComps => this.header = populatedComps.find(comp => comp.type === 'location'));
    next();
});



mongoose.model('Scene', schema);
