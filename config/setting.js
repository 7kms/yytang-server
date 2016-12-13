var path = require('path')
module.exports = {
    port: 443,
    cross: true,
    ssl:{
        active: true,
        key: path.resolve(__dirname,'cert/yytang-key.pem'),
        certificate: path.resolve(__dirname,'cert/yytang-cert.pem')
    }
}