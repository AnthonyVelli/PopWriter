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
		return foundChars.filter(char => char.wordcount / screenplay.WordCount > 0.007);
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
	var sceneSize = Math.ceil(this.components.length / 10);
	var sceneArray = [];
	var components = this.components;
	while (components.length > 0){
		var sceneSlice = components.splice(0,sceneSize);
		console.log(components.length);
		var sceneString = sceneSlice.reduce((orig, char) => {
			if (char[1]) {
				return orig + (' '+char[1]);
			} else {
				return orig;
			}
		}, '');
		sceneArray.push(sceneString);

	}
	// sceneArray.push(components.reduce((orig, char) => {
	// 		if (char[1]) {
	// 			return orig += (' '+char[1]);
	// 		} else {
	// 			return orig;
	// 		}
	// 	}, ''));
	console.log(sceneArray.reduce((orig,scene) => {
		return scene.length + orig;
	}, 0));
	console.log(this.WordCount);
		// console.log('????????????????????')
		// console.log(sceneArray[87]);
		// console.log('????????????????????')
		// console.log(sceneArray[88]);
		// console.log('????????????????????')
		// console.log(sceneArray[89]);
	return sceneArray;
};

mongoose.model('screenplayRepo', spschema, 'screenplayrepos');


