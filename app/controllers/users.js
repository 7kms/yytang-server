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
        // var info = yield User.load({email: req.body.email});
        res.status(200).json(resData(200, user));
    } catch (error) {
        res.status(500).send(error);
    }
})

exports.update = co.wrap(function* (_id, conditionObj){
    if(typeof conditionObj != 'object')return false;
    try {
        var info = yield User.update(_id, conditionObj);
        return {
            code: 200,
            info
        }
    }catch (error) {
        return {code: 500, error}
    }
})

exports.load = co.wrap(function* (conditionObj){
    if(typeof conditionObj != 'object')return false;
    try {
        var user = yield User.load(conditionObj);
        return {
            code: 200,
            user
        }
    }catch (error) {
        return {code: 500, error}
    }
})