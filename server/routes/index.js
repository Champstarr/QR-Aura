var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../config');
var fs = require('fs');

mongoose.connect(config.databaseURI);

router.get('/',function(req,res){
  res.render(__dirname + "/../../public/index.html");
});

router.get('/contact', function(req,res){
  mongoose.model('contact').find(function(err, contacts){
    res.send(contacts);
  });
});

fs.readdirSync(__dirname + '/../models').forEach(function(filename){
  if (~filename.indexOf('.js')) require(__dirname + '/../models/' + filename);
});

var Contact = mongoose.model('contact');
router.post('/', function(req,res){
  var contact = new Contact(req.body);
  contact.save(function(err,contact){
    if (err){
      throw err;
    }
    res.redirect('/');
  });
  console.log(contact);
});

module.exports = router;