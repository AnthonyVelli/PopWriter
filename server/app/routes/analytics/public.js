'use strict';
const sentiment = require('sentiment');
const natural = require('natural');
natural.PorterStemmer.attach();
const tokenizer = new natural.WordTokenizer();
const router = require('express').Router();

var helper = require('./analyticsHelper');
const mongoose = require('mongoose');
const screenplayRepo = mongoose.model('screenplayRepo');
const characterRepo = mongoose.model('characterRepo');
module.exports = router;



router.param('screenplayId', (req, res, next, screenplayId) => {
	screenplayRepo.findById(screenplayId)
	.then(screenplay => {
		req.screenplay = screenplay;
		next(); })
	.catch(next);
});

router.get('/', (req, res, next) => {
	screenplayRepo.find({WordCount: {$gt: 1000}}, {name: 1, WordCount: 1})
	.then(allSPs => res.send(allSPs))
	.catch(next);
});

router.get('/:screenplayId/emotion', (req, res, next) => {
	//breaks screenplay up into 100 equal parts, and returns only lines by the characters that meet requirements in character filter.
	req.screenplay.CharsbyScenes()
	.then(filteredScenes => {
		var sceneMaster = helper.scenesToStrings(filteredScenes);
		var emotion = helper.sceneStringsToEmotion(sceneMaster);
		var allText = req.screenplay.TextbyScenes();
		emotion.sceneText = helper.arrayOfStringsToEmotion(allText);
		res.json(emotion);
	})
	.catch(next);
});


router.get('/:screenplayId/wordcount', (req, res , next)=>{
	const TfIdf = new natural.TfIdf();
	var filteredCharsPerm;
	characterRepo.filter(req.screenplay)
	.then(filteredChars => {
		filteredCharsPerm = filteredChars;
		filteredChars.forEach(name => {
			TfIdf.addDocument(name.text, name.name);
		});
		return characterRepo.find({screenplay: req.screenplay._id}); })
	.then(allChars => {
		var charNames = allChars.map(char => char.name.toLowerCase());
		console.log(charNames);
		var formattedforWordCount = filteredCharsPerm.map((name, idx) => {
			var tfidfHolder = [];
			var alltfidf = TfIdf.listTerms(idx);
			var i = 0;
			while (tfidfHolder.length < 10) {
				if (alltfidf[i].term.length > 3 && charNames.indexOf(alltfidf[i].term.toLowerCase()) == -1) {
					tfidfHolder.push({key: alltfidf[i].term, y: alltfidf[i].tfidf});
				}
				i++;
			}
			return {key: name.name, y: name.wordcount, tfidf: tfidfHolder};
		});
		// console.log(formattedforWordCount);
		res.json(formattedforWordCount); })
	.catch(next);
});
	
		
		
		// var donutData = [];
		// formattedforWordCount.forEach(char => {
		// 	var charObj = {character: char.key, words: []};
		// 	donutData.push(charObj);
		// 	var i = 0;
		// 	while (charObj.words.length < 10) {
		// 		i++;
		// 		formattedforWordCount.find(char => {
		// 			return char.key == 
		// 			// char.tfidf[i].term 
		// 		var ele = char.tfidf[i];

		// 		charObj.words.push({key: ele.term, y: ele.tfidf});
		// 	}
		// }); 
		
	// .catch(next);


