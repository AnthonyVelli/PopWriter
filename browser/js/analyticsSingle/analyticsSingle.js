

app.config(function ($stateProvider) {
    $stateProvider.state('analyticsSingle', {
        url: '/analyticsSingle/:id',
        templateUrl: 'js/analyticsSingle/analyticsSingle.html',
        controller: 'analyticsSingle',
        resolve: {
    		screenplay: (ScreenplaysFactory, $stateParams) => {
    			return ScreenplaysFactory.getOne($stateParams.id)
    			.then(screenplay => {
    				return screenplay;
    			})
    			.catch(error => console.error(error));
    		},
    		scrapedSPs: (AnalyticsFactory) => {
				return AnalyticsFactory.getScreenPlays()
				.then(screenplays => {
					return screenplays})
				.catch(error => console.error(error));
    		}
    	}
    })
 //    .state('analyticsSingle.charWeight', {
 //    	url: '/charWeight',
 //    	templateUrl: 'js/analytics/pieChart.html',
 //    	controller: function($scope, AnalyticsFactory, pieChartData) {
 //    		$scope.options = AnalyticsFactory.pieChartOptions;
 //    		$scope.data = pieChartData[0];
 //    	},
 //    	resolve: {
 //    		pieChartData: (AnalyticsFactory, $stateParams) => {
 //    			return AnalyticsFactory.getCharacters($stateParams.id)
 //    			.then(characters => characters)
 //    			.catch(error => console.error(error));
 //    		}
 //    	}
 //    })
 //    .state('analyticsSingle.charWord', {
	// 	url: '/charWord',
	// 	templateUrl: 'js/analytics/donutChart.html',
	// 	controller: function($scope, AnalyticsFactory, pieChartData) {
	// 		$scope.selectDChar = function(char){
	// 			$scope.data = $scope.dselected;
	// 		};
	// 		$scope.data;
	// 		$scope.options = AnalyticsFactory.donutChartOptions;
	// 		$scope.chars = pieChartData[1];
	// 	},
 //    	resolve: {
	// 		pieChartData: (AnalyticsFactory, $stateParams) => {
	// 			return AnalyticsFactory.getCharacters($stateParams.id)
	// 			.then(characters => characters)
	// 			.catch(error => console.error(error));
	// 		}
	//    	}
	// })
	.state('analyticsSingle.emotion', {
		url: '/emotion',
		templateUrl: 'js/analyticsSingle/lineChart.html',
		controller: function($scope, screenplay, lineChartData, AnalyticsFactory, scrapedSPs) {
			$scope.scripts = scrapedSPs;
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
				console.log($scope.otherMovieChars[$scope.selectedOtherMovieChar]);
				console.log($scope.otherMovieChars);
				console.log($scope.selectedOtherMovieChar);
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
					key: screenplay.title,
					area: true,
					values: lineChartData.sceneText
				}];
		},
		resolve: {
        	lineChartData: (AnalyticsFactory, screenplay, $stateParams) => {
       			return AnalyticsFactory.getUserSentiment(screenplay._id)
        		.then(sentiment => {
        			return sentiment;
        		})
        		.catch(error => console.error(error));
        	},
        }
        
	});
});

app.controller('analyticsSingle', function($scope, scrapedSPs, screenplay){
	$scope.currentSP = screenplay._id;
});
