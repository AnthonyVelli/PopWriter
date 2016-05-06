app.directive('scenes', function ($state) {

    return {
        restrict: 'E',
        scope: {
            screenplay: '=' 
        },
        templateUrl: 'js/scenes/scenes.html',
        link: function (scope) {
            // on click change scene shown in editor
            // on drag change scenes array order and persist to backend db
        }
    };

});