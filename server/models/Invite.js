/**
 * @Description: 婚礼信息
 * @author: forguo
 * @date: 2020/7/11
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    theme: String, // 婚礼注意
    startTime: String, // 开始时间
    endTime: String, // 结束时间
    location: Object, // 位置信息
    speech: String, // 致辞
    groomName: String, // 新郎姓名
    brideName: String, // 新娘姓名
    groomMobile: String, // 新郎手机
    brideMobile: String, // 新娘手机
    createTime: String, //
    updateTime: String, //
});

module.exports = mongoose.model('Invite', userSchema, 'wedd_invite');
