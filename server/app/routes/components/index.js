'use strict';
var router = require('express').Router();
const Component = require('mongoose').model('Component');
module.exports = router;

router.param('componentId', function(req, res, next, componentId){
  Component.findById(componentId)
  .then(function(component){
    req.component = component; 
    next();
  })
  .catch(next);
});

router.get('/:componentId?', function (req, res, next) {
	if (req.params.componentId) {
		res.json(req.component);
	} else {
		Component.find()
			.then(function(foundComponents){
				res.json(foundComponents);
			})
			.catch(next);
	}
});

router.put('/:componentId', function (req, res, next) {
	req.component.update(req.body)
	.then(function(updatedComponent){
		res.json(updatedComponent);
	})
	.catch(next);
    
});

router.post('/', function (req, res, next) {
	Component.create(req.body)
	.then(function(createdComponent){
		res.status(201).json(createdComponent);
	})
	.catch(next);
    
});

router.delete('/:componentId', function (req, res, next) {
  req.component.remove()
  .then(function(){
      res.sendStatus(204);
  })
  .catch(next);
    
});
