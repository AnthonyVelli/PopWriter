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
        addOne: function(userId, script){
        	console.log("addone  in factory", userId, script);
        	return $http.post('/api/users/' + userId + '/screenplays/', script)
        	.then(parseData);
        }

    };
});
