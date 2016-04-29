var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		db: 'mongodb://localhost/multivision',
		rootPath: rootPath,
		port: process.env.PORT || 3030
	},

	production: {
		rootPath: rootPath,
		db: 'mongodb://kangw3n:1234@ds021751.mlab.com:21751/multiversion',
		port: process.env.PORT || 80

	}
};