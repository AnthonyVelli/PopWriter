/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/
var _ = require('lodash');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var Character = mongoose.model('Character');
var Screenplay = mongoose.model('Screenplay');
var Scene = mongoose.model('Scene');
var User = mongoose.model('User');
var Component = mongoose.model('Component');
var screenplayRepo = mongoose.model('screenplayRepo');
var fs = require('fs');

// var swOBJ = JSON.parse(fs.readFileSync('./Star Wars1.txt'));
// var scenes = swOBJ.components.filter(comp => comp[0] === 'scene').map(scene => {
// 	return {header: scene[1]};
// });

// var components = swOBJ.components.filter(comp => comp[0] === 'scene').map(scene => {
// 	return [{type: 'action', text: scene[2]}];
// });
// var idx = -1;
// swOBJ.components.forEach(comp => { 
// 	if (comp[0] === 'scene') {
// 		idx++;
// 	} else {
// 		components[idx].push({type: 'dialogue', text: comp[2], charName: comp[1]});
// 	}
// });
// var spHolder;
// var swHolder;
// Screenplay.create({title: 'StarWars Full'})
// .then(sw => {
// 	swHolder = sw;
// 	return Scene.create(scenes); })
// .then(allScenes => {
// 	swHolder.scenes = allScenes;
// 	return swHolder.save(); })
// .then(updatedSP => {
// 	var promiseArr = updatedSP.scenes.map((scene,idx) => {
// 		return Component.create(components[idx])
// 		.then(createdComps => {
// 			scene.components = createdComps;
// 			return scene.save();
// 		});
// 	});
// 	return Promise.all(promiseArr); })
// .then(updatedScenes => {
// 	spHolder = updatedScenes;
// 	return User.findOne({email: 'george.lucas@maytheforcebewith.you'}); })
// .then(user => {
// 	user.screenplay.push(swHolder);
// 	user.save();
// });


var fortOBJ = fs.readFileSync('./fortress.txt').split(/\n/);
console.log(fortOBJ.length);
