var path = require('path')
module.exports = {
    port: 9000,
    cross: true,
    whiteList: ['http://localhost:3456','htts://localhost'],
    ssl:{
        active: true,
        key: path.resolve(__dirname,'cert/yytang-key.pem'),
        certificate: path.resolve(__dirname,'cert/yytang-cert.pem')
    }
}