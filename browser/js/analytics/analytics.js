

app.config(function ($stateProvider) {
    $stateProvider.state('analytics', {
        url: '/analytics',
        templateUrl: 'js/analytics/analytics.html',
        controller: 'analytics'
    })
    .state('analytics.pieChart', {
    	url: '/pieChart/:id',
    	templateUrl: 'js/analytics/pieChart.html',
    	controller: ($scope, pieChartData) => {
    		$scope.options = pieChartOptions;
    		$scope.data = pieChartData[0];
    	},
    	resolve: {
    		pieChartData: (AnalyticsFactory, $stateParams) => {
    			return AnalyticsFactory.getCharacters($stateParams.id)
    			.then(characters => characters)
    		}
    	}
    })
    .state('analytics.donutChart', {
		url: '/donutChart/:id',
		templateUrl: 'js/analytics/donutChart.html',
		controller: ($scope, pieChartData) => {
			$scope.data;
			$scope.selectChar = char => {
				$scope.data = $scope.selected.words;
			}
			$scope.options = donutChartOptions
			$scope.chars = pieChartData[1];
		},
    	resolve: {
			pieChartData: (AnalyticsFactory, $stateParams) => {
				return AnalyticsFactory.getCharacters($stateParams.id)
				.then(characters => characters)
			}
	   	}
	})
    .state('analytics.horizontalChart', {
		url: '/horizontalChart',
		templateUrl: 'js/analytics/horizontalChart.html'
    })
	.state('analytics.multiBarChart', {
		url: '/multiBarChart/:id',
		templateUrl: 'js/analytics/barChart.html',
		controller: ($scope, multiBarChartData) => {
			$scope.options = barChartOptions
			$scope.data = barChartData
		},
		resolve: {
			barChartData: (AnalyticsFactory, $stateParams) => {
				console.log($stateParams)
				return AnalyticsFactory.getSentiment($stateParams.id)
				.then(info => console.log(info))
			}
		}
	})
	.state('analytics.lineChart', {
		url: '/lineChart/:id',
		templateUrl: 'js/analytics/lineChart.html',
		controller: function($scope, lineChartData) {
				$scope.options = lineChartOptions
				$scope.data = lineChartData
		},
		resolve: {
        	lineChartData: (AnalyticsFactory, $stateParams) => {
       			return AnalyticsFactory.getSentiment($stateParams.id)
        		.then(sentiment => {
        			console.log(sentiment)
					var sentimentHolder = [{
						color: "#337ab7",
						key: "Sentiment",
						values: sentiment.sceneText
					}, {
						color: "#EEA9B8",
						key: "BROWN",
						values: sentiment.BROWN
					}]
					return sentimentHolder;
				})
        	}
        }
	})
});

app.controller('analytics', function($scope, ScreenplaysFactory, AnalyticsFactory){

		AnalyticsFactory.getScreenPlays()
		.then(screenplays => $scope.scripts = screenplays)
		$scope.changeSP = (spId) => $scope.currentSP = spId;

		// $scope.donutChartOptionsToggle = () => {
		// 	$scope.options = donutChartOptions;
		// 	$scope.data = pieData;
		// };

		// $scope.horizontalChartOptionsToggle = () => {
		// 	$scope.options = horizontalChartOptions
		// 	$scope.data = someData;
		// }

		$scope.barChartOptionsToggle = () => {
			$scope.options = barChartOptions
			$scope.data = generateData();
		}
    });

