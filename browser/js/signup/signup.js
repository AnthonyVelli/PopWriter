

app.config($stateProvider => {
	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: 'js/signup/signup.html',
		controller: 'SignupCtrl'
	});
})

app.factory('UserFactory', ($http) => {
	var UserFactory = {};
	var parseData = res => res.data;

	UserFactory.createUser = (body) => {
		console.log(body)
		return $http.post('/api/users/', body)
		.then(parseData);
	}

	return UserFactory;
})

app.controller('SignupCtrl', ($scope, AuthService, $state, UserFactory) => {

	$scope.signup = {};
	$scope.error = null;

	$scope.sendSignup = (signupInfo) => {
		$scope.error = null; 

		UserFactory.createUser(signupInfo)
		.then(() => {
			AuthService.login(signupInfo)
			.then(() => $state.go('home'))
			.catch(() => $scope.error = 'Invalid signup credentials.')
		})
	}
})

