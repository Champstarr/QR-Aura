var express = require('express'); //using this framework
var router = express.Router(); //Object provided by express
var mongoose = require('mongoose'); //making use of mongoose library
var config = require('../config'); //requiring the congig.json file
var fs = require('fs'); //requiring core library 'fs'

//load all files in models directory
fs.readdirSync(__dirname + '/../models').forEach(function(filename){
  if (~filename.indexOf('.js')) require(__dirname + '/../models/' + filename);
});
var Contact = mongoose.model('contact');
//creating connection
mongoose.connect(config.databaseURI); //telling mongoose to connect to this URL in config.json

router.get('/',function(req,res){
  res.render(__dirname + "/../../public/index.html");//Rendering the html file from our current directory
});

router.get('/contact', function(req,res){
  mongoose.model('contact').find(function(err, contacts){
    res.send(contacts);
  });
});

router.get('/contact/:id', function(req,res){ //pass contacts into template
  Contact.findById(req.params.id, function(err, contact){
    console.log(contact);
    res.render("static", {contact: contact}); //passing in contact to "static"
  });
});


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

router.get('/qrcode/:');

module.exports = router;

//to render on a page
//need a template rendering engine to show contact info dynamically.
//'id' is changing, that the dybamic aspect of this pahse of the project