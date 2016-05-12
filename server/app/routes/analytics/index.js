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
		sweeeeeeeetEmotion.forEach(x => console.log(x.score));
		
		
		res.json(200); })
	.catch(err => console.error(err));

	
});


