

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
    .state('analytics.charWeight', {
    	url: '/charWeight/:id',
    	templateUrl: 'js/analytics/pieChart.html',
    	controller: function($scope, AnalyticsFactory, pieChartData) {
            $scope.hidden = true;
    		$scope.options = AnalyticsFactory.pieChartOptions;
    		$scope.data = pieChartData;
    	},
    	resolve: {
    		pieChartData: (AnalyticsFactory, $stateParams) => {
    			return AnalyticsFactory.getCharacters($stateParams.id)
    			.then(characters => characters)
    			.catch(error => console.error(error));
    		}
    	}
    })
    .state('analytics.charWord', {
		url: '/charWord/:id',
		templateUrl: 'js/analytics/donutChart.html',
		controller: function($scope, AnalyticsFactory, pieChartData) {
            $scope.hidden = true;
			$scope.selectDChar = function(char){
				$scope.data = $scope.dselected;
			};
			// $scope.data;
			$scope.options = AnalyticsFactory.donutChartOptions;
			$scope.chars = pieChartData;
		},
    	resolve: {
			pieChartData: (AnalyticsFactory, $stateParams) => {
				return AnalyticsFactory.getCharacters($stateParams.id)
				.then(characters => characters)
				.catch(error => console.error(error));
			}
	   	}
	})
	.state('analytics.emotion', {
		url: '/emotion/:id',
		templateUrl: 'js/analytics/lineChart.html',
		controller: function($scope, lineChartData, AnalyticsFactory) {
			$scope.hidden = true;
			console.log('in emotion controller');
			console.log($scope);
            $scope.selectOtherMovie = () => {
            	console.log($scope);
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
			$scope.selectChar = function(){
				$scope.data.push({
					color: "hsl(" + Math.random() * 360 + ",100%,50%)",
					key: $scope.selected,
					values: $scope.chars[$scope.selected]
				});
			};
			$scope.chars = lineChartData;
			$scope.options = AnalyticsFactory.lineChartOptions;
			$scope.data = [{
					color: "#337ab7",
					key: $scope.selectedScreenplay.name,
					area: true,
					values: lineChartData.sceneText
				}];
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
    $scope.changeSP = (spId) => {
    	console.log($scope.selectedScreenplay);
    	$scope.currentSP = $scope.selectedScreenplay._id};
	$scope.scripts = scrapedSPs;
});
