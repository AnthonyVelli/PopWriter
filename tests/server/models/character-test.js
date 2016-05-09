var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);
var mongoose = require('mongoose');
var sinon = require('sinon');
var expect = require('chai').expect;
var models = require('./create-dummy-entries');
const _ = require('lodash');
 
// Require in all models.
require('../../../server/db/models');

var Character = models.Character;
var Component = models.Component;

describe('Character model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);        
    });

    beforeEach('Create dummy objects', function(){
        return models.createCharacter();
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    describe('CRUD', function () {

        it('should exist', function () {
            expect(Character).to.be.a('function');
        });

        it('should save a Character', function () {
            return Character.find()
            .then(function(ele) {expect(ele).to.have.length(1); });
        });

        it('should save a Character with multiple Components', function () {
            return Character.findOne()
            .then(function(ele) {expect(ele.dialogue).to.have.length(2); });
        });

        it('should save multiple custom fields', function () {
            return Character.findOne()
            .then(function(foundChar) {
                _.extend(foundChar, {custom: {'customfieldONE': 'whatever i feel like!!!', 'customfieldTWO': 'no, exactly as we say'}});
                return foundChar.save(); })
            .then(function(updatedChar) {
                expect (updatedChar.custom).to.have.property('customfieldONE');
                expect (updatedChar.custom).to.have.property('customfieldTWO');
                expect (updatedChar.custom.customfieldONE).to.equal('whatever i feel like!!!');
            });
        });
    });
});