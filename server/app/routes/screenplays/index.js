'use strict';

const router = require('express').Router();
const Screenplay = require('mongoose').model('Screenplay');

// find a single user's screenplays
router.get('/', (req, res, next) => {
	Screenplay.find({_id: {$in: req.requestUser.screenplay}})
	.then(screenplays => res.json(screenplays))
	.catch(next);
});

// create a new screenplay
router.post('/', (req, res, next) => {
	Screenplay.create(req.body)
	.then(newScreenPlay => res.status(201).json(newScreenPlay))
	.catch(next);
});

// add screenplay object to req object
router.param('screenplayId', (req, res, next, screenplayId) => {
	Screenplay.findById(screenplayId)
	.populate('scenes')
	.exec(function(err, screenplay){
		if (err) { throw new Error }
		else { req.wantedScreenplay = screenplay; }
		next();
	})
	.catch(next);
});

// get a single screenplay
router.get('/:screenplayId', (req, res, next) => {
	res.json(req.wantedScreenplay);
});

// update a screenplay
router.put('/:screenplayId', (req, res, next) => {
	req.wantedScreenplay.update(req.body)
	.then(updatedScreenplay => res.json(updatedScreenplay))
	.catch(next);
});

// delete a screenplay
router.delete('/:screenplayId', (req, res, next) => {
	req.wantedScreenplay.remove()
	.then(() => res.sendStatus(204))
	.catch(next);
});

module.exports = router;
