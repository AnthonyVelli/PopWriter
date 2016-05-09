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
    var editor = document.getElementById('editor');

    $scope.components = ["header","action", "character", "dialogue"];

    $scope.save = () => {
        console.log(editor);
    }

    $scope.type = function(event) {
        console.log(event.code);
        if(event.code === 'tab') {
            event.preventDefault();
        }
    }


})
