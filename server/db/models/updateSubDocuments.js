'use strict'
var Promise = require('bluebird');
var _ = require('lodash');

// function to update users, screenplay, scenes, and characters
// toUpdate = req.body; all other args defined in Model function
module.exports = function(toUpdate, Model, property, targetDoc){
    delete toUpdate.__v;
    delete toUpdate._id;
    var subDocuments = toUpdate[property];
    delete toUpdate[property];
    _.extend(targetDoc, toUpdate);
    
    if (subDocuments && subDocuments.length) {
        var updatePromise = subDocuments.map(function(ele) {
            if (ele._id) {
                return Model.findById(ele._id)
                    .then(doc => doc.update(ele));
            } else if (ele.id) {
                return Model.findById(ele)
                .exec();
            } else {
                console.log('in create');
                console.log(ele);
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
