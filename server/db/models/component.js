'use strict';
var mongoose = require('mongoose');
const _ = require('lodash');
var Character = mongoose.model('Character');
var schema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['location', 'dialogue', 'action'],
        required: true
    },
    character: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Character'
    },
    charName: {type: String},
    text: {
        type: String
    }
});

schema.virtual('intExt').get(function () {
  if(this.type === 'location'){
    return this.text.slice(0, this.text.indexOf(' '));
  }
});

schema.virtual('location').get(function () {
  if(this.type === 'location'){
    return this.text.slice(this.text.indexOf(' ') + 1);
  }
});

schema.methods.update = function(toUpdate){
    delete toUpdate.__v;
    delete toUpdate._id;
    var currentComp = this;
    _.extend(currentComp, toUpdate);
    if (toUpdate.character) {
        var char = {}
        _.extend(char,toUpdate.character);
        if (char._id){
            var eleID = char._id;
            delete char._id;
            delete char.__v;
            return Character.findOneAndUpdate({_id: eleID}, char, {new: true, runValidators: true})
                .then(updatedChar => {
                    currentComp.charName = updatedChar.name;
                    currentComp.character = updatedChar;
                    return currentComp.save();
                });
        } else if (typeof toUpdate.character === 'object') {
            return Character.create(toUpdate.character)
                .then(createdChar => {
                    currentComp.charName = createdChar.name;
                    currentComp.character = createdChar;
                    return currentComp.save();
                });
        } else {
            return Character.findById(toUpdate.character)
            .then(foundChar => {
                currentComp.charName = foundChar.name;
                currentComp.character = foundChar;
                return currentComp.save();
            });
        }
    } else {
        return currentComp.save();
    }
};

mongoose.model('Component', schema);
