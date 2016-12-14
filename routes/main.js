var router = require('express').Router()
var userInfo = {
    id: 1,
    account: 'example@163.com',
    password: '111111'
}

router.get('/test', (req, res) => {
  console.log(req.body);
  res.json(req.query)
})
router.get('/', function(req, res, next) {
  var sess = req.session
  if (sess.views) {
    sess.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + sess.views + '</p>')
    res.write('<p>expires in: ' + (sess.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    sess.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})
router.post('/login', (req, res) => {
  console.log(req.body);
  if(req.session){
      console.log(req.session.userInfo)
  }
  console.log(req.session)
  if(req.body.account == userInfo.account && req.body.password == userInfo.password){
      req.session.userInfo = userInfo.id
      res.status(200).json({msg:'login success'})
  }else{
      res.status(200).json({msg:'login fail'})
  }
})

module.exports = router