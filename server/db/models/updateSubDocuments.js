'use strict'
var Promise = require('bluebird');
var _ = require('lodash');


module.exports = function(toUpdate, Model, property, targetDoc){
    _.extend(targetDoc, toUpdate);
    if (toUpdate[property].length) {
        var updatePromise = toUpdate[property].map(function(ele) {
            if (ele._id) {
                var eleID = ele._id;
                delete ele._id;
                return Model.findOneAndUpdate({_id: eleID}, ele, {new: true, runValidators: true})
                    .exec();
            } else {
                return Model.create(ele);
            }
        }); 
        return Promise.all(updatePromise)
            .then(allPromise => {
                targetDoc[property] = allPromise;
                return targetDoc.save();
            });
    } else {
        return targetDoc.save();
    }
};
