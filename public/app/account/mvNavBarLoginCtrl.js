angular.module('app')
	.controller('mvNavBarLoginCtrl', function($scope, $http) {
		$scope.signIn = function(username, password) {
			$http.post('/login', {
				username: username,
				password: password
			}).then(function(response) {
				console.log(response);
				if (response.data.success) {
					console.log('logged in')
				} else {
					console.log('failed')
				}
			})
		}
	});