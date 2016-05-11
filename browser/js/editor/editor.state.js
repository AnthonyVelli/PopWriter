app.config($stateProvider => {
    $stateProvider.state('editor', {
        url: '/editor/:id',
        templateUrl: '/js/editor/editor.html',
        controller: 'EditorController',
        resolve: {
        	ResolvedScreenplay: function(ScreenplaysFactory, $stateParams) {
        		 return ScreenplaysFactory.getOne($stateParams.id)
    				.then(screenplay => {
    					return screenplay;
    				});
    			}
    		
    		}
    });
})
.controller('EditorController', ($scope, ResolvedScreenplay, ScreenplaysFactory, $stateParams) => {
	$scope.screenplay = ResolvedScreenplay;


  

});
