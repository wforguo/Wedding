let mongoose = require('mongoose');
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
    updateTime: String,
    userAvatar: String,
    userRoles: Array,
    userStatus: Number,
    userDesc: String,
    currentAuthority: String
});

module.exports = mongoose.model('User', userSchema, 'wedd_users');
