app.config(function ($stateProvider) {
    $stateProvider.state('analytics', {
        url: '/analytics',
        templateUrl: 'js/analytics/analytics.html'
    });
});

app.controller('analytics', function($scope, AnalyticsFact){

});