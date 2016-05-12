

app.config(function ($stateProvider) {
    $stateProvider.state('analytics', {
        url: '/analytics',
        templateUrl: 'js/analytics/analytics.html',
        controller: 'analytics'
    })
    .state('analytics.pieChart', {
    	url: '/pieChart',
    	templateUrl: 'js/analytics/pieChart.html'
    })
    .state('analytics.barChart', {
		url: '/barChart',
		templateUrl: 'js/analytics/barChart.html'
    })
    .state('analytics.horizontalChart', {
		url: '/horizontalChart',
		templateUrl: 'js/analytics/horizontalChart.html'
    })
	.state('analytics.donutChart', {
		url: '/donutChart',
		templateUrl: 'js/analytics/donutChart.html'
	})
	.state('analytics.lineChart', {
		url: '/lineChart',
		templateUrl: 'js/analytics/lineChart.html'
	})
});

app.controller('analytics', function($scope){
	
		$scope.pieChartOptionsToggle = () => {
			$scope.options = pieChartOptions;
			$scope.data = pieData;
		}; 

		$scope.donutChartOptionsToggle = () => {
			$scope.options = donutChartOptions;
			$scope.data = pieData;
		};

		$scope.horizontalChartOptionsToggle = () => {
			$scope.options = horizontalChartOptions
			$scope.data = someData;
		}

		$scope.barChartOptionsToggle = () => {
			$scope.options = barChartOptions
			$scope.data = generateData();
		}

		$scope.lineChartOptionsToggle = () => {
			$scope.options = lineChartOptions
			$scope.data = sinAndCos();
		}
    });

