'use strict'
var mongoose = require('mongoose');

var spschema = new mongoose.Schema({
    name: {type: String},
    components: [],
    TextByScript: {type: String},
    WordCount: {type: Number}
});

var charschema = new mongoose.Schema({
    name: {type: String, required: true},
    wordcount: {type: Number},
    screenplay: {type: mongoose.Schema.Types.ObjectId, ref: "scrapedScreenplays"},
    text: {type: String}
});




mongoose.model('screenplayRepo', spschema, 'screenplayrepos');
mongoose.model('characterRepo', charschema, 'charactersrepos');

