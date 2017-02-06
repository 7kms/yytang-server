const mongoose = require('mongoose')
const config = require('./config')
const fs = require('fs')
const path = require('path')
const modelDir = path.join(__dirname,'app/models')
var app = require('express')()

// Bootstrap models
fs.readdirSync(modelDir)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(path.join(modelDir, file)));

config.express(app);
config.routes(app);

connect()
  .on('error', console.log)
  .on('disconnected', ()=>{
    console.log('connect error')
  })
  .once('open', listen);

function listen () {
  config.create(app, ()=>{
      console.log('server is runnging')
  })
}

function connect () {
  // var options = { server: { socketOptions: { keepAlive: 1 } } };
  let config = {
    db: 'mongodb://127.0.0.1/tq'
  };
  var options = {
    db: { native_parser: true },
    server: { poolSize: 5 },
    user: 'tanqiang',
    pass: '111111'
  };
  return mongoose.connect(config.db, options).connection;
}