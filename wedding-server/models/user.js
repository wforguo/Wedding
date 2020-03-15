let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let userSchema = new Schema({
    userId: String,
    userName: String,
    userPwd: String,
    userIp: String,
    userTime: String,
    userAvatar: String,
    userRoles: Array,
});

module.exports = mongoose.model('User', userSchema, 'wedd_users');
