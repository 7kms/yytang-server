'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const crypto = require('crypto');
var uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

/**
 * User Schema
 */

const UserSchema = new Schema({
    mobile: { type: String, default: '' },
    name: { type: String, default: '', trim: true },
    hashed_password: { type: String, default: '' },
    email: { type: String, required: true, trim: true, unique: true },
    createTime: { type: Date, default: Date.now },
    updateTime: { type: Date, default: Date.now },
    salt: { type: String, default: '' }
});
UserSchema.plugin(uniqueValidator);

/**
 * validation
 */

// UserSchema.path('mobile').validate(value => {
//   return /^(1[3,5,7,8])\d{9}$/i.test(value);
// },'Invalid mobile')

UserSchema.path('email').validate(value => {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/i.test(value);
}, 'Invalid email')

/**
 * Virtuals
 */

UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });


/**
 * Methods
 */

UserSchema.methods = {

    /**
     * Authenticate - check if the passwords are the same
     *
     * @param {String} plainText
     * @return {Boolean}
     * @api public
     */

    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },


    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */

    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },
    /**
     * Encrypt password
     *
     * @param {String} password
     * @return {String}
     * @api public
     */

    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }

};

UserSchema.statics = {
    load(conditionObj) {
        return new Promise((resolve, reject) => {
            this.findOne(conditionObj).exec(function(err, user) {
                if (err) {
                    reject(err);
                }
                resolve(user);
            });
        })
    }
}

/**
 * Pre-save hook
 */

// UserSchema.pre('save', true, function (next, done) {
//   next();

// });
mongoose.model('User', UserSchema);