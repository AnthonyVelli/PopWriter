var router = require('express').Router();
var Screenplay = require('mongoose').model('Screenplay');


router.get('/', function(req, res, next){
    Screenplay.find()
    .then(screenplays => {
        res.json(screenplays);
    })
    .catch(next);
});

router.get('/:userId', function(req, res, next){
    Screenplay.findById(req.params.userId)
    .then(screenplays => {
        res.json(screenplays);
    })
    .catch(next);
});

module.exports = router;
