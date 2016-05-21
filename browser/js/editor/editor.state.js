app.config($stateProvider => {
    $stateProvider.state('editor', {
        url: '/editor/:id',
        templateUrl: '/js/editor/editor.html',
        controller: 'EditorController',
        resolve: {
            screenplay: function(ScreenplaysFactory, $stateParams){
                return ScreenplaysFactory.getOne($stateParams.id);
            }
        }
    });
})
.controller('EditorController', ($scope, screenplay, ScreenplaysFactory, EditorFactory, CharacterFactory) => {
    $scope.screenplay = screenplay;
    // assigning screenplay to another variable so that the digest happens only on the sidebar.
    $scope.sideBarScreenplay = screenplay;
    // console.log('screenplay', screenplay);
    $scope.options = EditorFactory.editorOptions;
    $scope.text = EditorFactory.scriptify(screenplay).screenplay || '<p class="header">START YOUR SCRIPT HERE</p>';
    $scope.components = ["header","action", "character", "dialogue"];
    $scope.selected = $scope.components[0];
    let arrayOfSavedCharacters = EditorFactory.scriptify(screenplay).characters;
    var myEl = angular.element( document.querySelector('#scenes-bar'));
    var triangleDirection = angular.element(document.querySelector('#triangle'));

    $scope.save = function() {
        var toBeSaved = EditorFactory.textToObj(screenplay._id);
        var currentElement = EditorFactory.getSelectionStart();
        ScreenplaysFactory.updateScreenplay(screenplay._id, { scenes: toBeSaved.scenes })
        .then( update => {
            return ScreenplaysFactory.getOne(update._id);
        })
        .then(updatedScreenplay => {
            // reassign the sidebar screenplay so it automatically adds a new scene to the draggable ones.
            $scope.sideBarScreenplay = updatedScreenplay;
            if(!currentElement.id) currentElement.id = EditorFactory.getId(updatedScreenplay);
            let filteredCharstoBeSaved = toBeSaved.characters.filter(charObj => {
                return !arrayOfSavedCharacters.includes(charObj.name);
            });
            return CharacterFactory.saveAll(filteredCharstoBeSaved)
        })
        .then(characters => {
            if(characters) {
                arrayOfSavedCharacters = arrayOfSavedCharacters.concat(characters.map(charObj => charObj.name));
            }
        })
        .catch(console.error.bind(console));
    };


    $scope.type = function(event) {
        if(event.code === 'Enter') {
            var currentElement = EditorFactory.getSelectionStart();
            $scope.save();
        }
        EditorFactory.setScopeKeyDown(event, $scope);
    };

    $scope.click = () => {
        EditorFactory.setScopeClick($scope);
    };




    $scope.toggleScenesML = function(event) {

        if (!myEl.hasClass('flex-hide') && event.movementX > 0) {
            // if no class 'hide' and mouse moving to right, hide scenes
            if(triangleDirection.hasClass('glyphicon-triangle-left')) {
                triangleDirection.removeClass('glyphicon-triangle-left');
                triangleDirection.addClass('glyphicon-triangle-right');
            }
            myEl.addClass('flex-hide');
            event.stopPropagation();

        } else if (!myEl.hasClass('flex-hide') &&
            event.movmentX <= 0) {
            event.stopPropagation();
            // if no class 'hide' and mouse moving to left, do nothing
        }
    }

    $scope.toggleScenesME = function(event) {
        if(myEl.hasClass('flex-hide') && event.movementX <= 0) {
            if(triangleDirection.hasClass('glyphicon-triangle-right')) {
                triangleDirection.removeClass('glyphicon-triangle-right');
                triangleDirection.addClass('glyphicon-triangle-left');
            }
            event.stopPropagation();
            myEl.removeClass('flex-hide');
        }
    }

});

