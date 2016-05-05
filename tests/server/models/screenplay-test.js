var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var models = require('./create-dummy-entries');
 

const Screenplay = models.Screenplay;

describe('Screenplay model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);        
    });
    beforeEach('Establish DB connection', function () {
        return models.createScreenplay();
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    describe('CRUD', function () {

        it('should exist', function () {
            expect(Screenplay).to.be.a('function');
        });

        it('should save a Screenplay', function () {
            return Screenplay.find()
            .then(function(ele) {
                expect(ele).to.have.length(1); });
        });

        it('should save a Screenplay with multiple Scenes', function () {
            models.createScene()
            .then(createdScene => Screenplay.findOne())
            .then(foundScreenplay => {
                foundScreenplay.scenes.push(createdScene);
                foundScreenplay.save(); })
            .then(function(updatedScreenplay){
                expect(updatedScreenplay.scenes).to.have.length(2); }); 
        });
        

        it('should save multiple custom fields', function () {
            Screenplay.findOne()
            .then(function(foundScreenplay){
                var testObj = {history: 'dark'};
                var testObj2 = {future: ['unknown', 444]};
                var testObj3 = {past: 'murky',
                present: 'really going well! :)'};
                foundScreenplay.custom.push(testObj);
                foundScreenplay.custom.push(testObj2);
                foundScreenplay.custom.push(testObj3);
                return foundScreenplay.save(); })
            .then(function(updatedScreenplay) {
                expect(updatedScreenplay.custom).to.have.length(3);
                expect(updatedScreenplay.custom[2].past).to.equal('murky');
                expect(updatedScreenplay.custom[1].future[1]).to.equal(444); });
        });
    });
});