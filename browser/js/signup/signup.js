

app.config($stateProvider => {
	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: 'js/signup/signup.html',
		controller: 'SignupCtrl'
	});
})

app.controller('SignupCtrl', ($scope, AuthService, $state, UserFactory) => {

	$scope.signup = {};
	$scope.error = null;

	$scope.sendSignup = (signupInfo) => {
		$scope.error = null; 

		UserFactory.createUser(signupInfo)
		.then(() => {
			AuthService.login(signupInfo)
			.then(() => $state.go('userHome'))
			.catch(() => $scope.error = 'Invalid signup credentials.')
		})
	}
})

