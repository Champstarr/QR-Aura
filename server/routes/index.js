var express = require('express'); //using this framework
var router = express.Router(); //Object provided by express
var mongoose = require('mongoose'); //making use of mongoose library
var config = require('../config'); //requiring the congig.json file
var fs = require('fs'); //requiring core library 'fs'
var sendMail = require('../sendmail');

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


router.get('/contact/:id', function(req,res){ //pass contacts into template
  Contact.findById(req.params.id, function(err, contact){
    console.log(contact);
    res.render("static", {contact: contact}); //passing in contact to "static"
    sendMail('darkauradolphin@gmail.com', contact.email, "Your Model Has Been Found", contact.comments);
  });
});

router.get('/qrurl/:id', function(req,res){
  res.render('qrcode', {id: req.params.id, ip: config.ip});
});


router.post('/', function(req,res){
  var contact = new Contact(req.body);
  contact.save(function(err,contact){
    console.log(contact.id);
    if (err){
      throw err;
    }
    res.redirect('/qrurl/' + contact.id); // '/' back to the root
  });
  console.log(contact);
});

module.exports = router;

//to render on a page
//need a template rendering engine to show contact info dynamically.
//'id' is changing, that the dybamic aspect of this pahse of the project