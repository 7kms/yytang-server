var router = require('express').Router()
var userInfo = {
    id: 1,
    name: '刘诗诗',
    account: 'example@163.com',
    password: '111111'
}

router.get('/test', (req, res) => {
 var sess = req.session
  if (sess.views) {
    sess.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + sess.views + '</p>')
    res.write('<p>views: ' + sess.userID + '</p>')
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    sess.views = 1
    sess.userID = userInfo.id
    res.end('welcome to the session demo. refresh!')
  }
})

router.post('/login', (req, res) => {
  console.log(req.body)
  if(req.body.account == userInfo.account && req.body.password == userInfo.password){
      req.session.userID = userInfo.id
      res.status(200).json({user:{id:userInfo.id,name:userInfo.name}})
  }else{
      res.status(400).json({msg:'用户名或者密码错误!'})
  }
})

module.exports = router