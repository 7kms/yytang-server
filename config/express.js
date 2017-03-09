const setting = require('./setting')
var cors = require('cors')
var session = require('express-session')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var formidable = require('formidable')
var util = require('util')
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
                //  callback(null, true);
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
    app.post('/upload',function(req, res){
        console.log('comming')
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            res.writeHead(200, {'content-type': 'text/plain'});
            res.write('received upload:\n\n');
            res.end(util.inspect({fields: fields, files: files}));
        });
    })
}