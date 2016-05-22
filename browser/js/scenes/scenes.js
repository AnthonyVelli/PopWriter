app.directive('scenes', function () {

    return {
        restrict: 'E',
        templateUrl: 'js/scenes/scenes.html',
        controller: 'ScenesCtrl'
    };
});

app.controller('ScenesCtrl', function($scope, SceneFactory, $state, ScreenplaysFactory, EditorFactory, CharacterFactory){

    var draggingElements = document.getElementsByClassName('scene');
    
    $scope.showform = false;

    $scope.editScenesShow = {};

    function setEditScenesShow (screenplay) {
        screenplay.scenes.forEach(function(elem){
            $scope.editScenesShow[elem._id] = false;
        });
        console.log("editScenesShow", $scope.editScenesShow);
    }
    setEditScenesShow($scope.screenplay);

    $scope.toggleShowScenesForm = function(sceneId) {
        $scope.editScenesShow[sceneId] = !$scope.editScenesShow[sceneId];
    };

    $scope.submitEditScene = function (screenplay, editscene, sceneId){
        screenplay.scenes.forEach(function(elem){
            if(elem._id === sceneId) {
                elem.header = editscene.header;
                elem.synopsis = editscene.synopsis;
            }
        });

        ScreenplaysFactory.updateScreenplay(screenplay._id, screenplay)
        .then(savedScreenplay => {
            $scope.toggleShowScenesForm();
        });
    };

    //save characters backstory
    $scope.submitCharacter = function(character) {
        console.log(character);
        CharacterFactory.updateOne(character._id, {backstory: character.backstory})
        .then(()=> console.log('updated character'));
    }

// **** ngDraggable DRAG AND DROP **** //
    $scope.onDropComplete = function (screenplay, newIdx, oldIdx){
        var valToMove = screenplay.scenes.splice(oldIdx, 1)[0];
        screenplay.scenes.splice(newIdx, 0, valToMove);
        $scope.text = EditorFactory.scriptify(screenplay).screenplay;
        ScreenplaysFactory.updateScreenplay(screenplay._id, screenplay)
        .then(savedScreenplay => {
            console.log('screenplay saved!');
        });
    };

});
