app.directive('scenes', function ($state) {

    return {
        restrict: 'E',
        scope: {
            screenplay: '=' 
        },
        templateUrl: 'js/scenes/scenes.html',
        controller: 'ScenesCtrl'
    };
});

app.controller('ScenesCtrl', function($scope){
    $scope.showform = false;
    $scope.showForm = function() {
        $scope.showform = true;
    };
    $scope.hideForm = function() {
        $scope.showform = false;
    };
});