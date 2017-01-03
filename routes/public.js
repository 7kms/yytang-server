var router = require('express').Router();
var juejin = require('./juejin/index.js');
router.use('/juejin',juejin)
module.exports = router