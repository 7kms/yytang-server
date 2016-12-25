const router = require('express').Router()
const author = require('./authority')
router.use(author)
router.get('/info', (req, res, next) =>{
    res.status(200).json({userInfo:req.session.userInfo})
})
router.post('/loginout', (req, res, next) => {
    console.log(req);
    req.session.destroy(err => {
        if(!err) {
            res.status(200).json({code:200,msg:'退出登录'})
        }else {
            res.status(400).json({code: 400,msg:'退出失败'})
        }
    })
})
module.exports = router