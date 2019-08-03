let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let albumSchema = new Schema({
  id: String,
  url: String,
  desc: String,
  time: String
});

module.exports = mongoose.model('Album', albumSchema, 'wedd-album');
