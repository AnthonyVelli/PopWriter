

app.config($stateProvider => {
	$stateProvider.state('screenplay', {
		url: '/screenplays',
		templateUrl: 'js/screenplays/screenplays.html',
		controller: 'ScreenplayCtrl',
		resolve: {
			user: (AuthService) => {
				return AuthService.getLoggedInUser();

			},
			theScreenplays: function(user, ScreenplaysFactory, $http) {
				return ScreenplaysFactory.getAllByUser(user._id);
			}
		}
	})
	.state('screenplay.screenplays.add', {
		url: '/screenplays/add',
		templateUrl: 'js/screenplays/usersscreenplaysadd.html'
	});
});


app.controller('ScreenplayCtrl', ($scope, $http, user, UserFactory, theScreenplays, ScreenplaysFactory) => {
	$scope.user = user;
	$scope.screenplays = theScreenplays;
	$scope.save = () => {
		UserFactory.updateUser($scope.user._id, $scope.user)
		.then(updatedUser => {
			$scope.user = updatedUser;
			console.log("updated User info");
		});
	};
	$scope.addNewScreenplay = function (id, screenplay) {
		console.log("made it");
		ScreenplaysFactory.addOne(id, screenplay)
		.then(function(screenplay){
			console.log("screenplay was created:", screenplay);
			ScreenplaysFactory.getAllByUser(id)
			.then(function(screenplays) {
				console.log("screenplays:", screenplays)
				$scope.screenplays = screenplays;
				console.log("scope screenplays after addNewScreenplay:", $scope.screenplays);
			})
			// return screenplay;
		});
	}
	$scope.cat = "Hello friend!";
	console.log("addNewScreenplay", $scope.addNewScreenplay);
});

