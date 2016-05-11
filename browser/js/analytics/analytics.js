

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
});

app.controller('analytics', function($scope){
	
		$scope.pieChartOptionsToggle = () => {
			$scope.options = pieChartOptions
		};

		$scope.donutChartOptionsToggle = () => {
			$scope.options = donutChartOptions
		};

		$scope.horizontalChartOptionsToggle = () => {
			$scope.options = horizontalChartOptions
		};

		$scope.barChartOptionsToggle = () => {
			$scope.options = barChartOptions
		};
       // $scope.options = {
       //      chart: {
       //          type: 'pieChart',
       //          height: 500,
       //          x: function(d){return d.key},
       //          y: function(d){return d.y},
       //          showLabels: true,
       //          duration: 500,
       //          labelThreshold: 0.01,
       //          labelSunbeamLayout: true,
       //          legend: {
       //              margin: {
       //                  top: 5,
       //                  right: 35,
       //                  bottom: 5,
       //                  left: 0
       //              }
       //          }
       //      }
       //  };

        $scope.data = [
            {key: "One",y: 5},
            {key: "Two",y: 2},
            {key: "Three",y: 9},
            {key: "Four",y: 7},
            {key: "Five",y: 4},
            {key: "Six",y: 3},
            {key: "Seven",y: .5}
        ];
    });

