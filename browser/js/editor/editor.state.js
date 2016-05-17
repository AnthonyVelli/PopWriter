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
.controller('EditorController', ($scope, screenplay, ScreenplaysFactory, EditorFactory) => {
    $scope.screenplay = screenplay;
    $scope.sideBarScreenplay = screenplay;
    $scope.options = EditorFactory.editorOptions;
    $scope.text = scriptify(screenplay) || '<p class="header">START YOUR SCRIPT HERE</p>';
    $scope.components = ["header","action", "character", "dialogue"];
    $scope.selected = $scope.components[0];


    $scope.save = () => {
        var toBeSaved = textToObj();
        var currentElement = getSelectionStart();
        console.log(toBeSaved)
        ScreenplaysFactory.updateScreenplay(screenplay._id, { scenes: toBeSaved })
        .then( createdScreenplay => {
            $scope.sideBarScreenplay = createdScreenplay;
            console.log('udpated createdScreenplay', createdScreenplay);
            if(!currentElement.id) currentElement.id = getId(screenplay);
        });
    };

    var myEl = angular.element( document.querySelector('#scenes-bar'));

    var triangleDirection = angular.element(document.querySelector('#triangle'));

    $scope.toggleScenesML = function(event) {

        if (!myEl.hasClass('flex-hide') && event.movementX > 0) {
            // if no class 'hide' and mouse moving to right, hide scenes
            console.log("triangleDirection", triangleDirection);
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
              console.log("triangleDirection", triangleDirection);
            if(triangleDirection.hasClass('glyphicon-triangle-right')) {
                triangleDirection.removeClass('glyphicon-triangle-right');
                triangleDirection.addClass('glyphicon-triangle-left');
            }
            event.stopPropagation();
            myEl.removeClass('flex-hide');
        }
    }

    $scope.type = function(event) {
        if(event.code === 'Enter') {
            $scope.save();
        }
        EditorFactory.setScopeKeyDown(event, $scope);
    };

    $scope.click = () => {
        EditorFactory.setScopeClick($scope);
    };

});

