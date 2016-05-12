app.factory('SceneFactory', function($http){
    var parseData = res => res.data;

    return {
        addOrUpdate: function(screenplay){
        	return $http.put('/api/screenplays/' + screenplay._id, screenplay)
        	.then(parseData);
        }
    };
});