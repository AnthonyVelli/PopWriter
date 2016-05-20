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
	characterRepo.filter(req.screenplay)
	.then(filteredChars => {
		filteredChars.forEach(name => {
			TfIdf.addDocument(name.text, name.name);
		});
		res.send(TfIdf);
		var formattedforWordCount = filteredChars.map((name, idx) => {
			return {key: name.name, y: name.wordcount, tfidf: TfIdf.listTerms(idx)};
		});
		var donutData = [];
		formattedforWordCount.forEach(char => {
			var charObj = {character: char.key, words: []};
			donutData.push(charObj)
			for(var i = 0; i < 10; i++){
				var ele = char.tfidf[i];
				charObj.words.push({key: ele.term, y: ele.tfidf});
			}
		}); ; })
		// res.json([formattedforWordCount, donutData]); })
	.catch(next);	
});

