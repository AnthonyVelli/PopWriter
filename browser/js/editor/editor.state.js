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
.controller('EditorController', ($scope, screenplay) => {

    $scope.options = mediumEditorOptions;
    $scope.text="<h1 class='awesome'>TITLE</h1>";

    $scope.components = ["header","action", "character", "dialogue"];
    $scope.selected = $scope.components[0];


    $scope.save = () => {
        console.log($scope.text);
    }

    $scope.type = function(event) {
        if(event.code === 'Tab') {
            var compIdx = $scope.components.indexOf($scope.selected);
            event.preventDefault();
            if(!$scope.components[compIdx + 1]) $scope.selected = $scope.components[0]
            else $scope.selected = $scope.components[compIdx + 1];
            console.log($scope.selected);
        }
    }


})
