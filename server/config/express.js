var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');


module.exports = function (app, config) {
	function compile(str, path) {
		return stylus(str) 
			.set('filename', path)
			.set('compress', true)
	}

	app.set('views', config.rootPath + '/server/views');
	app.set('view engine', 'jade');
	app.use(logger('dev'));
	app.use(cookieParser());
	app.use(bodyParser.json({extended: true}));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(session({
		secret: 'multi vision unicorns',
		resave: false,
		saveUninitialized: false
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(stylus.middleware({
		src: config.rootPath + '/public',
		compile: compile
	}));
	app.use(express.static(config.rootPath + '/public'));

};

