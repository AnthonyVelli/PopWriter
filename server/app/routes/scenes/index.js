'use strict';
var router = require('express').Router();
const Scenes = require('mongoose').model('Scene');
module.exports = router;

router.param('sceneId', function(req, res, next, sceneId){
  Scenes.findById(sceneId)
  .then(function(scene){
    req.scene = scene; 
    next();
  })
  .catch(next);
});

router.get('/:sceneId?', function (req, res, next) {
	if (req.params.sceneId) {
		res.json(req.scene);
	} else {
		Scenes.find()
			.then(function(foundscenes){
				res.json(foundscenes);
			})
			.catch(next);
	}
});

router.put('/:sceneId', function (req, res, next) {
	req.scene.update(req.body)
	.then(function(updatedscene){
		res.json(updatedscene);
	})
	.catch(next);
    
});

router.post('/', function (req, res, next) {
	Scenes.create(req.body)
	.then(function(createdscene){
		res.status(201).json(createdscene);
	})
	.catch(next);
    
});

router.delete('/:sceneId', function (req, res, next) {
  req.scene.remove()
  .then(function(){
      res.sendStatus(204);
  })
  .catch(next);
    
});
