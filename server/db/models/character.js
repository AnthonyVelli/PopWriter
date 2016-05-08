

const mongoose = require('mongoose');
const Component = mongoose.model('Component');
var Promise = require('bluebird');

var schema = new mongoose.Schema({
	components: [{type: mongoose.Schema.Types.ObjectId, ref: "Component", required: true}],
	name: {type: String},
	sex: {type: String, enum: ["male", "female", "other"]},
	custom: {}
});

schema.methods.updateComponents = function(componentsToUpdate){
    var currentChar = this;
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
            currentChar.Component = allPromise;
            return currentChar.save();
        });
};

module.exports = mongoose.model('Character', schema);