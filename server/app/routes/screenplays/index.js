var router = require('express').Router();
var Screenplay = require('mongoose').model('Screenplay');


router.get('/', function(req, res, next){
    Screenplay.find()
    .then(screenplays => {
        res.json(screenplays);
    })
    .catch(next);
});

module.exports = router;
