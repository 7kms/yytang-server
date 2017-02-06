module.exports = function (app) {
    app.use('/public', require('../routes/public'))
    app.use('/user', require('../routes/user'))


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
        res.status(err.status || 500).json(err); 
    });
}