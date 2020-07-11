/**
 * @Description: 留言祝福
 * @author: forguo
 * @date: 2020/7/11
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    openId: String,
    userId: String,
    gender: String,
    city: String,
    province: String,
    country: String,
    avatarUrl: String,
    nickName: String,
    userAvatar: String,
    message: String,
    updateTime: String,
});

module.exports = mongoose.model('Msg', userSchema, 'wedd_msgs');
