
var mongoose = require('mongoose');
var models = require('../models/create-dummy-entries');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');

var Screenplay = models.Screenplay;
 
describe('Screenplay Route', function () {
	var screenplay;
	var guestAgent;

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});
	beforeEach('Seed DB', function () {
		return models.createScreenplay()
		.then((ele) => {
			screenplay = ele;
		});
	});
	
	before('Create guest agent', function () {
		guestAgent = supertest.agent(app);
	});

	describe('RESTful Functionality', function () {

		it('should return all screenplays if not given an ID as a parameter', function (done) {
			guestAgent.get('/api/screenplays/')
			.expect(200)
			.end(function(err, res){
				if (err) return done(err);
				expect(res.status).to.equal(200);
				expect(res.body).to.have.length(1);
				done();
			});
		}); 
   
		it('should return correct screenplay if given an ID as a parameter', function (done) {
			guestAgent.get('/api/screenplays/'+screenplay._id)
			.expect(200)
			.end(function(err, res){
				if (err) return done(err);
				expect(res.status).to.equal(200);
				expect(res.body.title).to.equal('taleof twocities');
				done();
			});
		});
  
		it('should delete screenplay', function (done) {
			guestAgent.delete('/api/screenplays/'+screenplay._id)
			.expect(204)
			.end(function(err, res){
				if (err) return done(err);
				guestAgent.get('/api/screenplays/')
				.expect(200)
				.end(function(err, res){
					if (err) return done(err);
					expect(res.body).to.have.length(0);
					done();
				});
			});
		});
	}); 
  
	describe('should update screenplay', function () {
		it('should update scenes & create new scenes if necessary', function (done) {
			guestAgent.put('/api/screenplays/'+screenplay._id)
			.send({scenes: [{header: 'testing the router using head', synopsis: 'heres some synopsis!'}, {header: 'more stuff', synopsis: 'heres some synopsis!'}]})
			.expect(200)
			.end(function(err, res){
				if (err) return done(err);
				guestAgent.get('/api/screenplays/'+screenplay._id)
				.expect(200)
				.end(function(err, res){
					if (err) return done(err);
					expect(res.body.scenes[0].header).to.equal('testing the router using head');
					expect(res.body.scenes).to.have.length(2);
					done();
				});
			});
		});
	});

});


