

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
    .state('analyticsSingle.charWeight', {
    	url: '/charWeight',
    	templateUrl: 'js/analytics/pieChart.html',
    	controller: function($scope, AnalyticsFactory, pieChartData) {
    		console.log(pieChartData);
    		$scope.options = AnalyticsFactory.pieChartOptions;
    		$scope.data = pieChartData;
    	},
    	resolve: {
    		pieChartData: (AnalyticsFactory, $stateParams) => {
    			return AnalyticsFactory.getUserCharacters($stateParams.id)
    			.then(characters => characters)
    			.catch(error => console.error(error));
    		}
    	}
    })
    .state('analyticsSingle.charWord', {
		url: '/charWord',
		templateUrl: 'js/analyticsSingle/donutChart.html',
		controller: function($scope, AnalyticsFactory, pieChartData) {
			$scope.selectDChar = function(){
				console.log($scope.dselected);
				$scope.data = $scope.dselected;
			};
			$scope.data;
			$scope.options = AnalyticsFactory.donutChartOptions;
			$scope.chars = pieChartData;
		},
    	resolve: {
			pieChartData: (AnalyticsFactory, $stateParams) => {
				return AnalyticsFactory.getUserCharacters($stateParams.id)
				.then(characters => characters)
				.catch(error => console.error(error));
			}
	   	}
	})
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
