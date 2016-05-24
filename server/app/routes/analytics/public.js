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
	var tfidfPerm;
	var filteredCharsPerm;
	characterRepo.filter(req.screenplay)
	.then(filteredChars => {
		filteredCharsPerm = filteredChars;
		return characterRepo.find({screenplay: req.screenplay._id}); })
	.then(allChars => {
		var charText = filteredCharsPerm.map(char => char.text);
		var charNames = allChars.map(char => char.name.toLowerCase());
		return helper.processText(charText, charNames); })
	.then(tfidf => {
		var formattedforWordCount = filteredCharsPerm.map((name, idx) => {
			var tenTfIdf = tfidf.listTerms(idx).slice(0,10).map(tfidf => {
				return {key: tfidf.term, y: tfidf.tfidf};
			});
			
			return {key: name.name, y: name.wordcount, tfidf: tenTfIdf};
		});
		res.json(formattedforWordCount); })
	.catch(next);
});
