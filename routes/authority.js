const router = require('express').Router()
router.use(function(req,res,next){
    console.log(req.session);
    if(!req.session.userID){
        res.status(401).json({code:401,msg:'未登录'})
    }else{
        next()
    }
})
module.exports = router