'use strict'
var Promise = require('bluebird');
var mongoose = require('mongoose');
var _ = require('lodash');
var Scene = mongoose.model('Scene');
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

schema.methods.updateScenes = function(toUpdate){
    var currentSP = this;
    _.extend(currentSP, toUpdate);
    if (toUpdate.scenes.length) {
        var updatePromise = toUpdate.scenes.map(function(ele) {
            if (ele._id) {
                var eleID = ele._id;
                delete ele._id;
                return Scene.findOneAndUpdate({_id: eleID}, ele, {new: true, runValidators: true})
                    .exec();
            } else {
                return Scene.create(ele);
            }
        }); 
        return Promise.all(updatePromise)
            .then(allPromise => {
                currentSP.scenes = allPromise;
                return currentSP.save();
            });
    } else {
        return currentSP.save();
    }
};

schema.pre('update', function(next) {
  this.update({ lastUpdate : new Date() } );
  next();
});



mongoose.model('Screenplay', schema);

