'use strict';

const router = require('express').Router();
const sentiment = require('sentiment');
const natural = require('natural');
const mongoose = require('mongoose');
const screenplayRepo = mongoose.model('screenplayRepo');
const characterRepo = mongoose.model('characterRepo');
module.exports = router;

const TfIdf = new natural.TfIdf();

router.get('/', (req, res, next) => {
	screenplayRepo.find({WordCount: {$gt: 1000}}, {name: 1, WordCount: 1})
	.then(allSPs => res.send(allSPs))
	.catch(next);
});

router.get('/:id', (req, res, next) => {
	screenplayRepo.findOne()
	.then(ele => {
		var sweeeeeeeetEmotion = [];
		ele.components.forEach(comp => {
			TfIdf.addDocument(comp[1]);
		});
		TfIdf.documents.forEach(comp => {
			var sentence = '';
			for (var n in comp){
				for (var x = 0; x < comp[n] && n !== '__key'; x++){
					sentence += (n + ' ');
				}
			}
			sweeeeeeeetEmotion.push(sentiment(sentence));
		});
		var newCats = sweeeeeeeetEmotion.map((x, idx) => {
			return {x:idx, y:x.score}
		});
		res.send(newCats)})
	.catch(err => console.error(err));
});

router.get('/:id/characters', (req, res , next)=>{
	characterRepo.find({ screenplay: req.params.id })
	.then(characters => {
		characters = characters.filter(char => {
			return (char.wordcount > 100 && !/(:|\d)/.test(char.name) && char.name.split(" ").length <= 3);
		})
		characters = characters.map(name => {
			return {key: name.name, y: name.wordcount}
		})
		res.json(characters);
	})
	.catch(err => console.error(err));
})
