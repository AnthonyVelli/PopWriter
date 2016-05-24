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



charschema.statics.filter = function(screenplay){
	return this.find({screenplay: screenplay._id})
	.then(foundChars => {
		return foundChars.filter(char => {
			return char.wordcount / screenplay.WordCount > 0.007 && !/(\:|^INT|^EXT|^\d)/.test(char.name) && char.name.split(" ").length < 3;
		});
	});
};

// return (char.wordcount > 100 && !/(:|\d)/.test(char.name) && char.name.split(" ").length <= 3);
var charRepo = mongoose.model('characterRepo', charschema, 'charactersrepos');

spschema.methods.filter = function(){
	return charRepo.filter(this).then(filteredChars => {
		return this.components.filter(comp => {
			return Boolean(filteredChars.find(char => char.name === comp[0]));
		});
	});
};
spschema.methods.CharsbyScenes = function(){
	var sceneSize = Math.ceil(this.components.length / 100);
	var sceneArray = [];
	var tempArray = [];
	var sp = this;
	return charRepo.filter(sp)
	.then(filteredChars => {
		for (var x = 0; x < sp.components.length; x++){
			if (filteredChars.find(char => char.name === sp.components[x][0])){
				tempArray.push(sp.components[x]);
			}
			if (x % sceneSize === 0 || x === sp.components.length - 1) {
				sceneArray.push(tempArray);
				tempArray = [];
			}
		}
		return sceneArray;
	});
};

spschema.methods.TextbyScenes = function(){
	var sceneSize = Math.ceil(this.components.length / 100);
	var sceneArray = [];
	var components = this.components;
	while (components.length > 0){
		var sceneSlice = components.splice(0,sceneSize);
		var sceneString = sceneSlice.reduce((orig, char) => {
			if (char[1]) {
				return orig + (' '+char[1]);
			} else {
				return orig;
			}
		}, '');
		sceneArray.push(sceneString);

	}
	return sceneArray;
};

mongoose.model('screenplayRepo', spschema, 'screenplayrepos');


