var mongoose = require('mongoose');

module.exports = function(config) {
	mongoose.connect(config.db);

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error.....'));
	db.once('open', function () {
		console.log('connection opened...');
	});

	var userSchema = mongoose.Schema({
		firstName: String,
		lastName: String,
		userName: String
	});

	var User = mongoose.model('User', userSchema);

	User.find({}).exec(function(err, results) {
		if(results.length === 0 ) {
			User.create({
				firstName: 'Joe',
				lastName: 'Eames',
				userName: 'joe'
			});
			User.create({
				firstName: 'Wong',
				lastName: 'Boon',
				userName: 'kangw3n'
			});

			User.create({
				firstName: 'John',
				lastName: 'Papa',
				userName: 'john'
			}); 

		}
	})

};