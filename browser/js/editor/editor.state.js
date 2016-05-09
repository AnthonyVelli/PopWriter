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


    $scope.save = () => {
        console.log($scope.text);
    }

    $scope.type = function(event) {
        if(event.code === 'tab') {
            event.preventDefault();
        }
    }


})
