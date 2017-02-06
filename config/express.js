const setting = require('./setting')
var cors = require('cors')
var session = require('express-session')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

module.exports = function (app) {
    if(setting.cross) {
        app.use(cors({
            credentials: true,
            origin: function(origin, callback) {
                if(origin){
                    var originIsWhitelisted = setting.whiteList.indexOf(origin) !== -1;
                    callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
                }else{
                    callback(null, true);
                }
            }
        }))
    }

    app.use(cookieParser())
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(bodyParser.json()); // for parsing application/json

    // Use the session middleware 
    app.use(session({ 
        secret: 'yytang-server',
        resave: false,
        rolling: true,
        saveUninitialized: true,
        cookie: { maxAge: 15*60*1000 }
    }))
}