var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var models = require('./create-dummy-entries');
var _ = require('lodash');
const Scene = models.Scene;

describe('Scene model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);        
    });

    beforeEach('Create dummy objects', function(){
        return models.createScene();
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    describe('CRUD', function () {

        it('should exist', function () {
            expect(Scene).to.be.a('function');
        });

        it('should save a Scene', function () {
            return Scene.find()
            .then(function(ele) {
                expect(ele).to.have.length(1); });
        });

        it('should store multiple Components in one Scene', function () {
            return models.createComponents()
            .then(function(createdComponents){
                return Scene.findOne()
                .then(function(foundScene){
                    foundScene.components.push(createdComponents);
                    return foundScene.save(); })
                .then(function(updatedScene){
                    expect(updatedScene.components).to.have.length(3);
                });

            });
        });

        it('should save multiple custom fields', function () {
            return Scene.findOne()
            .then(function(foundScene) {
                _.extend(foundScene, {custom: {'customfieldONE': 'whatever i feel like!!!', 'customfieldTWO': 'no, exactly as we say'}});
                return foundScene.save(); })
            .then(function(updatedScene) {
                expect (updatedScene.custom).to.have.property('customfieldONE');
                expect (updatedScene.custom).to.have.property('customfieldTWO');
                expect (updatedScene.custom.customfieldONE).to.equal('whatever i feel like!!!');
            });
        });

    });

     describe('Update Function', function () {

        it('Create Character', function () {
            return Scene.create({header: 'heres a header'})
            .then(createdScene => createdScene.update({character: {name: 'jonjonthejonny boy'}}))
            .then(updatedScene => {
                console.log(updatedScene);
                expect (updatedScene.character.name).to.equal('jonjonthejonny boy');
            });
            });
        });
});