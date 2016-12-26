const router = require('express').Router()
const author = require('./authority')
var userInfo = {
    id: 1,
    name: '刘诗诗',
    account: 'example@163.com',
    password: '111111'
}

router.post('/login', (req, res) => {
  console.log(req.body)
  if(req.body.account == userInfo.account && req.body.password == userInfo.password){
      req.session.userID = userInfo.id
      res.status(200).json({user:{id:userInfo.id,name:userInfo.name}})
  }else{
      res.status(400).json({msg:'用户名或者密码错误!'})
  }
})
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