/**
 * @Description: 甜蜜相册
 * @author: forguo
 * @date: 2020/7/11
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let Photo = new Schema({
  id: String,
  avatar: String,
  desc: String,
  createTime: String,
  updateTime: String,
});

module.exports = mongoose.model('Photo', Photo, 'wedd_photos');
