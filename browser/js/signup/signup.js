

app.config($stateProvider => {
	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: 'js/signup/signup.html',
		controller: 'LoginCtrl'
	});
})