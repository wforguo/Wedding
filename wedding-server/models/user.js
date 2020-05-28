let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let userSchema = new Schema({
    userId: String,
    userName: String,
    userEmail: String,
    userMobile: String,
    userPwd: String,
    userIp: String,
    lastLoginIp: String,
    lastLoginTime: String,
    createTime: String,
    userAvatar: String,
    userRoles: Array,
    userStatus: Number,
    currentAuthority: String
});

module.exports = mongoose.model('User', userSchema, 'wedd_users');
