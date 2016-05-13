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
.controller('EditorController', ($scope, screenplay, ScreenplaysFactory) => {
    $scope.screenplay = screenplay;
    $scope.options = mediumEditorOptions;
    $scope.text = scriptify(screenplay) || '<p class="header">START YOUR SCRIPT HERE</p>';
    $scope.components = ["header","action", "character", "dialogue"];
    $scope.selected = $scope.components[0];


    $scope.save = () => {
        var toBeSaved = textToObj($scope.text);
        ScreenplaysFactory.updateScreenplay(screenplay._id, { scenes: toBeSaved })
        .then( screenplay => {
            console.log('udpate screenplay', screenplay);
        })
    }

    $scope.type = function(event) {
        var compIdx = $scope.components.indexOf($scope.selected);
        var currentClass = $scope.components[compIdx];
        var currentElement;
        if(event.code === 'Tab') {
            currentElement = getSelectionStart();
            event.preventDefault();
            if(!$scope.components[compIdx + 1]) $scope.selected = $scope.components[0];
            else $scope.selected = $scope.components[compIdx + 1];
            currentElement.classList.remove(currentClass);
            currentElement.classList.add($scope.selected);
        } else if (event.code === 'Enter') {
            currentElement = getSelectionStart();
            setTimeout(()=> {
                currentElement = getSelectionStart();
                currentElement.removeAttribute('id');
                if(currentClass === 'header' || currentClass === 'character'){
                    $scope.selected = $scope.components[compIdx + 1];
                    currentElement.classList.remove(currentClass);
                    currentElement.classList.add($scope.selected);

                } else if(currentClass === 'dialogue') {
                    $scope.selected = $scope.components[compIdx - 1];
                    currentElement.classList.remove(currentClass);
                    currentElement.classList.add($scope.selected);
                }
                $scope.$digest();
            }, 5)
        } else if(event.code === 'Backspace') {
                currentElement = getSelectionStart();
                if(!currentElement.previousSibling && !currentElement.textContent) event.preventDefault();
            setTimeout(()=> {
                currentElement = getSelectionStart();
                $scope.selected = currentElement.classList[0];
                $scope.$digest();
            }, 5)
        }

    };

});

