
'use strict';

const router = require('express').Router();
const Screenplay = require('mongoose').model('Screenplay');

router.get('/', (req, res, next) => {
	Screenplay.find({_id: {$in: req.requestUser.screenplay}})
	.then(screenplays => res.json(screenplays))
	.catch(next);
});

router.post('/', (req, res, next) => {
	Screenplay.create(req.body)
	.then(newSceenPlay => res.status(201).json(newSceenPlay))
	.catch(next);
});

router.param('screenplayId', (req, res, next, screenplayId) => {
	Screenplay.findbyId(screenplayId)
	.then(screenplay => {
		req.wantedScreenplay = screenplay;
		next();
	})
	.catch(next);
})

router.put('/:screenplayId', (req, res, next) => {
	req.wantedScreenplay.update(req.body)
	.then(updatedScreenplay => res.json(updatedScreenplay))
	.catch(next);
})
router.delete('/:screenplayId', (req, res, next) => {
	req.wantedScreenplay.remove()
	.then(() => res.sendStatus(204))
	.catch(next);
});

module.exports = router;
