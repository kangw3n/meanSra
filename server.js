var express = require('express');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var env = process.env.NODE_ENV || 'development';
var config = require('./server/config/config')[env];
var mongoose = require('mongoose');

require('./server/config/express')(app, config); // express middleware
require('./server/config/mongoose')(config); //database connection

var User = mongoose.model('User');

passport.use(new LocalStrategy(function (username, password, done) {
	User.findOne({
		userName: username
	}).exec(function (err, result) {
		console.log(result);
		if (result) {
			return done(null, username);
		} else {
			return done(null, false);
		}
	})
}));

passport.serializeUser(function (user, done) {
	if (user) {
		done(null, user);
	}
});

passport.deserializeUser(function (id, done) {
	User.findOne({
		_id: id
	}).exec(function (err, user) {
		if (user) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	})
});

require('./server/config/routes')(app);


app.listen(config.port, function () {
	console.log('Server is Running');
});