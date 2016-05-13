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
        type: String,
        required: true
    }
}, {toObject: {virtuals: true}, toJSON: {virtuals: true}});

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
    _.extend(this, toUpdate);
    if (toUpdate.character) {
        if (toUpdate.character._id){
            var eleID = toUpdate._id;
            delete toUpdate.character._id;
            delete toUpdate.character.__v;
            return Character.findOneAndUpdate({_id: eleID}, toUpdate.character, {new: true, runValidators: true})
                .then(updatedChar => {
                    this.charName = updatedChar.name;
                    this.character = updatedChar;
                });
        } else if (typeof toUpdate.character === 'object') {
            return Character.create(toUpdate.character)
                .then(createdChar => {
                    this.charName = createdChar.name;
                    this.character = createdChar;
                });
        } else {
            return Character.findById(this.character)
            .then(foundChar => {
                this.charName = foundChar.name;
                this.character = foundChar;
            });
        }
    } else {
        return this.save();
    }
};

mongoose.model('Component', schema);
