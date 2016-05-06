app.config($stateProvider => {
    $stateProvider.state('editor', {
        url: '/editor',
        templateUrl: '/js/editor/editor.html',
        controller: 'EditorController'
    });
})
.controller('EditorController', ($scope) => {
    //
})
