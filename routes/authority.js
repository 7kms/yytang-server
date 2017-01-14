const router = require('express').Router()
const resData = require('../util/resData')
router.use(function(req,res,next){
    console.log(req.session);
    if(!req.session.userID){
        res.status(200).json(resData(401, {msg:'未登录'}))
    }else{
        next()
    }
})
module.exports = router