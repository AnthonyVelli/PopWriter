'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/user', require('./user'));
router.use('/public', require('./public'));


router.use(function (req, res) {
    res.status(404).end();
});
