var router = require('express').Router();
var juejin = require('../juejin/index.js');
router.use('/juejin',juejin)
router.get('/test',(req, res, next)=>{
    console.log(req)
  res.status(200).json({msg:'da'})
})
module.exports = router