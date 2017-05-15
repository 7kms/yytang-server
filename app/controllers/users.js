// const author = require('../middlewares/authority')
// const nuggets = require('../../routes/nuggets')
const resData = require('../../util/resData')
const mongoose = require('mongoose')
const co = require('co')
const User = mongoose.model('User')

exports.create = async function(userInfo) {
    const user = new User(userInfo);
    return await user.save();
}

exports.update = co.wrap(function*(_id, conditionObj) {
    if (typeof conditionObj != 'object') return false;
    try {
        var info = yield User.update(_id, conditionObj);
        return {
            code: 200,
            info
        }
    } catch (error) {
        return { code: 500, error }
    }
})

exports.load = async function(conditionObj) {
    if (typeof conditionObj != 'object') {
        return await Promise.reject();
    }
    return await User.load(conditionObj);
}

exports.isExists = async function(conditionObj) {
    if (typeof conditionObj != 'object') {
        return await Promise.reject();
    }
    return await User.load(conditionObj);
}
exports.login = async function({ email, password }) {
    if (typeof email != 'string') {
        return await Promise.reject();
    }
    try {
        let user = await User.load({ email });
        return await user.authenticate(password);
    } catch (error) {
        return await Promise.reject(error);
    }
}