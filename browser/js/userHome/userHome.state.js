

app.config($stateProvider => {
	$stateProvider.state('userHome', {
		url: '/userhome',
		templateUrl: 'js/userhome/userhome.html',
		controller: 'UserhomeCtrl'
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

app.controller('UserhomeCtrl', ($scope) => {
	//
})

