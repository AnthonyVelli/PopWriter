app.factory('ScreenplaysFactory', function($http){
    var parseData = res => res.data;

    return {
        getOne: function(id){
            return $http.get('/api/screenplays/' + id)
            .then(parseData);
        },
        getAllByUser: function(userId) {
        	return $http.get('/api/users/' + userId + '/screenplays/')
        	.then(parseData);
        },
        addOne: function(userId, screenplay){
        	return $http.post('/api/users/' + userId + '/screenplays/', screenplay)
        	.then(parseData);
        },
        updateScreenplay: function(screenplayId, screenplay){
            return $http.put('/api/screenplays/' + screenplayId, screenplay)
            .then(parseData);
        }
    };
});
