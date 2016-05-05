'use strict';
var router = require('express').Router();
//var Component = require('../db/models/component');
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

router.get('/', function (req, res, next) {
	Component.find()
	.then(function(components){
		res.json(components);
	})
	.catch(next);
    
});

router.put('/:componentId', function (req, res, next) {
	req.component.set(req.body);
	req.component.save()
	.then(function(updatedComponent){
		res.json(updatedComponent);
	})
	.catch(next);
    
});

router.post('/', function (req, res, next) {
	Component.create(req.body)
	.then(function(createdComponent){
		res.json(createdComponent);
	})
	.catch(next);
    
});

router.delete('/:componentId', function (req, res, next) {
  req.component.remove()
  .then(function(){
      res.status(204).end();
  })
  .catch(next);
    
});
