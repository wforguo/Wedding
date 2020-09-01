/**
 * @Description: 视频
 * @author: forguo
 * @date: 2020/7/11
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    id: String,
    src: String,
    desc: String,
    poster: String,
    createTime: String,
    updateTime: String,
    danmuList: Array //弹幕列表
});

module.exports = mongoose.model('Video', userSchema, 'wedd_video');
