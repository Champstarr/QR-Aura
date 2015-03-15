var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  comments: String
});

mongoose.model('contact', contactSchema);