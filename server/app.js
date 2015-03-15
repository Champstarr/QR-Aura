var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config');
var routes = require('./routes');

app.use(express.static(__dirname + "/../public"));//points to static files to simplify pathing
app.use(bodyParser.urlencoded({extended: true})); //send through body-parser function for cleaner formatting
app.use ('/', routes);

var server = app.listen (3000, function(){
  var host = server.address().address;
  var port = server.address().port;
});