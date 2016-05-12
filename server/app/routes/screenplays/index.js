'use strict';
const mongoose = require('mongoose');
const router = require('express').Router();
const Screenplay = mongoose.model('Screenplay');
const Scene = mongoose.model('Scene');

// find a screenplay, populate its scenes & attach to req object
router.param('screenplayId', (req, res, next, screenplayId) => {
	Screenplay.findById(screenplayId)
	.populate('scenes')
	.then(screenplay => {
		req.wantedScreenplay = screenplay;
		next();
    })
	.catch(next);
});



//send a single screenplay with scenes populated, or all screenplays without scenes populated
router.get('/:screenplayId?', (req, res, next) => {
	if (req.params.screenplayId) {
		res.json(req.wantedScreenplay);
	} else {
		Screenplay.find()
			.then(function(foundScreenplays){
				res.json(foundScreenplays);
			})
			.catch(next);
	}
});

// create a screenplay
router.post('/', (req, res, next) => {
	Screenplay.create(req.body)
	.then(newScreenPlay => res.status(201).json(newScreenPlay))
	.catch(next);
});


// update a screenplay
router.put('/:screenplayId', (req, res, next) => {
	req.wantedScreenplay.update(req.body)
	.then(updatedSP => res.json(updatedSP))
	.catch(next);
});

// delete a screenplay
router.delete('/:screenplayId', (req, res, next) => {
	req.wantedScreenplay.remove()
	.then(() => res.sendStatus(204))
	.catch(next);
});

module.exports = router;
