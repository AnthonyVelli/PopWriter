

app.config($stateProvider => {
	$stateProvider.state('userHome', {
		url: '/userHome',
		templateUrl: 'js/userHome/userhome.html',
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
		templateUrl: 'js/userHome/usersetting.html'
	})
	.state('userHome.screenplays', {
		url: '/screenplays',
		templateUrl: 'js/userHome/userscreenplays.html'
	})
	.state('userHome.screenplays.add', {
		url: '/screenplays/add',
		templateUrl: 'js/userHome/usersscreenplaysadd.html'
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
	$scope.cat = "Hello friend!";
	$scope.addNewScreenplay = function (id, screenplay) {
		console.log("controller addScreenplay");
		console.log(id, screenplay);
		ScreenplaysFactory.addOne(id, screenplay)
		.then(function(screenplay){
			console.log("screenplay was created:", screenplay);
			return screenplay;
		});
	}
});

