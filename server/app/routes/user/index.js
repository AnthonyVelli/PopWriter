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
	User.find({})
	.then(users => res.json(users))
	.catch(next);
});

router.post('/', (req, res, next) => {
	console.log('IM GETTING HERE')
	User.create(req.body)
	.then(user => res.status(201).json(user))
	.catch(next);
});

router.put(":/id", (req, res, next) => {
	User.findById(req.requestUser._id)
	.then(user => {
		user.set(req.body);
		return user.save();
	})
	.then(updatedUser => res.json(updatedUser))
	.catch(next);
});

router.delete('/:id', (req, res, next) => {
	req.requestUser.remove()
	.then(() => res.sendStatus(204))
	.catch(next);
});

router.use('/:id/screenplays', require('../screenplays'))