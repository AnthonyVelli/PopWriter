'use strict';

const router = require('express').Router();
const Character = mongoose.model('Character');

module.exports = router;

// get all characters
router.get('/', (req, res, next) => {
	Character.find({})
	.then(characters => res.json(characters))
	.catch(next);
});

// create to a user
router.post('/', (req, res, next) => {
	Character.create(req.body)
	.then(character => res.sendStatus(201).json(character))
	.catch(next);
});

router.param('id', (req, res, next, id) => {
	Character.findbyId(id)
	.then(character => {
		req.requestedCharacter = character;
		next();
	})
	.catch(next)
})

// update a character
router.put('/:id', (req, res, next) => {
	req.requestedCharacter.set(req.body)
	return req.requestedCharacter.save()
	.then(updatedCharacter => res.json(updatedCharacter))
	.catch(next);
});

// delete a character
router.delete("/:id", (req, res, next) => {
	req.requestedCharacter.remove()
	.then(() => res.sendStatus(204))
	.catch(next);
});
