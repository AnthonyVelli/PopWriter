

app.config($stateProvider => {
	$stateProvider.state('userHome', {
		url: '/screenplays',
		templateUrl: 'js/userHome/screenplay.html',
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
	.state('screenplay.settings', {
		url: '/settings',
		templateUrl: 'js/userHome/usersetting.html'
	})
	.state('screenplay.screenplays', {
		url: '/screenplays',
		templateUrl: 'js/userHome/userscreenplays.html'
	})
	.state('screenplay.screenplays.add', {
		url: '/screenplays/add',
		templateUrl: 'js/userHome/usersscreenplaysadd.html'
	});
});


app.controller('UserhomeCtrl', ($scope, $http, user, UserFactory, theScreenplays, ScreenplaysFactory, SceneFactory) => {
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
        var sceneId;
        SceneFactory.createScene({header: 'Start writing your screenplay here'})
        .then(createdScene => {
            sceneId = createdScene._id;
            screenplay.scenes = [createdScene._id];
            return ScreenplaysFactory.addOne(id, screenplay)
        })
        .catch(console.error.bind(console));
	}
});

