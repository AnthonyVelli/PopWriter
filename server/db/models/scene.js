'use strict';
var mongoose = require('mongoose');
var Component = mongoose.model('Component');
var _ = require('lodash');
var Promise = require('bluebird');

var schema = new mongoose.Schema({
    header: {type: String, required: true},
    components: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Component'}
    ],
    synposis: {
        type: String
    },
    custom: {},
    date: {
        type: Date
    }
});

// schema.pre('validate', function(next) {
//     var Component = mongoose.model('Component');
//     if (this.components.length === 0) {next(); }
//     var compstoPop = this.components.filter((ele) => !ele.type);
//     var comps = this.components.filter((ele) => ele.type);
//     if (comps.length > 0) {
//         this.header = comps.find(ele => ele.type === 'location').text;
//         next();
//     }
//     if (compstoPop.length === 0){next(); }
//     Component.find({'_id': { $in: compstoPop}})
//     .then(foundComps => {
//         if (!foundComps) {next(); }
//         this.header = foundComps.find(ele => ele.type === 'location').text;
//         next();
//     });
// });

schema.methods.updateComponents = function(componentsToUpdate){
    var currentScene = this;
    var updatePromise = componentsToUpdate.map(function(ele) {
        if (ele._id) {
            var eleID = ele._id;
            delete ele._id;
            return Component.findOneAndUpdate({_id: eleID}, ele, {new: true, runValidators: true})
                .exec();
        } else {
            return Component.create(ele);
        }
    }); 
    return Promise.all(updatePromise)
        .then(allPromise => {
            currentScene.scenes = allPromise;
            return currentScene.save();
        });
};



mongoose.model('Scene', schema);
