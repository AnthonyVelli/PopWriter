'use strict';
const sentiment = require('sentiment');
const natural = require('natural');
natural.PorterStemmer.attach();
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
			 console.log(termHolder);
			 ele.words = termHolder.map(term => ({y: term.tfidf, key: term.term}));
			return ele;
		});
		res.json(solution);
	})
	.catch(error => console.error(error));
});
	
	// characterRepo.filter(req.screenplay)
	// .then(filteredChars => {
	// 	filteredChars.forEach(name => {
			
	// 	});
	// 	var formattedforWordCount = filteredChars.map((name, idx) => {
	// 		return {key: name.name, y: name.wordcount, tfidf: TfIdf.listTerms(idx)};
	// 	});
	// 	var donutData = [];
	// 	formattedforWordCount.forEach(char => {
	// 		var charObj = {character: char.key, words: []};
	// 		donutData.push(charObj)
	// 		for(var i = 0; i < 10; i++){
	// 			var ele = char.tfidf[i];
	// 			charObj.words.push({key: ele.term, y: ele.tfidf});
	// 		}
	// 	});
	// 	res.json([formattedforWordCount, donutData]); })