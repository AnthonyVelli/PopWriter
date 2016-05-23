

app.config(function ($stateProvider) {
    $stateProvider.state('analytics', {
        url: '/analytics/:id',
        templateUrl: 'js/analytics/analytics.html',
        controller: 'analytics',
        resolve: {
			scrapedSPs: (AnalyticsFactory) => {
				return AnalyticsFactory.getScreenPlays()
				.then(screenplays => {
					return screenplays})
				.catch(error => console.error(error));
    		},
            screenplay: ($stateParams) => {
                if (!$stateParams.id) {
                    return null;
                } else {
                    return $stateParams.id;
                }
            },
    	}
    });
});

app.controller('analytics', function($scope, ScreenplaysFactory, screenplay, scrapedSPs, AnalyticsFactory){
    console.log(screenplay);
    $scope.currentSP = screenplay;
    $scope.selectedmovie = screenplay;
    $scope.scripts = scrapedSPs;
    $scope.changeSP = () => $scope.currentSP = $scope.selectedmovie._id;
    $scope.dataReady = false;
    $scope.chartReady = false;
    var api;
    var chartScope;
    $scope.callback = (scope, element) => {
    	console.log('ready');
    	chartScope = scope;
    	
    };
    $scope.clearData = (scope, element) => {
        $scope.selectedmovie = null;
    	$scope.dataReady = false;
    };
    
    $scope.sentimentChart = () => {
    	AnalyticsFactory.getSentiment($scope.currentSP)
    	.then(lineChartData => {
    		$scope.data = [{
    			color: "#337ab7",
				key: $scope.selectedmovie.name,
				area: true,
				values: lineChartData.sceneText
    		}];
    		$scope.options = AnalyticsFactory.lineChartOptions; 
    		$scope.dataReady = true;
    	})
    	.catch(error => console.error(error));
    };

    $scope.charWeightChart = () => {
    	AnalyticsFactory.getCharacters($scope.currentSP)
    	.then(pieChartData => {
    		$scope.data = pieChartData[0];
    		$scope.options = AnalyticsFactory.pieChartOptions; 
    		$scope.dataReady = true;
		})
    	.catch(error => console.error(error));
	};

    $scope.wordDistroChart = () => {
    	AnalyticsFactory.getWords($scope.currentSP)
    	.then(pieChartData => {
    		$scope.data = pieChartData;
    		$scope.options = AnalyticsFactory.donutChartOptions; 
    		$scope.dataReady = true;
		})
    	.catch(error => console.error(error));
    };
 
});

app.directive('chart', function() {
  return {
  	restrict: 'E',
    templateUrl: '/js/analyticsSingle/lineChart.html',
    scope: {
    	data: '=',
    	options: '=',
    	config: '=',
    	callback: '='
    }

  };
});

