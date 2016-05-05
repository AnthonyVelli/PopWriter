var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var models = require('./create-dummy-entries');

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

        it('should save a custom field', function () {
            return Scene.findOne()
            .then(function(foundScene){ 
                var testObj = {history: 'dark'};
                var testObj2 = {future: ['unknown', 444]};
                var testObj3 = {past: 'murky',
                present: 'really going well! :)'};
                foundScene.custom.push(testObj);
                foundScene.custom.push(testObj2);
                foundScene.custom.push(testObj3);
                return foundScene.save(); })
            .then(function(updatedScene) {
                expect(updatedScene.custom).to.have.length(3);
                expect(updatedScene.custom[2].past).to.equal('murky');
                expect(updatedScene.custom[1].future[1]).to.equal(444); 
            });
        });

        it('Pre-Save Hook to Populate Heading', function () {
            return Scene.findOne()
            .populate('header')
            .then(function(foundScene){
                expect(foundScene.header.type).to.equal('location') ;
            });
        });
    });
});