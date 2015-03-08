var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/../public"));//points to static files to simplify pathing
app.use(bodyParser.urlencoded({extended: true})); //send through body-parser function for cleaner formatting

app.get('/',function(req,res){
  res.render(__dirname + "/../public/index.html");
})

var server = app.listen (3000, function(){
  var host = server.address().address
  var port = server.address().port
})