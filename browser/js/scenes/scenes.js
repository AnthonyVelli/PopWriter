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

app.controller('ScenesCtrl', function($scope, SceneFactory, $state){
    $scope.showform = false;
    $scope.showForm = function() {
        $scope.showform = true;
    };
    $scope.hideForm = function() {
        $scope.showform = false;
    };
    $scope.addNewScene = function (screenplay, newscene){
        console.log("newscene", newscene);
        screenplay.scenes.push(newscene);
        SceneFactory.addOne(screenplay)
        .then(function(updatedScreenplay) {
            console.log("updatedScreenplay", updatedScreenplay);
            console.log($scope.screenplay);
            // be sure to save data in editor before updating editor state
            $state.go('editor', {id: screenplay._id});
        });
        $scope.showform = false;

    };
});