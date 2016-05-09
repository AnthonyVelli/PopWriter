app.directive('scenes', function ($state) {

    return {
        restrict: 'E',
        scope: {
            screenplay: '=' 
        },
        templateUrl: 'js/scenes/scenes.html',
        controller: 'ScenesCtrl',
        link: function (scope) {
            scope.scenes = screenplay.scenes;
            // on click change scene shown in editor
            // on drag change scenes array order and persist to backend db
        }
    };

});

app.controller('ScenesCtrl', function($scope, $state){
    $scope.scenes = screenplay.scenes;
})