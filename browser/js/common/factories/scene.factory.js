app.factory('SceneFactory', function($http){
    var parseData = res => res.data;

    return {
        addOne: function(script){
        	return $http.post('/api/scenes', scene)
        	.then(parseData);
        }
    };
});