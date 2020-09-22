/**
 * @Description: 甜蜜相册
 * @author: forguo
 * @date: 2020/7/11
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Activity = new Schema({
    id: String,
    title: String,
    detail: String,
    banner: String,
    logo: String,
    address: String,
    limit: Number,
    status: Number,
    userCount: Number,
    createUser: String,
    createTime: Date,
    updateTime: Date,
    startTime: Date,
    endTime: Date,
});

module.exports = mongoose.model('Activity', Activity, 'activity_list');
