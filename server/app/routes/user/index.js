'use strict';

const router = require('express').Router();
const User = require("mongoose").model('User');
const Screenplay = require('mongoose').model('Screenplay');

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
	// if(!req.user) res.sendStatus(401);
	if (req.user.isAdmin || req.user.equals(req.requestUser)){
		return req.requestUser.update(req.body)
		.then(updatedUser => res.json(updatedUser))
		.catch(next);
	} else {
		res.sendStatus(401);
	}
});

router.delete('/:id', (req, res, next) => {
	if(req.user.isAdmin){
		req.requestUser.remove()
		.then(() => res.sendStatus(204))
		.catch(next);
	} else {
		res.sendStatus(401);
	}
});

router.get('/:id/screenplays', (req, res, next)=> {
    if (req.user.isAdmin || req.user.equals(req.requestUser)){
    Screenplay.find({_id: { $in: req.requestUser.screenplay }})
    .then(screenplays => {
       res.json(screenplays);
    })
    .catch(next);
    } else {
        res.sendStatus(401);
    }
});

router.post('/:id/screenplays', (req, res, next)=> {
    if (req.user.isAdmin || req.user.equals(req.requestUser)){
    Screenplay.create(req.body)
    .then(screenplay => {
        req.requestUser.screenplay ? req.requestUser.screenplay.push(screenplay._id) : req.requestUser.screenplay = [screenplay._id];
        return req.requestUser.save();
    })
    .then(user => {
        res.json(user.screenplays);
    })
    .catch(next);
    } else {
        res.sendStatus(401);
    }
});









