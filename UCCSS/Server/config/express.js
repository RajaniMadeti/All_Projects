var express = require('express');
var morgan = require('morgan');
var logger = require('./logger');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var glob = require('glob');
var cors = require('cors');



module.exports = function (app, config) {

    logger.log('info', "Loading Mongoose functionality");
    mongoose.Promise = bluebird;
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', function () {
        throw new Error('unable to connect to database at ' + config.db);
    });


    app.use(cors({ origin: 'http://localhost:9000' }));

    app.use(function (req, res, next) {
        logger.log('info', 'Request from ' + req.connection.remoteAddress);
        next();
    });

    if (process.env.NODE_ENV !== 'test') {
        app.use(morgan('dev'));

        mongoose.set('debug', true);
        mongoose.connection.once('open', function callback() {
            logger.log('info', 'Mongoose connected to the database');
        });


        app.use(function (req, res, next) {
            logger.log('Request from ' + req.connection.remoteAddress, 'info');
            next();
        });
    }


    //app.use(morgan('dev'));

    //app.use(bodyParser.urlencoded({
    //    extended: true
    //    }));

    app.use(bodyParser.json());

    app.use(express.static(config.root + '/public'));

    // //for testing begin
    // var users = [{ name: 'John', email: 'woo@hoo.com' },
    // { name: 'Betty', email: 'loo@woo.com' },
    // { name: 'Hal', email: 'boo@woo.com' }
    // ];

    // app.get('/api/users', function (req, res) {
    //     res.status(200).json(users);
    // });
    // for testing end


    //require('../app/controllers/users')(app, config);

    var models = glob.sync(config.root + '/app/models/*.js');
    models.forEach(function (model) {
        require(model);
    });

    var controllers = glob.sync(config.root + '/app/controllers/*.js');
    controllers.forEach(function (controller) {
        require(controller)(app, config);
    });

    //This below code was for demo, so comment that out 
    //app.get('/willwork', 
    //function(req, res, next){
    //	res.set('X-One','One');
    //	next();
    //},
    //function(req, res, next){
    //		res.set('X-Two','Two');
    //		next();
    //	},
    //	function(req, res){
    //		res.send("Three");
    //	}
    //);

    app.use(function (req, res) {
        // logger.log('error', 'File not found');
        res.type('text/plan');
        res.status(404);
        res.send('404 Not Found');
    });

    // app.use(function (err, req, res, next) {
    //     console.error(err.stack); //leave this one to capture database errors etc
    //     res.type('text/plan');
    //     res.status(500);
    //     res.send('500 Sever Error');
    // });


    app.use(function (err, req, res, next) {
        console.log(err);
        if (process.env.NODE_ENV !== 'test') logger.log(err.stack, 'error');
        res.type('text/plan');
        if (err.status) {
            res.status(err.status).send(err.message);
        } else {
            res.status(500).send('500 Sever Error');
        }
    });

    logger.log('info', "Starting application");

};


