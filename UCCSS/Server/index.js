//var express = require('express');

//var app = express();

//app.get('/', function(req,res){
//	res.send('Hello World!');
//});

//app.listen(3500); // Port#

//--------------------------- env PORT or pass a static Port#
//var express = require('express');

//var app = express();
// looks for a PORT  variable set in the environmental variables or assigns 3000 to the Port

//app.set('port', process.env.PORT || 3000);

//app.get('/',function(req,res){
//	res.send('Hello World!');
//});

//app.listen(app.get('port'), function(){
//	console.log('Express started on http://localhost:' + app.get('port'));
//});

// ------------------------------------
//with middleware code
//----------------After creating the express.js , a lot of this code is moved to it and there will be
// minimum code here. so this below code is commented out.
//var http = require('http');
//var express = require('express');
//var path = require ('path'); //static server

//var app = express();
//path normalize will fin path to the dirname, find the public folder in the current project folder.
//app.use(express.static(path.normalize(__dirname) + '/public')); // needs to be before routes

//middleware - id the request ip address and console.log it.
//The placement of the middleware code is pretty imp. It can't be after the below app.get()
//app.use(function(req, res, next){
  //console.log('Request from ' + req.ip);
  //next();
//});

//if we have a static webserver , this below section will not be shown since it hots the static first.
//app.get('/',function(req,res){
//	res.send('Hello World!');
//});
//routes to be added before the 404 code
//app.get('/about', function(req, res){
//	res.send('About Us!');
//});
//app.get('/about/directions', function(req, res){
//	res.send('About Us! and directions');
//});

//error handling - slide 20 should be right before creating the server.
//app.use(function(req, res){
//	res.type('text/plan');
//	res.status(404);
//	res.send('Page not found');
//});

//app.use(function(err, req, res, next){
//	console.error(err.stack);
//	res.type('text/plan');
//	res.status(500);
//	res.send('500 Sever Error');
//});



// creating the server 
//http.createServer(app).listen(3000, function(){
//	console.log('Express server listening on port ' + 3000);
//})


var express = require('express');
var config = require('./config/config');

var logger = require ('./config/logger');

var app = express();
//var port = process.env.port || 3000;

require('./config/express')(app, config);

require('http').createServer(app).listen(config.port, function () {
	logger.log('info',"HTTP Server listening on port: %d, in %s mode", config.port, app.get('env'));
});


module.exports = app;