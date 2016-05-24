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
	const TfIdf = new natural.TfIdf();
	req.screenplay.GetDialogue()
	.then(dialogue => {
		var compObj = {};
		dialogue.forEach(comp => {
			if (compObj[comp.charName]) {
				compObj[comp.charName] += ' '+comp.text;
			} else {
				compObj[comp.charName] = comp.text;
			}
		});
		var solution = [];
		for (var char in compObj) {
			TfIdf.addDocument(compObj[char], char);
			solution.push({y: compObj[char].split(' ').length, key: char});
		}
		solution = solution.map((ele,idx) => {
			 var termHolder = TfIdf.listTerms(idx).slice(0,10);
			 ele.words = termHolder.map(term => ({y: term.tfidf, key: term.term}));
			return ele;
		});
		res.json(solution);
	})
	.catch(error => console.error(error));
});
