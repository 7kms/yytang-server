const port = 3000
var app = require('express')()
var session = require('express-session')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var multer = require('multer')

app.use(cookieParser())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Use the session middleware 
app.use(session({ secret: 'yytang-server', cookie: { maxAge: 15*60*1000 }}))
 
// Access the session as req.session 
app.get('/', function(req, res, next) {
  var sess = req.session
  console.log(sess)
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
var userInfo = {
    id: 1,
    account: 'example@163.com',
    password: '111111'
}
app.post('/login', (req, res) => {
  console.log(req.body);
  if(req.body.account == userInfo.account && req.body.password == userInfo.password){
      req.session.userID = userInfo.id
      res.status(200).json({msg:'login success'})
  }else{
      res.status(400).json({msg:'login fail'})
  }
})

app.listen(port, function(err){
    if(!err){
        console.log(`port is running at ${port}`)
    }
})