'use strict'
var Promise = require('bluebird');
var _ = require('lodash');

// function to update users, screenplay, scenes, and characters
// toUpdate = req.body; all other args defined in Model function
module.exports = function(toUpdate, Model, property, targetDoc){
    // overwrites mongoose document with udpated information
    _.extend(targetDoc, toUpdate);
    // if "property" array sent by front end is not empty, update array
    if (toUpdate[property].length) {
        var updatePromise = toUpdate[property].map(function(ele) {
            if (ele._id) {
                var eleID = ele._id;
                delete ele._id;
                delete ele._v;
                return Model.findOneAndUpdate({_id: eleID}, ele, {new: true, runValidators: true})
                    .exec();
            } else {
                // if object from req.body has no id, it doesn't exist in the db, create it
                return Model.create(ele);
            }
        }); 
        return Promise.all(updatePromise)
            .then(allPromise => {
                // update array/subdoc in db with new array;
                targetDoc[property] = allPromise;
                return targetDoc.save();
            });
    } else {
        // if "property" array is empty, save document
        return targetDoc.save();
    }
};
