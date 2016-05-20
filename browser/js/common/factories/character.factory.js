

app.factory('CharacterFactory', ($http) => {
    return {
        saveAll: (characters) => {
            return $http.post('/api/character/', characters)
            .then(res => res.data );
        },
        getAll:(spId) => {
            return $http.get('/api/character/' + spId)
            .then(res => res.data);
        }
    };
});
