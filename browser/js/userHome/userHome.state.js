

app.config($stateProvider => {
	$stateProvider.state('userHome', {
		url: '/userhome',
		templateUrl: 'js/userhome/userhome.html',
		controller: 'UserhomeCtrl',
		resolve: {
			user: (AuthService) => {
				return AuthService.getLoggedInUser();
			}
		}
	})
	.state('userHome.settings', {
		url: '/settings',
		templateUrl: 'js/userhome/usersetting.html'
	})
	.state('userHome.screenplays', {
		url: '/screenplays',
		templateUrl: 'js/userhome/userscreenplays.html'
	});
})

app.controller('UserhomeCtrl', ($scope, $http, user, UserFactory) => {
	$scope.user = user;
	console.log($scope.user)
	$scope.save = () => {
		UserFactory.updateUser($scope.user._id, $scope.user)
		.then(updatedUser => {
			$scope.user = updatedUser;
			console.log("updated User info")
		})
	}
})

