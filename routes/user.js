const router = require('express').Router()
const author = require('./authority')
var $api = require('./juejin/api');

var userInfo = {};
router.post('/login',(req,res,next)=>{
    $api.refreshHeader();
    console.log({mobilePhoneNumber:req.body.account,password:req.body.password})
    $api.post('/1.1/login',{mobilePhoneNumber: req.body.account,password:req.body.password})
    .then(data => {
        req.session.userID = data.objectId;
        userInfo = data;
        res.status(200).json(data);
    },error => {
        res.status(500).send(error);
    })
})

router.use(author)
router.get('/info', (req, res, next) =>{
    res.status(200).json(userInfo)
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