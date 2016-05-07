

app.config($stateProvider => {
	$stateProvider.state('userHome', {
		url: '/userhome',
		templateUrl: 'js/userhome/userhome.html',
		controller: 'UserhomeCtrl',
		resolve: {
			user: (AuthService) => {
				return AuthService.getLoggedInUser();

			},
			theScreenplays: function(user, ScreenplaysFactory, $http) {
				return ScreenplaysFactory.getAllByUser(user._id);
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
	})
	.state('userHome.screenplays.add', {
		url: '/screenplays/add',
		templateUrl: 'js/userhome/usersscreenplaysadd.html'
	});
});


app.controller('UserhomeCtrl', ($scope, $http, user, UserFactory, theScreenplays, ScreenplaysFactory) => {
	$scope.user = user;
	$scope.screenplays = theScreenplays;
	$scope.save = () => {
		UserFactory.updateUser($scope.user._id, $scope.user)
		.then(updatedUser => {
			$scope.user = updatedUser;
			console.log("updated User info");
		});
	};
	$scope.addScreenplay = (id, screenplay) => {
		console.log("controller addScreenplay");
		ScreenplaysFactory.addOne(id, screenplay)
		.then(function(screenplay){
			console.log("screenplay was created:", screenplay);
		});
	}
});

