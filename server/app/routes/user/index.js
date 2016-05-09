'use strict';

const router = require('express').Router();
const User = require("mongoose").model('User');

module.exports = router;


router.param('id', (req, res, next, id) => {
	User.findById(id)
	.then(user => {
		req.requestUser = user;
		next();
	})
	.catch(next);
});
// get all users
router.get('/', (req, res, next) => {
	if(req.user.isAdmin) {
		User.find({})
		.then(users => res.json(users))
		.catch(next);
	} else {res.sendStatus(403)}
});

router.post('/', (req, res, next) => {
	User.create(req.body)
	.then(user => res.status(201).json(user))
	.catch(next);
});


router.put("/:id", (req, res, next) => {
	if(!req.user) res.sendStatus(401)
	else if (req.user.isAdmin || req.user.equals(req.requestUser)){
		User.findById(req.requestUser._id)
		.then(user => {
			user.set(req.body);
			return user.save();
		})
		.then(updatedUser => res.json(updatedUser))
		.catch(next);
	} else res.sendStatus(401)
});

router.delete('/:id', (req, res, next) => {
	if(req.user || req.user.isAdmin){
		req.requestUser.remove()
		.then(() => res.sendStatus(204))
		.catch(next);
	} else res.sendStatus(401)
});

router.use('/:id/screenplays', require('../screenplays'))