app.config($stateProvider => {
    $stateProvider.state('editor', {
        url: '/editor/:id',
        templateUrl: '/js/editor/editor.html',
        controller: 'EditorController'
    });
})
.controller('EditorController', ($scope, ScreenplaysFactory, $stateParams) => {

    ScreenplaysFactory.getOne($stateParams.id)
    .then(screenplay => {
        $scope.screenplay = screenplay;
    })

})
