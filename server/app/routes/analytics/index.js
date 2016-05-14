'use strict';

const router = require('express').Router();
const sentiment = require('sentiment');
const natural = require('natural');
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
	const TfIdf = new natural.TfIdf();
	var emotion = [];
	var scenes = req.screenplay.scenes();

	scenes.forEach(scene => {
		var sceneString = scene.reduce((orig,comp) => {
			if (comp[1]) {
				return orig += (comp[1] + ' ');
			}
			return orig;
		}, '');		
		TfIdf.addDocument(sceneString);
	});
	TfIdf.documents.forEach(comp => {
		var sentence = '';
		for (var n in comp){
			for (var x = 0; x < comp[n] && n !== '__key'; x++){
				sentence += (n + ' ');
			}
		}
		emotion.push(sentiment(sentence));
	});
	var parsedEmotion = emotion.map((x, idx) => {
		return {x:idx, y:x.score};
	});
	res.send(parsedEmotion);
});

router.get('/:screenplayId/wordcount', (req, res , next)=>{
	characterRepo.filter(req.screenplay)
	.then(filteredChars => {
		var formattedforWordCount = filteredChars.map(name => {
			return {key: name.name, y: name.wordcount}; 
		});
		res.json(formattedforWordCount); })
	
	.catch(next);	
});
