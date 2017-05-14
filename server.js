const mongoose = require('mongoose')
const config = require('./config')
const fs = require('fs')
const path = require('path')
const modelDir = path.join(__dirname, 'app/models')
var app = require('express')()



const nuggets = require('./routes/nuggets');

// nuggets.getUser().then(res=>{
//   let arr = [];
//   res.results.forEach(comment =>{
//       let cId = comment.objectId;
//       let uId = comment.user.objectId;
//       let obj = {cId,uId};
//       console.log({cId,uId});
//       arr.push(obj)
//   })
//   fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(arr),(err)=>{
//     if(!err){
//       console.log('保存成功');
//     }else{
//       console.log(err);
//     }
//   })
// },err=>{
//   console.log(err);
// })
var str = fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8');
var arr = JSON.parse(str).slice(0, 80);
// var count = arr.length;
var count = 0

function like() {

    nuggets.like(arr[count]).then(res => {
        if (!res.error) {
            console.log('评论成功');
        } else {
            console.log(res.error);
        }
        count++;
        if (count < arr.length) {
            like();
        }
    }, err => {
        console.log(err);
    })
}
like();

// // Bootstrap models
// fs.readdirSync(modelDir)
//   .filter(file => ~file.search(/^[^\.].*\.js$/))
//   .forEach(file => require(path.join(modelDir, file)));

// config.express(app);
// config.routes(app);





// connect()
//   .on('error', console.log)
//   .on('disconnected', ()=>{
//     listen()
//     console.log('connect error')
//   })
//   .once('open', listen);

// function listen () {
//   config.create(app, ()=>{
//       console.log('server is runnging')
//   })
// }

// function connect () {
//   // var options = { server: { socketOptions: { keepAlive: 1 } } };
//   let config = {
//     db: 'mongodb://127.0.0.1/tq'
//   };
//   var options = {
//     db: { native_parser: true },
//     server: { poolSize: 5 },
//     user: 'tanqiang',
//     pass: '111111'
//   };
//   return mongoose.connect(config.db, options).connection;
// }