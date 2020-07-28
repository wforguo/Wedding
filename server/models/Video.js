/**
 * @Description: 视频
 * @author: forguo
 * @date: 2020/7/11
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    id: String,
    url: String,
    desc: String,
    createTime: String,
    updateTime: String,
    barrage: Array //弹幕列表
});

module.exports = mongoose.model('Video', userSchema, 'wedd_video');
