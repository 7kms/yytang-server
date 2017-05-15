const router = require('express').Router()
const author = require('./authority')
const nuggets = require('./nuggets')
const resData = require('../util/resData')
const userCtrl = require('../app/controllers/users')

var userInfo = {};
router.post('/login',(req,res,next)=>{
     let {account:mobilePhoneNumber, password} = req.body;
     nuggets.login({mobilePhoneNumber,password})
     .then(data => {
         req.session.userID = data.objectId;
         userInfo = data;
         res.status(200).json(resData(200, data));
     },error => {
         res.status(500).send(error);
     })
})

router.post('/register', (req, res, next) => {
   let { email, password } = req.body;
   userCtrl.isExists({email})
   .then((user) => {
       if(user){
            res.status(200).json(resData(-1, {msg:'账号已经存在'}));
       }else{
           userCtrl.create({ email, password })
           .then(obj=>{
                res.status(200).json(obj);
           }).catch(err=>{
                 res.status(500).json(err);
           })
       }
   }).catch((err) => {
       res.status(500).send(err);
   });
})

router.use(author)
router.get('/info', (req, res, next) =>{
    res.status(200).json(resData(200, userInfo))
})
router.post('/loginout', (req, res, next) => {
    console.log(req);
    req.session.destroy(err => {
        if(!err) {
            res.status(200).json(resData(200, {msg:'退出登录'}))
        }else {
            res.status(200).json(resData(400, {msg:'退出失败'}))
        }
    })
})
router.get('/subscribe',(req, res, next) => {
    nuggets.subscribe(req.query)
    .then(data=>{
        res.status(200).json(resData(200, data));
    },error=>{
        res.status(500).send(error);
    });
});
module.exports = router