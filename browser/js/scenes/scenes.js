app.directive('scenes', function ($state) {

    return {
        restrict: 'E',
        templateUrl: 'js/scenes/scenes.html',
        controller: 'ScenesCtrl'
    };
});

app.controller('ScenesCtrl', function($scope, SceneFactory, $state, ScreenplaysFactory, EditorFactory){
    var draggingElements = document.getElementsByClassName('scene');
    $scope.showform = false;
    $scope.showForm = function() {
        $scope.showform = true;
    };
    $scope.hideForm = function() {
        $scope.showform = false;
    };
    // $scope.addNewScene = function (screenplay, newscene){

// **** ngDraggable DRAG AND DROP **** //
    $scope.onDropComplete = function (screenplay, newIdx, oldIdx){
        var valToMove = screenplay.scenes.splice(oldIdx, 1)[0];
        screenplay.scenes.splice(newIdx, 0, valToMove);
        $scope.text = EditorFactory.scriptify(screenplay);
        ScreenplaysFactory.updateScreenplay(screenplay._id, screenplay)
        .then(savedScreenplay => {
            console.log('screenplay saved!');
        })
    };

});
