var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
 
var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Character = mongoose.model('Character');
var Component = mongoose.model('Component');

describe('Character model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);        
    });

    beforeEach('Create dummy objects', function(done){
        Component.create({type: 'dialogue', text: 'things you say to anothe rperson'})
        .then(function(createdComponent){
            return Character.create({dialogue: createdComponent, name: 'jake the snake roberts', sex: 'male'}); })
        .then(function(createdChar){
            done(); })
        .catch(done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    describe('CRUD', function () {

        it('should exist', function () {
            expect(Character).to.be.a('function');
        });

        it('should save a Character', function (done) {
            Character.find()
            .then(function(ele) {
                expect(ele).to.have.length(1);
                done(); })
            .catch(done);
        });

        it('should save a Character with multiple Components', function (done) {
            Component.create({type: 'dialogue', text: 'when you are trying to say things to express yourself'})
            .then(function(createdComp){
                return Character.findOne()
                .then(function(foundChar) {
                    foundChar.dialogue.push(createdComp);
                    return foundChar.save(); })
                .catch(done); })
            .then(function(updatedChar){
                expect (updatedChar.dialogue).to.have.length(2);
                done(); })
            .catch(done);
        });

        it('should save a custom field', function (done) {
            Character.findOne()
            .then(function(foundChar){
                var testObj = {history: 'dark'};
                var testObj2 = {future: ['unknown', 444]};
                var testObj3 = {past: 'murky',
                present: 'really going well! :)'};
                foundChar.custom.push(testObj);
                foundChar.custom.push(testObj2);
                foundChar.custom.push(testObj3);
                return foundChar.save(); })
            .then(function(updatedChar) {
                expect(updatedChar.custom).to.have.length(3);
                expect(updatedChar.custom[2].past).to.equal('murky');
                expect(updatedChar.custom[1].future[1]).to.equal(444);
                done(); })
            .catch(done);
        });
    });
});