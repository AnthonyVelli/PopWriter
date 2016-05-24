'use strict';
const sentiment = require('sentiment');
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const router = require('express').Router();

var helper = require('./analyticsHelper');
const mongoose = require('mongoose');
const Screenplay = mongoose.model('Screenplay');
const Character = mongoose.model('Character');
const Component = mongoose.model('Component');

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
	req.screenplay.TextbyScenes(100)
	.then(sceneTextObj => {
		var charEmotion = {};
		for (var x in sceneTextObj) {
			charEmotion[x] = helper.objectOfStringsToEmotion(sceneTextObj[x]);
		}
		res.json(charEmotion);
	})
	.catch(error => console.error(error))
});


router.get('/:screenplayId/wordcount', (req, res , next)=>{
	var compObjPerm;
	var charNames = [];
	req.screenplay.GetDialogue()
	.then(dialogue => {
		var compObj = {};
		dialogue.forEach(comp => {
			if (charNames.indexOf(comp.charName.toLowerCase()) === -1){
				charNames.push(comp.charName.toLowerCase());
			}
			if (compObj[comp.charName]) {
				compObj[comp.charName] += ' '+comp.text;
			} else {
				compObj[comp.charName] = comp.text;
			}
		});
		var textArr = [];
		for (var char in compObj) {
			textArr.push(compObj[char]);
		}
		compObjPerm = compObj;
		return helper.processText(textArr, charNames); })
	.then(tfidf => {
		var solution = [];
		var idx = 0;
		for (var char in compObjPerm) {
			var tenTfIdf = tfidf.listTerms(idx).slice(0,10).map(tfidf => {
				return {key: tfidf.term, y: tfidf.tfidf};
			});
			solution.push({y: compObjPerm[char].split(' ').length, key: char, tfidf: tenTfIdf});
		}
		res.json(solution);
	})
	.catch(error => console.error(error));
});
