// const author = require('../middlewares/authority')
// const nuggets = require('../../routes/nuggets')
const resData = require('../../util/resData')
const mongoose = require('mongoose')
const co = require('co')
const User = mongoose.model('User')

exports.create = co.wrap(function* (req, res){
    const user = new User(req.body);
    try {
        // user.password = req.body.password;
        yield user.save();
        res.status(200).json(resData(200, req.body));
    } catch (error) {
        res.status(500).send(error);
    }
})