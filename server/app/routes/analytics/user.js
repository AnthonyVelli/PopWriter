'use strict';
const sentiment = require('sentiment');
const natural = require('natural');
natural.PorterStemmer.attach();
const tokenizer = new natural.WordTokenizer();
const router = require('express').Router();

var helper = require('./analyticsHelper');
const mongoose = require('mongoose');
const Screenplay = mongoose.model('Screenplay');


module.exports = router;



router.param('screenplayId', (req, res, next, screenplayId) => {
	Screenplay.findById(screenplayId)
	.then(screenplay => {
		req.screenplay = screenplay;
		next(); })
	.catch(next);
});

router.get('/', (req, res, next) => {
	Screenplay.find()
	.then(allSPs => res.send(allSPs))
	.catch(next);
});

router.get('/:screenplayId/emotion', (req, res, next) => {
	//breaks screenplay up into 100 equal parts, and returns only lines by the characters that meet requirements in character filter.
	req.screenplay.TextbyScenes(100)
	.then(sceneTextArr => {
		res.json(helper.arrayOfStringsToEmotion(sceneTextArr));
	})
	.catch(error => console.error(error))
		
	
	// console.log(allText);
	
	// var sceneMaster = helper.scenesToStrings(filteredScenes);
	// var emotion = helper.sceneStringsToEmotion(sceneMaster);
		// var  = req.screenplay.TextbyScenes();
	// emotion.sceneText = helper.arrayOfStringsToEmotion(allText);
		// res.json(emotion);
});


// router.get('/:screenplayId/wordcount', (req, res , next)=>{
// 	const TfIdf = new natural.TfIdf();
// 	characterRepo.filter(req.screenplay)
// 	.then(filteredChars => {
// 		filteredChars.forEach(name => {
// 			TfIdf.addDocument(name.text);
// 		});
// 		var formattedforWordCount = filteredChars.map((name, idx) => {
// 			return {key: name.name, y: name.wordcount, tfidf: TfIdf.listTerms(idx)};
// 		});
// 		var donutData = [];
// 		formattedforWordCount.forEach(char => {
// 			var charObj = {character: char.key, words: []};
// 			donutData.push(charObj)
// 			for(var i = 0; i < 10; i++){
// 				var ele = char.tfidf[i];
// 				charObj.words.push({key: ele.term, y: ele.tfidf});
// 			}
// 		});
// 		res.json([formattedforWordCount, donutData]); })
// 	.catch(next);	
// });

