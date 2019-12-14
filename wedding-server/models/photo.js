let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let Photo = new Schema({
  id: String,
  url: String,
  desc: String,
  time: String
});

module.exports = mongoose.model('Photo', Photo, 'wedd_photos');
