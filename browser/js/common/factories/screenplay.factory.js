app.factory('ScreenplaysFactory', function($http){
    var parseData = res => res.data;

    return {
        getOne: function(id){
            return $http.get('/api/screenplays/' + id)
            .then(parseData);
        }
    }
})
