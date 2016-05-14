var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var model = require('./create-dummy-entries');

// Require in all models.
require('../../../server/db/models');

var User = model.User;
var Screenplay = model.Screenplay;

describe('User model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });
 
    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(User).to.be.a('function');
    });

    describe('password encryption', function () {

        describe('generateSalt method', function () {

            it('should exist', function () {
                expect(User.generateSalt).to.be.a('function');
            });

            it('should return a random string basically', function () {
                expect(User.generateSalt()).to.be.a('string');
            });

        });

        describe('encryptPassword', function () {

            var cryptoStub;
            var hashUpdateSpy;
            var hashDigestStub;
            beforeEach(function () {

                cryptoStub = sinon.stub(require('crypto'), 'createHash');

                hashUpdateSpy = sinon.spy();
                hashDigestStub = sinon.stub();

                cryptoStub.returns({
                    update: hashUpdateSpy,
                    digest: hashDigestStub
                });

            });

            afterEach(function () {
                cryptoStub.restore();
            });

            it('should exist', function () {
                expect(User.encryptPassword).to.be.a('function');
            });

            it('should call crypto.createHash with "sha1"', function () {
                User.encryptPassword('asldkjf', 'asd08uf2j');
                expect(cryptoStub.calledWith('sha1')).to.be.ok;
            });

            it('should call hash.update with the first and second argument', function () {

                var pass = 'testing';
                var salt = '1093jf10j23ej===12j';

                User.encryptPassword(pass, salt);

                expect(hashUpdateSpy.getCall(0).args[0]).to.be.equal(pass);
                expect(hashUpdateSpy.getCall(1).args[0]).to.be.equal(salt);

            });

            it('should call hash.digest with hex and return the result', function () {

                var x = {};
                hashDigestStub.returns(x);

                var e = User.encryptPassword('sdlkfj', 'asldkjflksf');

                expect(hashDigestStub.calledWith('hex')).to.be.ok;
                expect(e).to.be.equal(x);

            });

        });

        describe('on creation', function () {

            var encryptSpy;
            var saltSpy;

            var createUser = function () {
                return User.create({ email: 'obama@gmail.com', password: 'potus' });
            };

            beforeEach(function () {
                encryptSpy = sinon.spy(User, 'encryptPassword');
                saltSpy = sinon.spy(User, 'generateSalt');
            });

            afterEach(function () {
                encryptSpy.restore();
                saltSpy.restore();
            });

            it('should call User.encryptPassword with the given password and generated salt', function (done) {
                createUser().then(function () {
                    var generatedSalt = saltSpy.getCall(0).returnValue;
                    expect(encryptSpy.calledWith('potus', generatedSalt)).to.be.ok;
                    done();
                });
            });

            it('should set user.salt to the generated salt', function (done) {
               createUser().then(function (user) {
                   var generatedSalt = saltSpy.getCall(0).returnValue;
                   expect(user.salt).to.be.equal(generatedSalt);
                   done();
               });
           });

            it('should set user.password to the encrypted password', function (done) {
                createUser().then(function (user) {
                    var createdPassword = encryptSpy.getCall(0).returnValue;
                    expect(user.password).to.be.equal(createdPassword);
                    done();
                });
            });

        });

        describe('sanitize method', function () {

            var createUser = function () {
                model.createScreenplay
                return User.create({ email: 'obama@gmail.com', password: 'potus' });
            };

            it('should remove sensitive information from a user object', function () {
                createUser().then(function (user) {
                    var sanitizedUser = user.sanitize();
                    expect(user.password).to.be.ok;
                    expect(user.salt).to.be.ok;
                    expect(sanitizedUser.password).to.be.undefined;
                    expect(sanitizedUser.salt).to.be.undefined;
                });
            });
        });

    });

    describe('Update Screenplays', function () {

        var createUser = function () {
            return model.createScreenplay()
            .then(screenplay => User.create({ email: 'obama@gmail.com', password: 'potus', screenplay: [screenplay]}));
        };
        

        it('Screenplays Saved to User are Valid Screenplays Refs', function () {
            return createUser()
            .then(newusr => newusr.update({screenplay: newusr.screenplay.concat([{title: 'test screenplay title AGAIN'}])}))
            .then(updatedusr => {
                expect(updatedusr.screenplay[1].title).to.equal('test screenplay title AGAIN');
                expect(updatedusr.screenplay).to.have.length(2);
                return Screenplay.findById(updatedusr.screenplay[1]._id); })
            .then(foundScreenplay => expect(foundScreenplay._id).to.exist); 
        });

        it('Should Create New Screenplays and Rearrange Screenplays to Match Array Order', function () {
            return createUser()
            .then(createdUser => {

                return createdUser.update({screenplay: [{title: 'new screenplay for testing in final test woot!'}, {title: 'another new screen play, FOR GOOD MEASURE'}].concat(createdUser.screenplay)}); })
            .then(function(updatedUser){
                expect(updatedUser.screenplay).to.have.length(3);
                expect(updatedUser.screenplay[2].title).to.equal('taleof twocities');
                expect(updatedUser.screenplay[2].scenes).to.have.length(1);
                expect(updatedUser.screenplay[0].title).equal('new screenplay for testing in final test woot!'); 
            });
        });

        it('Can Create Deeply Nested Documents', function () {
            return User.create({ email: 'obama@gmail.com', password: 'potus'})
            .then(createdUser => {
                return createdUser.update({screenplay: [{title: 'new screenplay for testing in final test woot!'}]}); })
            .then(function(updatedUser){
                console.log(updatedUser);
                expect(updatedUser.screenplay.title).to.equal('new screenplay for testing in final test woot!');
                expect(updatedUser.screenplay._id).to.exist;
            });
        });
    });
});