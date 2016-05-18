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
        var compsArr = scenes.reduce((orig, scene) => {
            return orig.concat(scene.components);
        }, []);
        return compsArr.map(comp => comp.text);

    });
};

mongoose.model('Screenplay', schema);
