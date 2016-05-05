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
var User = mongoose.model('User');
var Screenplay = mongoose.model('Screenplay');
var Character = mongoose.model('Character');
var Component = mongoose.model('Component');
var Scene = mongoose.model('Scene');
var screenplays = require('./seed/screenplays');
var characters = require('./seed/characters');
var components = require('./seed/components');
var scenes = require('./seed/scenes')


var wipeCollections = function () {
    var removeUsers = User.remove({});
    return Promise.all([
        removeUsers
    ]);
};

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return User.create(users);

};

var seedScreenplays = function(){

    var user, scene, currentChar, screenP, header;
    var compArr =[];

    return User.findOne({email: 'obama@gmail.com'})
    .then(selectedUser => {
        user = selectedUser;
    })
    .then(() => {
        return Screenplay.create(screenplays);
    })
    .then(screenplay => {
        screenP = screenplay;
        user.screenplay = [screenplay[0]._id];
        return user.save();
    })
    .then(() => {
        return Character.create(characters);
    })
    .then((charsArr) => {
        currentChar = charsArr[0];
        return Component.create(components);
    })
    // consider changing the name here
    .then((newlyCreatedComponent) => {
        // why is there a header here
        var dialogue;
        newlyCreatedComponent.forEach(comp => {
            if(comp.type === 'dialogue') dialogue = comp;
            if(comp.type === 'location') header = comp;
            else compArr.push(comp._id);
        });
        dialogue.character = currentChar._id
        return dialogue.save();
        // return
    })
    .then( () => {
        return Scene.create({header: header, components: compArr});
    })
    .then((scene) => {
        screenP.scenes = [scene._id];
        return screenP.save();
    })
    .catch(console.error.bind(console));

};

// Dialogue => Character => Scene =>

connectToDb
    .then(function () {
        return wipeCollections();
    })
    .then(function () {
        return seedUsers();
    })
    .then(function(){
        return seedScreenplays();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
