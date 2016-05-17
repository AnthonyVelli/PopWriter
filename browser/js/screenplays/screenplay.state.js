

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
		ScreenplaysFactory.addOne(id, screenplay)
		.then(function(screenplay){
			ScreenplaysFactory.getAllByUser(id)
			.then(function(screenplays) {
				$scope.screenplays = screenplays;
			});
			$scope.hideForm();
			// return screenplay;
		});
	}
	$scope.cat = "Hello friend!";

	$scope.showform = false;
	$scope.showForm = function() {
        $scope.showform = true;
    };
    $scope.hideForm = function() {
        $scope.showform = false;
    };
});

