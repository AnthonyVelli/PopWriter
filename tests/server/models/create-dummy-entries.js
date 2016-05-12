var mongoose = require('mongoose');
require('../../../server/db/models');
var docs = {};
docs.Character = mongoose.model('Character');
docs.Component = mongoose.model('Component');
docs.Scene = mongoose.model('Scene');
docs.Screenplay = mongoose.model('Screenplay');
docs.User = mongoose.model('User');
 

docs.createComponents = function(){
	return this.Component.create({type: 'location', text: 'in the heart of the city'}, {type: 'dialogue', text: 'i coulda been somebahdy'});
};

docs.createScene = function(){
	return this.createComponents()
		.then((comps, comps2) => this.Scene.create({components: [comps, comps2], header: 'heres a simple header, just a simple header', synopsis: 'some information about my scene dog', date: 10/14/83}));
};

docs.createScreenplay = function(){
	return this.createScene()
		.then(createdScene => {
			return this.Screenplay.create({title: 'taleof twocities', scenes: createdScene}); });
};

docs.createCharacter = function(){
	return this.createComponents()
		.then((comps, comps2) => this.Character.create({name: 'jonny bonaduchi', dialogue: [comps, comps2]}));
};

module.exports = docs;