app.directive('scenes', function ($state) {

    return {
        restrict: 'E',
        templateUrl: 'js/scenes/scenes.html',
        controller: 'ScenesCtrl'
    };
});

app.controller('ScenesCtrl', function($scope, SceneFactory, $state){
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
        // newIdx - index of drop location element
        // oldIdx - index of dragged object

        var valToMove = screenplay.scenes.splice(oldIdx, 1)[0];
        screenplay.scenes.splice(newIdx, 0, valToMove);
        console.log("screenplay after splices: ", screenplay);
        $scope.text = scriptify(screenplay);
        // SceneFactory.addOrUpdate(screenplay)
        // .then(function(updatedScreenplay) {
        //      console.log("Yeah!  The screenplay was updated.");
        // });

    };

});
