

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
		controller: ($scope, barChartData) => {
			$scope.data = barChartData;
			$scope.options = {
				chart: {
            type: 'multiBarChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 45,
                left: 45
            },
            clipEdge: true,
            staggerLabels: true,
            duration: 500,
            stacked: true,
            xAxis: {
                axisLabel: 'Character',
                showMaxMin: false,
                tickFormat: function(d){
                    var label = $scope.data[0].values[d].label;
                    return label;
                }
            },
            yAxis: {
                axisLabel: 'Y Axis',
                axisLabelDistance: -20,
                tickFormat: function(d){
                    return d3.format(',.1f')(d);
                }
            }
        }
        }
			console.log(barChartData)
			
		},
		resolve: {
			barChartData: (AnalyticsFactory, $stateParams) => {
				return AnalyticsFactory.getSentiment($stateParams.id)
				.then(info => {

					var negative = {key: 'negative', values: []};
					var positive = {key: 'positive', values: []};
					var beastLord = [negative, positive];
					console.log("IM INFO")
					var keys = Object.keys(info);
					for (var x = 0; x < keys.length; x++) {
						if (keys[x] === 'sceneText') {
							continue;
						}
						beastLord[0].values.push({x: x, label: keys[x], y: info[keys[x]].reduce((orig,scene) => {
							return orig += scene.sentiment.negative.length
						}, 0)});
						beastLord[1].values.push({x: x, label: keys[x], y: info[keys[x]].reduce((orig,scene) => {
							return orig += scene.sentiment.positive.length
						}, 0)});
					}
					console.log(beastLord);
					return beastLord;

				});
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

		// $scope.horizontalChartOptionsToggle = () => {
		// 	$scope.options = horizontalChartOptions
		// 	$scope.data = someData;
		// }

		// $scope.barChartOptionsToggle = () => {
		// 	$scope.options = barChartOptions
		// 	console.log(generateData())
		// 	$scope.data = generateData();
		// }
    });

