var _ = require('lodash');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var Character = mongoose.model('Character');
var Screenplay = mongoose.model('Screenplay');
var Scene = mongoose.model('Scene');
var User = mongoose.model('User');
var Component = mongoose.model('Component');
var screenplayRepo = mongoose.model('screenplayRepo');
var fs = require('fs');

var fortOBJ = fs.readFileSync('./fortress.txt', 'utf8');
var fortOBJFull = fortOBJ.replace(/\n/, ' ');
var allComponents = fortOBJ.split(/\n/).map(comp => [null, comp]);
screenplayRepo.create({name: 'The Hidden Fortress', components: allComponents, TextByScript: fortOBJFull, WordCount: fortOBJFull.split(" ").length});
