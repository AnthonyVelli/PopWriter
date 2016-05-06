'use strict';
var mongoose = require('mongoose');
var _ = require('lodash');

var schema = new mongoose.Schema({
    header: {type: String, required: true},
    components: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Component', index: true}
    ],
    synposis: {
        type: String
    },
    custom: [{}],
    date: {
        type: Date
    }
});

schema.pre('validate', function(next) {
    var Component = mongoose.model('Component');

    if (this.components.length === 0) {next(); }
    var compstoPop = this.components.filter((ele) => !ele.type);
    var comps = this.components.filter((ele) => ele.type);
    if (comps.length > 0) {
        this.header = comps.find(ele => ele.type === 'location').text;
        next();
    }
    if (compstoPop.length === 0){next(); }
    Component.find({'_id': { $in: compstoPop}})
    .then(foundComps => {
        if (!foundComps) {next(); }
        this.header = foundComps.find(ele => ele.type === 'location').text;
        next();
    });

});



mongoose.model('Scene', schema);