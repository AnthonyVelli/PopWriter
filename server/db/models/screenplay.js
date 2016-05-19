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

schema.methods.TextbyScenes = function(divisions){
    var popdScenesArray = this.scenes.map(scene => {
        return Scene.findById(scene)
        .populate('components')
        .exec();
    });
    return Promise.all(popdScenesArray)
    .then(scenes => {
        var sceneObj = {};
        sceneObj.sceneText = {};
        sceneObj.sceneText['1'] = '';
        scenes.forEach((scene,idx) => {
            sceneObj.sceneText[idx] = '';
            scene.components.forEach(comp => {
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
