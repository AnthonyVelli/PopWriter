

app.config(function ($stateProvider) {
    $stateProvider.state('analytics', {
        url: '/analytics',
        templateUrl: 'js/analytics/analytics.html',
        controller: 'analytics',
        resolve: {
			scrapedSPs: (AnalyticsFactory) => {
				return AnalyticsFactory.getScreenPlays()
				.then(screenplays => {
					return screenplays})
				.catch(error => console.error(error));
    		}
    	}
    })
    .state('analytics.pieChart', {
    	url: '/pieChart/:id',
    	templateUrl: 'js/analytics/pieChart.html',
    	controller: function($scope, AnalyticsFactory, pieChartData) {
    		console.log(pieChartData);
    		$scope.options = AnalyticsFactory.pieChartOptions;
    		$scope.data = pieChartData[0];
    	},
    	resolve: {
    		pieChartData: (AnalyticsFactory, $stateParams) => {
    			return AnalyticsFactory.getCharacters($stateParams.id)
    			.then(characters => characters)
    			.catch(error => console.error(error));
    		}
    	}
    })
    .state('analytics.donutChart', {
		url: 'donutChart/:id',
		templateUrl: 'js/analytics/donutChart.html',
		controller: function($scope, AnalyticsFactory, pieChartData) {
			console.log(pieChartData);
			$scope.selectDChar = function(char){
				$scope.data = $scope.dselected;
			};
			$scope.data;
			$scope.options = AnalyticsFactory.donutChartOptions;
			$scope.chars = pieChartData[1];
		},
    	resolve: {
			pieChartData: (AnalyticsFactory, $stateParams) => {
				return AnalyticsFactory.getCharacters($stateParams.id)
				.then(characters => characters)
				.catch(error => console.error(error));
			}
	   	}
	})
	.state('analytics.lineChart', {
		url: '/lineChart/:id',
		templateUrl: 'js/analyticsSingle/lineChart.html',
		controller: function($scope, lineChartData, AnalyticsFactory) {
			$scope.chars = lineChartData;
			$scope.options = AnalyticsFactory.lineChartOptions;
			$scope.data = [{
					color: "#337ab7",
					key: $scope.$parent.selectedmovie.name,
					area: true,
					values: lineChartData.sceneText
				}];
			$scope.selectChar = function(){
				$scope.data.push({
					color: "hsl(" + Math.random() * 360 + ",100%,50%)",
					key: $scope.$parent.selectedmovie.name,
					values: $scope.chars[$scope.selected]
				});
			};
			$scope.selectOtherMovie = () => {
				AnalyticsFactory.getSentiment($scope.selectedmovie._id)
				.then(sentiment => {
					$scope.otherMovieChars = sentiment;
					$scope.data.push({
					color: "hsl(" + Math.random() * 360 + ",100%,50%)",
					key: $scope.selectedmovie.name,
					values: sentiment.sceneText});
				});
			};
			$scope.selectOtherMovieChar = () => {
				$scope.data.push({
				color: "hsl(" + Math.random() * 360 + ",100%,50%)",
				key: $scope.selectedOtherMovieChar,
				values: $scope.otherMovieChars[$scope.selectedOtherMovieChar]});
			};
		},
		resolve: {
        	lineChartData: (AnalyticsFactory, $stateParams) => {
       			return AnalyticsFactory.getSentiment($stateParams.id)
        		.then(sentiment => sentiment)
        		.catch(error => console.error(error));
        	}
        }
	});
});

app.controller('analytics', function($scope, ScreenplaysFactory, scrapedSPs, AnalyticsFactory){
    $scope.scripts = scrapedSPs;
    $scope.changeSP = () => $scope.currentSP = $scope.selectedmovie._id;
    $scope.sentimentChart = () => {
    	AnalyticsFactory.getSentiment($scope.currentSP)
    	.then(lineChartData => {
    		$scope.data = [{
    			color: "#337ab7",
				key: $scope.selectedmovie.name,
				area: true,
				values: lineChartData.sceneText
    		}];
    		$scope.options = AnalyticsFactory.lineChartOptions; })
    	.catch(error => console.error(error));
    };
    $scope.charWeightChart = () => {
    	AnalyticsFactory.getCharacters($scope.currentSP)
    	.then(pieChartData => {
    		$scope.data = pieChartData[0];
    		$scope.options = AnalyticsFactory.pieChartOptions; })
    	.catch(error => console.error(error));
    };
    $scope.wordDistroChart = () => {
    	AnalyticsFactory.getCharacters($scope.currentSP)
    	.then(pieChartData => {
    		$scope.data = pieChartData[1];
    		$scope.options = AnalyticsFactory.pieChartOptions; })
    	.catch(error => console.error(error));
    };
})
.directive('chart', function() {
  return {
  	restrict: 'E',
    templateUrl: '/js/analyticsSingle/lineChart.html',
    scope: {
    	data: '=',
    	options: '='
    }

  };
});