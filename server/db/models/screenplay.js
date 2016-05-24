'use strict'
var mongoose = require('mongoose');
var updateSubDocuments = require('./updateSubDocuments');
var Scene = mongoose.model('Scene');
var Promise = require('bluebird');
var schema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    custom: {},
    scenes: [{type: mongoose.Schema.Types.ObjectId, ref: "Scene"}],
    lastUpdate: Date
});

schema.methods.update = function(toUpdate){
    var targetDoc = this;
    return updateSubDocuments(toUpdate, Scene, 'scenes', targetDoc);
};

schema.pre('update', function(next) {
  this.update({ lastUpdate : new Date() } );
  next();
});

schema.methods.PopulateComponents = function(){
    var popdScenesArray = this.scenes.map(scene => {
        return Scene.findById(scene)
        .populate('components')
        .exec();
    });
    return Promise.all(popdScenesArray);
};


schema.methods.GetDialogue = function(){
    return this.PopulateComponents()
    .then(scenes => {
        var dialogueArr = [];
        return scenes.reduce((orig,scene) => {
            return orig.concat(scene.components.filter(comp => comp.charName && comp.text.split(' ').length > 1));
        }, []); 
    });
};


schema.methods.TextbyScenes = function(sections){
    return this.PopulateComponents()
    .then(scenes => {
        var sceneSize = Math.ceil(scenes.length / 100);
        var hundoScenes = [];
        while (scenes.length > 0) {
            hundoScenes.push(scenes.splice(0, sceneSize).reduce((orig, scene) => orig.concat(scene.components), []));
        }
        var sceneObj = {};
        sceneObj.sceneText = {};
        sceneObj.sceneText[1] = '';
        hundoScenes.forEach((scene,idx) => {
            sceneObj.sceneText[idx] = '';
            scene.forEach(comp => {
                if (!comp.text || !comp.text.trim().length) {return; }
                sceneObj.sceneText[idx] += (' '+comp.text);
                var key = comp.charName ? comp.charName : comp.type;
                if (sceneObj[key]) {
                    if (sceneObj[key][idx]) {
                        sceneObj[key][idx] += (' '+comp.text);
                    } else {
                        sceneObj[key][idx] = comp.text;
                    }
                } else {
                    sceneObj[key] = {};
                    sceneObj[key][idx] = comp.text;
                }
            });
        });
        return sceneObj;
    });
};

mongoose.model('Screenplay', schema);
