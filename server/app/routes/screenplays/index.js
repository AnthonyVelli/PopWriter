'use strict';
const mongoose = require('mongoose');
const router = require('express').Router();
const Screenplay = mongoose.model('Screenplay');
const Scene = mongoose.model('Scene');

router.param('screenplayId', (req, res, next, screenplayId) => {
	var foundSP;
	Screenplay.findById(screenplayId)
	.then(screenplay => {
		foundSP = screenplay;
		return Scene.find({'_id': {$in: screenplay.scenes}}); })
	.then(foundScenes => {
		req.wantedScreenplay = foundSP;
		req.wantedScreenplay.scenes = foundScenes; 
		next(); })
	.catch(next);
});

router.get('/:screenplayId?', (req, res, next) => {
	if (req.params.screenplayId) {
		res.json(req.wantedScreenplay);
	} else {
		Screenplay.find()
			.then(function(foundComponents){
				res.json(foundComponents);
			})
			.catch(next);
	}
});
 
router.post('/', (req, res, next) => {
	Screenplay.create(req.body)
	.then(newScreenPlay => res.status(201).json(newScreenPlay))
	.catch(next);
});

router.put('/:screenplayId', (req, res, next) => {
	req.wantedScreenplay.updateScenes(req.body)
	.then(updatedSP => res.json(updatedSP))
	.catch(next);
});

router.delete('/:screenplayId', (req, res, next) => {
	req.wantedScreenplay.remove()
	.then(() => res.sendStatus(204))
	.catch(next);
});

module.exports = router;
