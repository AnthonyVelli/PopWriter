'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/members', require('./members'));
router.use('/components', require('./components'));
router.use('/screenplays', require('./screenplays'));
router.use('/users', require('./user'));
router.use('/scenes', require('./scenes'));
router.use('/character', require('./character'));
router.use('/analytics', require('./analytics'));



// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
