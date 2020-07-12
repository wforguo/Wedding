/**
 * @Description: 甜蜜相册
 * @author: forguo
 * @date: 2020/7/11
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Photo = new Schema({
    id: String,
    url: String,
    desc: String,
    createTime: String,
});

module.exports = mongoose.model('Photo', Photo, 'wedd_photos');
