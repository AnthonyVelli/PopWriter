'use strict'
var mongoose = require('mongoose');
const screenplayRepo = require('./scrapedScreenplay');

var charschema = new mongoose.Schema({
    name: {type: String, required: true},
    wordcount: {type: Number},
    screenplay: {type: mongoose.Schema.Types.ObjectId, ref: "scrapedScreenplays"},
    text: {type: String}
});

charschema.statics.filter = function(screenplay){
	return this.find({screenplay: screenplay._id})
	.then(foundChars => {
		return foundChars.filter(char => {
			return char.wordcount / screenplay.WordCount > 0.007 && !/(\:|^INT|^EXT|^\d)/.test(char.name) && char.name.split(" ").length <= 2;
		});
	});
};

mongoose.model('characterRepo', charschema, 'charactersrepos');

module.exports = mongoose.model('characterRepo');


