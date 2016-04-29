var express = require('express');
var stylus = require('stylus');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var env = process.env.NODE_ENV  || 'development';
var port = process.env.PORT || 3030;

function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.set('compress', true)
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compile
}));
app.use(express.static(__dirname + '/public'));

if (env === 'development') {
	mongoose.connect('mongodb://localhost/multivision');
} else {
	mongoose.connect('mongodb://kangw3n:1234@ds021751.mlab.com:21751/multiversion');
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error.....'));
db.once('open', function () {
	console.log('connection opened...');
});


app.get('/partials/:partialPath', function (req, res) {
	res.render('partials/' + req.params.partialPath);
});

app.get("*", function (req, res) {
	res.render('index');
});

app.listen(port, function () {
	console.log('Server is Running');
});