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

    $scope.clickMe = () => {
        console.log($scope.tinymceModel);
    }

    $scope.tinymceOptions = {
          menu: {
            file: {title: 'File', items: 'newdocument'},
            edit: {title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall'},
            insert: {title: 'Insert', items: 'link media | template hr'},
            view: {title: 'View', items: 'visualaid'},
            format: {title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
            table: {title: 'Table', items: 'inserttable tableprops deletetable | cell row column'},
            tools: {title: 'Tools', items: 'spellchecker code'}
          },
          min_height: 400
    };

})
