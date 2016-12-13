const config = require('./config')
var app = require('express')()
var session = require('express-session')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
if(config.setting.cross) {
  app.use(require('./util/cross'))
}

app.use(cookieParser())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// Use the session middleware 
app.use(session({ secret: 'yytang-server', cookie: { maxAge: 15*60*1000 }}))

app.use('/', require('./routes/main'))
app.use('/user', require('./routes/user'))


// 捕获404并定向到错误处理
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 错误处理
// 开发环境下的错误处理
// 会输出堆栈信息
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    // 设置响应状态
    res.status(err.status || 500).json({code:err.status || 500,error:err}); 
  });
}

// 生产环境下的错误处理
// 不会向用户显示堆栈信息
app.use(function(err, req, res, next) {
 res.status(err.status || 500).json({code:err.status || 500,msg:'Not Found'}); 
});

config.create(app, ()=>{
    console.log('server is runnging')
})