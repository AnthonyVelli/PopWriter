

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
			$scope.options = donutChartOptions
			// console.log(pieChartData[1][0])
			$scope.data = pieChartData[1];
			pieChartData[1].forEach(objOfChar => {
				console.log(objOfChar);
				if(objOfChar.character === $scope.selectedCharacter){
					$scope.data = objOfChar.words;
				}
			})
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
	.state('analytics.barChart', {
		url: '/barChart',
		templateUrl: 'js/analytics/barChart.html'
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
					var sentimentHolder = [{
						color: "#337ab7",
						key: "Sentiment",
						values: sentiment.sceneText
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

		$scope.horizontalChartOptionsToggle = () => {
			$scope.options = horizontalChartOptions
			$scope.data = someData;
		}

		$scope.barChartOptionsToggle = () => {
			$scope.options = barChartOptions
			$scope.data = generateData();
		}
    });

