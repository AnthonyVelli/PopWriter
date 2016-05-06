var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var models = require('./create-dummy-entries');
 

const Component = models.Component;

describe('Component model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);        
    });
    beforeEach('Establish DB connection', function () {
        return models.createComponents();
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    describe('CRUD', function () {

        it('should exist', function () {
            expect(Component).to.be.a('function');
        });

        it('should save a Component', function () {
            return Component.find()
            .then(function(ele) {
                expect(ele).to.have.length(2); });
        });

        it('should delete a Component', function () {
            return Component.find({type: 'location'}).remove()
            .then(function(ele){
                return Component.find(); })
            .then(function(ele) {
                expect(ele).to.have.length(1); });
        });
    });

    describe('Virtuals', function () {

        it('interiour/exteriour virtual', function () {
            return Component.create({type: 'location', text: 'INT. The Coconut Grove Nightclub - night'})
            .then(function(created){
                expect(created.intExt).to.equal('INT.'); });
        });

        it('location virtual', function () {
            return Component.create({type: 'location', text: 'INT. The Coconut Grove Nightclub - night'})
            .then(function(created){
                expect(created.location).to.equal('The Coconut Grove Nightclub - night'); });
        });
    });

});
