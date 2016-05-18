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
var scenes = require('./seed/scenes');
var allScreenplays = require('./seed/screenplay.one');


var wipeCollections = function () {
    var removeUsers = User.remove({});
    var removeScreenplays = Screenplay.remove({});
    var removeCharacters = Character.remove({});
    var removeComponents = Component.remove({});
    var removeScenes = Scene.remove({});

    return Promise.all([
        removeUsers,
        removeScreenplays,
        removeCharacters,
        removeComponents,
        removeScenes
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
        },
        {
            email: 'zeke@zeke.zeke',
            password: 'zeke',
            isAdmin: true
        },
        {
            email: 'kim@gmail.com',
            password: 'kim'
        },
        {
            email: 'george.lucas@maytheforcebewith.you',
            password: 'wookies'
        }
    ];

    return User.create(users);

};

function seedScreenplaysTwo(screenplay){
    var currentSP, currentScenes, user;
    return User.findOne({email: screenplay.user})
    .then(selectedUser => {
        user = selectedUser;
    })
    .then(() => {
        return Screenplay.create(screenplay.screenplay)
    })
    .then(createdScreenplay => {
        currentSP = createdScreenplay;
        if(!user.screenplay) user.screenplay = [];
        user.screenplay.push(currentSP._id);
        return user.save();
    })
    .then(() => {
        return Scene.create(screenplay.scenes);
    })
    .then(scenes => {
        // console.log(scenes);
        currentScenes = scenes;
        ScenesIds = currentScenes.map(ele => {
            return ele._id;
        });
        currentSP.scenes = ScenesIds;
        return currentSP.save();
    })
    .then(() => {
        // console.log(currentScenes);
        compPromiseArray = screenplay.components.map( ele => {
            return Component.create(ele);
        });
        return Promise.all(compPromiseArray);
    })
    .then(createdComponents => {
        createdComponents.forEach((arrayOfComp, index) => {
            currentScenes[index].components = arrayOfComp.map( comp =>{
                return comp._id;
            });
        });
        return Promise.all(currentScenes.map(scene => scene.save()));
    })
    .then(() => {
        console.log('scenes saved');
    })
}

// Dialogue => Character => Scene =>

connectToDb
    .then(function () {
        return wipeCollections();
    })
    .then(function () {
        return seedUsers();
    })
    // .then(function(){
    //     return seedScreenplays();
    // })
    .then(function(){
        return Promise.all(allScreenplays.map(sp => {
            return seedScreenplaysTwo(sp);
        }));
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
