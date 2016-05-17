

app.config($stateProvider => {
	$stateProvider.state('userHome', {
		url: '/usersettings',
		templateUrl: 'js/userHome/usersetting.html',
		controller: 'UserhomeCtrl',
		resolve: {
			user: (AuthService) => {
				return AuthService.getLoggedInUser();

			}
		}
	});
});


app.controller('UserhomeCtrl', ($scope, $http, user, UserFactory) => {
	$scope.user = user;
	$scope.save = () => {
		UserFactory.updateUser($scope.user._id, $scope.user)
		.then(updatedUser => {
			$scope.user = updatedUser;
			console.log("updated User info");
		});
	};
	$scope.cat = "Hello friend!";
});

