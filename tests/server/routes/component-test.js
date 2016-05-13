
var mongoose = require('mongoose');
var models = require('../models/create-dummy-entries');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');
 
describe('Component Route', function () {
	var comp1;
	var comp2;
	var guestAgent;

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	}); 
 
	describe('RESTful Functionality', function () {

		beforeEach('Create guest agent', function () {
			guestAgent = supertest.agent(app);
		});

		beforeEach('Seed DB', function () {
			return models.createComponents()
			.then((ele, ele2) => {
				comp1 = ele;
				comp2 = ele2; 
			});
		});

		it('should return all components', function (done) {
			guestAgent.get('/api/components/')
			.expect(200)
			.end(function(err, res){
				if (err) return done(err);
				expect(res.status).to.equal(200);
				expect(res.body).to.have.length(2);
				done();
			});
		});

		it('should return correct component', function (done) {
			guestAgent.get('/api/components/'+comp1._id)
			.expect(200)
			.end(function(err, res){
				if (err) return done(err);
				expect(res.status).to.equal(200);
				done();
			});
		});

		it('should post & return new components with virtuals populated', function (done) {
			guestAgent.post('/api/components/').send({type: 'location', text: 'INT. the mountain top'})
			.expect(201)
			.end(function(err, res){
				if (err) return done(err);
				expect(res.body.text).to.equal('INT. the mountain top');
				expect(res.body).to.have.property('_id');
				expect(res.body).to.have.property('location');
				expect(res.body).to.have.property('intExt');
				done();
			});
		});
 
		it('should delete component', function (done) {
			guestAgent.delete('/api/components/'+comp1._id)
			.expect(204)
			.end(function(err, res){
				if (err) return done(err);
				guestAgent.get('/api/components/')
				.expect(200)
				.end(function(err, res){
					if (err) return done(err);
					expect(res.body).to.have.length(1);
					done();
				});
			});
		});
	});

});


