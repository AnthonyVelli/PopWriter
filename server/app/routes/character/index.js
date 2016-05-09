'use strict';

const router = require('express').Router();
const Character = require('mongoose').model('Character');

module.exports = router;

router.param('id', (req, res, next, id) => {
	Character.findbyId(id)
	.then(character => {
		req.requestedCharacter = character;
		next();
	})
	.catch(next)
});

// get all characters
router.get('/', (req, res, next) => {
	if(!req.user) res.sendStatus(403)
	else {
		Character.find({})
		.then(characters => res.json(characters))
		.catch(next);
	};
});

// create to a user
router.post('/', (req, res, next) => {
	Character.create(req.body)
	.then(character => res.status(201).json(character))
	.catch(next);
});

// update a character
router.put('/:id', (req, res, next) => {
	if(!req.user) res.sendStatus(401)
	else if (req.user.isAdmin || req.user.equals(req.requestedCharacter)) {
		req.requestedCharacter.update(req.body)
		.then(updatedCharacter => res.json(updatedCharacter))
		.catch(next);
	} else res.sendStatus(401)
});

// delete a character
router.delete("/:id", (req, res, next) => {
	if(req.user || req.user.isAdmin) {
		req.requestedCharacter.remove()
		.then(() => res.sendStatus(204))
		.catch(next);
	} else res.sendStatus(401)
});
