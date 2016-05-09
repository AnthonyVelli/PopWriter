app.directive('scenes', function ($state) {

    return {
        restrict: 'E',
        scope: {
            screenplay: '=' 
        },
        templateUrl: 'js/scenes/scenes.html',
        controller: 'ScenesCtrl',
        link: function (scope) {
            console.log("screenplay from directive", scope.screenplay);
            // code . . .
        }
    };

});

app.controller('ScenesCtrl', function($scope, $state, $stateParams){
    $scope.screenplay = $stateParams.screenplay;
    console.log("contrl screenplay", $scope.screenplay);
    $scope.showform = false;
    console.log("should be false", $scope.showform);
    $scope.showForm = function() {
        $scope.showform = true;
        console.log("should be true", $scope.showform);
    };
});