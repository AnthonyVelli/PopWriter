'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/api/components', require('./components'));
router.use('/api/screenplays', require('./screenplays'));
router.use('/api/users', require('./user'));
router.use('/api/character', require('./character'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
