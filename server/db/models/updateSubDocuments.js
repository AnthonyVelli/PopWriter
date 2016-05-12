'use strict'
var Promise = require('bluebird');
var _ = require('lodash');


module.exports = function(toUpdate, Model, property, targetDoc){
    delete toUpdate.__v;
    delete toUpdate._id;
    var subDocuments = toUpdate[property];
    delete toUpdate[property];
    _.extend(targetDoc, toUpdate);
    if (subDocuments.length) {
        var updatePromise = subDocuments.map(function(ele) {
            if (ele._id) {
                var eleID = ele._id;
                delete ele._id;
                delete ele.__v;
                return Model.findOneAndUpdate({_id: eleID}, ele, {new: true, runValidators: true})
                    .exec();
            } else if (typeof ele === 'object') {
                return Model.create(ele);
            } else {
                return Model.findById(ele).exec();
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
