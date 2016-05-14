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

spschema.methods.scenes = function(){
	var sceneSize = Math.ceil(this.components.length / 100);
	var sceneArray = [];
	for (var x = 0; x < this.components.length; x+= sceneSize){
		sceneArray.push(this.components.slice(0,x));
	}
	return sceneArray;
};

charschema.statics.filter = function(screenplay){
	return this.find({screenplay: screenplay._id})
	.then(foundChars => {
		return foundChars.filter(char => char.wordcount / screenplay.WordCount > .007);
	});
};


mongoose.model('screenplayRepo', spschema, 'screenplayrepos');
mongoose.model('characterRepo', charschema, 'charactersrepos');

