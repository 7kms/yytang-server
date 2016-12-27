// var router = require('express').Router();
var config = require('./config');
var crypto = require('crypto');
// var md5 = crypto.createHash('md5');
// var headers = {
//      "X-LC-Id": config.applicationId,
//     "Content-Type": "application/json;charset=UTF-8",
//     "X-LC-Sign": md5.update(Date.now() + config.applicationKey)
// };

var https = require('https');

var options = {
  hostname: 'api.leancloud.cn',
  port: 443,
  path: '/1.1/classes/Entry',
  method: 'GET',
  headers: {
      'X-LC-Id': config.applicationId,
      'X-LC-Sign': sign(config.applicationKey)
  }
};
function sign(key) {
    var timestamp = Date.now()
    var md5 = crypto.createHash('md5');
    md5.update(timestamp + key);
    var signature = md5.digest('hex')+ ',' + timestamp
    console.log(signature)
    return signature
}

var req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();