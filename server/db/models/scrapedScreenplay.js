'use strict'
var mongoose = require('mongoose');
var fs = require('fs');
const natural = require('natural');
const characterRepo = require('./scrapedCharacters');
var Promise = require('bluebird');

var spschema = new mongoose.Schema({
    name: {type: String},
    components: [],
    TextByScript: {type: String},
    WordCount: {type: Number},
    tfidf: [],
    filteredchars: [],
    allchars: {}
});


spschema.methods.filter = function(){
	return characterRepo.filter(this).then(filteredChars => {
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
	return characterRepo.filter(sp)
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


module.exports = mongoose.model('screenplayRepo');


// spschema.statics.tfidfSeed = function(val){
// 	const TfIdf = natural.TfIdf;
// 	var tfidf = new TfIdf(JSON.parse(fs.readFileSync(__dirname+'/tfidf.txt')));
// 	console.log('tfidf leng');
// 	console.log(tfidf.documents.length);
// 	return this.find({WordCount: {$gt: 1000}})
// 		.then(allSPs => {
// 			console.log('found all sps');
// 			console.log(allSPs.length);
// 			var promiseArr = allSPs.map((sp,idx) => {
// 				console.log(sp.name);
// 				sp.tfidf = tfidf.listTerms(idx).slice(0,100);
// 				return sp.save();
// 			});
// 			return Promise.all(promiseArr);
// 		});
// };

// spschema.statics.allCharSeed = function(val){
// 	return this.find({WordCount: {$gt: 1000}})
// 		.then(allSPs => {
// 			console.log('found all sps');
// 			console.log(allSPs.length);
// 			var promiseArr = allSPs.map(sp => {
// 				console.log(sp.name);
// 				return characterRepo.find({screenplay: sp._id}, {name: 1})
// 				.then(characters => {
// 					var charObj = {};
// 					characters.forEach(char => {charObj[char._id] = char.name});
// 					sp.allchars = charObj;
// 					return sp.save(); });
// 				 });
// 			return Promise.all(promiseArr);
// 		});
// };




// 				return characterRepo.find({screenplay: sp._id})
// 				.then(characters => {
// 					console.log('got filtered chars for '+sp.name);
// 					var terms = [];
// 					var x = 0;
// 					var potentialTerms = tfidf.listTerms(idx);
// 					while (terms.length < 10 && x < potentialTerms.length) {						
// 						if (potentialTerms[x].term.length > 3 && !characters.find(char => char.name === potentialTerms[x].term)) {terms.push(potentialTerms[x]); }
// 						x++;
// 					}
					
// 					return {_id: sp._id, characters: characters, tfidf: terms};
// 				});
// 			});
// 			return Promise.all(promiseArr); })
// 		.then(resolvedPromises => {
// 			resolvedPromises.forEach(spUpdate => {console.log(spUpdate._id+' '+spUpdate.tfidf)}); })
// 		.catch(error => {console.error(error)})
// };