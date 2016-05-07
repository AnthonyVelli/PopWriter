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
    });

    $scope.components = ['Header', 'Action', 'Character', 'Dialogue'];
    if(!$scope.comp) $scope.comp = $scope.components[0];

    $scope.clickMe = () => {
        // console.log($scope.text);
        // console.log($scope.comp);
        // console.log($scope.position.get);
    };

    $scope.type = (event) => {
        // console.log(event.code);
        var compArray = $scope.components;
        var nextIdx = $scope.components.indexOf($scope.comp) + 1;
        if(event.code === 'Tab'){
            event.preventDefault();
            if(!compArray[nextIdx]) nextIdx = 0;
            $scope.comp = compArray[nextIdx];
        }
    };

})
