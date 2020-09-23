/**
 * @Description: 成员
 * @author: forguo
 * @date: 2020/9/22
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Member = new Schema({
    actId: String,
    formData: Object,
    createTime: Date,
    updateTime: Date,
});

module.exports = mongoose.model('Member', Member, 'activity_member');
