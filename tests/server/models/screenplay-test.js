var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var models = require('./create-dummy-entries');
const _ = require('lodash');
 

var Screenplay = models.Screenplay;
var Scene = models.Scene;

describe('Screenplay Model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);        
    });

    beforeEach('Seed Test Data', function () {
        return models.createScreenplay();
    });


    afterEach('Clear test database', function (done) {
        clearDB(done);
    }); 
   
    describe('CRUD', function () {
  
        it('should exist', function () {
            expect(Screenplay).to.be.a('function');
        }); 
  
        it('Can Persist Multiple Scenes', function () {
            var sceneHolder;
            return models.createScene()
            .then(createdScene => {
                sceneHolder = createdScene;
                return Screenplay.findOne(); })
            .then(foundScreenplay => {
                foundScreenplay.scenes.push(sceneHolder);
                return foundScreenplay.save(); })
            .then(function(updatedScreenplay){
                expect(updatedScreenplay.scenes).to.have.length(2); }); 
        });
        

        it('should save multiple custom fields', function () {
            return Screenplay.findOne()
            .then(function(foundSP) {
                _.extend(foundSP, {custom: {'customfieldONE': 'whatever i feel like!!!', 'customfieldTWO': 'no, exactly as we say'}});
                return foundSP.save(); })
            .then(function(updatedSP) {
                expect (updatedSP.custom).to.have.property('customfieldONE');
                expect (updatedSP.custom).to.have.property('customfieldTWO');
                expect (updatedSP.custom.customfieldONE).to.equal('whatever i feel like!!!');
            });
        });

    });
    
 
    describe('Update Scenes Method', function () {
        var createdSP;
        beforeEach('Seed Test Data', function () {
            return Screenplay.create({title: 'seed Screenplay'})
            .then(function(ele) { 
                return ele.updateScenes({scenes: [{header: 'scede scene being added in Before Each'}, {header: 'a second scene, you know, to test with?'}]}); })
            .then(function(updatedSP) {
                createdSP = updatedSP;
            });
        });
        it('Scenes Saved to Screenplay are Valid Scene Refs', function () {
            return Screenplay.findOne({title: 'seed Screenplay'})
            .then(function(foundSP){
                expect (foundSP.scenes).to.have.length(2);
                return Scene.find({_id: { $in: foundSP.scenes}}); })
            .then(function(foundScenes) {
                expect(foundScenes).to.have.length(2);
            });
        });

        it('Should Update Scenes if they Have ._id & Create New Scene if They Do Not', function () {
            var originalScenes = createdSP.scenes;
            var newSceneHolder = [{_id: originalScenes[1]._id, header: 'sometimes we change our data'}, {_id: originalScenes[0]._id, header: originalScenes[0].header}];
            newSceneHolder.push({header: 'sometimes we mix old scenes with new scenes! chaos!'});
            return createdSP.updateScenes({scenes: newSceneHolder})
                .then(function(updatedSP){
                    expect(updatedSP.scenes).to.have.length(3);
                    expect(updatedSP.scenes[0].header).to.equal('sometimes we change our data');
                    expect(updatedSP.scenes[0]._id.toString()).to.equal(originalScenes[1]._id.toString());
                    expect(updatedSP.scenes[1]._id.toString()).to.equal(originalScenes[0]._id.toString());
                    expect(updatedSP.scenes[2]).to.have.property('_id');
                });
        }); 
    });
 
});