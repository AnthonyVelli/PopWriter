app.factory('SceneFactory', function($http){
    var parseData = res => res.data;

    return {
        addOne: function(script){
        	console.log("addone  in factory", scene);
        	return $http.post('/api/scenes', scene)
        	.then(parseData);
        }

    };
});