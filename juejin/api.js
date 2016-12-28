var config = require('./config');
var crypto = require('crypto');
var https = require('https');
var querystring = require('querystring');
var headers = {
      'X-LC-Id': config.applicationId,
      'X-LC-Sign': sign(config.applicationKey)
  };
var baseOptions = {
  hostname: 'api.leancloud.cn',
  port: 443,
  path: '/1.1/classes/Entry',
  method: 'GET',
  headers: headers
};
function sign(key) {
    var timestamp = Date.now()
    var md5 = crypto.createHash('md5');
    md5.update(timestamp + key);
    var signature = md5.digest('hex')+ ',' + timestamp
    return signature
}
function get(path, params){    
    path += '?' + querystring.stringify(params)
    var opt = Object.assign({}, baseOptions, {method:'GET',path:path});
    var promise = new Promise((resolve, reject)=>{
        var sendPromise = sendData(opt);
        sendPromise.then(data =>{
            resolve(data);
        },error =>{
            reject(error);
        })
    });
    return promise;
}

function post(path, params){
    path += '?' + querystring.stringify(params)
    var opt = Object.assign({}, baseOptions, {method:'POST',path:path});
    var promise = new Promise((resolve, reject)=>{
        var sendPromise = sendData(opt);
        sendPromise.then(data =>{
            resolve(data);
        },error =>{
            reject(error);
        })
    });
    return promise;
}

function sendData(opt){
    var promise = new Promise((resolve,reject)=>{
        var req = https.request(opt, res => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
            var data = '';
            res.on('data', (d) => {
                data += d;
            });
            res.on('end',()=>{
                resolve(JSON.parse(data));
            })
        });
        req.on('error', (e) => {
            reject(e);
        });
        req.end();
    })
    return promise;
}

module.exports = {
    get: get,
    post: post
}