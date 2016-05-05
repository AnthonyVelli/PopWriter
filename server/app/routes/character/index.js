'use strict';

const router = require('express').Router();
var Character = mongoose.model('Character');

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
	.then(character => res.send(201).json(character))
	.catch(next);
});

router.param('id', (req, res, next, id) => {
	Character.findbyId(id)
	.then(character => {
		req.wantedCharacter = character;
		next();
	})
	.catch(next)
})

// update a character
router.put('/:id', (req, res, next) => {
	req.wantedCharacter.set(req.body)
	req.wantedCharacter.save()
	.then(updatedCharacter => res.json(updatedCharacter))
	.catch(next);
});

// delete a character
router.delete("/:id", (req, res, next) => {
	req.wantedCharacter.remove()
	.then(() => res.send(204))
	.catch(next);
});
