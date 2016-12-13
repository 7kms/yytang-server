const setting = require('./setting')
var fs = require('fs');
function setup (ssl) {
   if (ssl && ssl.active) {
      return {
         key  : fs.readFileSync(ssl.key,'utf8'),
         cert : fs.readFileSync(ssl.certificate,'utf8')
      };
   }
}
function start (app, options) {
   if (options){
      return require('https').createServer(options, app);
   }
   return require('http').createServer(app);
}
module.exports = {
   create: function (app, cb) {
      var options = setup(setting.ssl);
      return start(app, options).listen(setting.port, ()=>{
          console.log(`server is running at port ${setting.port}`)
          cb && cb()
      });
   },
   setting
}