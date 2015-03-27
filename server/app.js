var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


app.set('views', './views'); //where templates are stored, templted ill be interpreted by ejs
app.set('view engine', 'ejs'); // setting view engine to the ejs library 
app.use(express.static(__dirname + "/../public"));//points to static files to simplify pathing
app.use(express.static(__dirname + "/../bower_components"));
app.use(bodyParser.urlencoded({extended: true})); //send through body-parser function for cleaner formatting
var routes = require('./routes');
app.use ('/', routes);

var server = app.listen (3000, function(){
  var host = server.address().address;
  var port = server.address().port;
});

//route to show contact @ ID
