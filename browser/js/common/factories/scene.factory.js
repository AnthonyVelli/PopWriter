app.factory('SceneFactory', function($http){
    var parseData = res => res.data;

    return {
        addOrUpdate: function(screenplay){
        	return $http.put('/api/scenes/' + screenplay._id, screenplay)
        	.then(parseData);
        },
        createScene: function(scene) {
            return $http.post('/api/scenes', scene)
            .then(parseData);
        }
    };
});
