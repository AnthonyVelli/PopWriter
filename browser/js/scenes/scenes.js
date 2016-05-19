app.directive('scenes', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/scenes/scenes.html',
        controller: 'ScenesCtrl'
    };
});

app.controller('ScenesCtrl', function($scope, SceneFactory, $state, ScreenplaysFactory){
    var draggingElements = document.getElementsByClassName('scene');
    $scope.showform = false;
    $scope.toggleShowForm = function() {
        $scope.showform = !$scope.showform;
    };
    
    $scope.submitEditScene = function (screenplay, editscene, sceneId){

        // modify screenplay with new editscene data, then send entire screenplay to server
        console.log("screenplay in submit edits", screenplay);
        console.log("editscene._id", sceneId);
        console.log("editscene.header", editscene.header, "editscene.synopsis", editscene.synopsis);
        screenplay.scenes.forEach(function(elem){
            console.log("elem._id", elem._id, "elem.header", elem.header, "elem.synopsis", elem.synopsis);
            // if(elem._id === sceneId) {
            //     elem.header = editscene.header;
            //     elem.synopsis = editscene.synopsis;
            // }
        });

        // ScreenplaysFactory.updateScreenplay(screenplay._id, screenplay)
        // .then(savedScreenplay => {
        //     console.log('screenplay saved!', savedScreenplay);
        // })

    };

// **** ngDraggable DRAG AND DROP **** //
    $scope.onDropComplete = function (screenplay, newIdx, oldIdx){
        var valToMove = screenplay.scenes.splice(oldIdx, 1)[0];
        screenplay.scenes.splice(newIdx, 0, valToMove);
        $scope.text = scriptify(screenplay);
        ScreenplaysFactory.updateScreenplay(screenplay._id, screenplay)
        .then(savedScreenplay => {
            console.log('screenplay saved!');
        })
    };

});
