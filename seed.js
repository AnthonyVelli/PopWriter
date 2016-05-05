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

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Screenplay = mongoose.model('Screenplay');
var Character = mongoose.model('Character');
var Scene = mongoose.model('Scene');

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

    var screenplay = [
        {
            title: 'The Wizard of Oz'

        }
    ];

    return Screenplay.create(screenplay);
};

var seedCharacters = function(){
    var charsId = [];
    var characters = [
        {
            name: 'Dorothy',
            sex: 'female'
        },
        {
            name: 'Toto',
            sex: 'other'
        }
    ];

    return Character.create(characters)
    .then(characters => {
        charsId = characters.map(function(char){
            return char._id;
        })
    })
    .then(()=> {
        return Screenplay.findOne({title: 'The Wizard of Oz' })
    })
    .then(script => {
        script.update({ characters: charsId});
    });
};

var seedScenes = function(){
    var scenesId;
    var scenes = [
        {
            synopsis: 'The story about a girl...'
        }
    ];

    return Scene.create(scenes)
    .then(scene => {
        sceneId = characters.map(function(scene){
            return char._id;
        })
    })
    .then(()=> {
        return Screenplay.findOne({title: 'The Wizard of Oz' })
    })
    .then(script => {
        script.update({ scenes: scenesId});
    });
};



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
    .then(function(){
        return seedCharacters();
    })
     .then(function(){
        return seedScenes();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
