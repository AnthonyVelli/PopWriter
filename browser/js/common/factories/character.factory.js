

app.factory('CharacterFactory', ($http) => {
    return {
        saveAll: (characters) => {
            return $http.post('/api/character/', characters)
            .then(res => res.data );
        },
        getAll:(spId) => {
            return $http.get('/api/character/' + spId)
            .then(res => res.data);
        },
        updateOne:(charId, char) => {
            return $http.put('/api/character/' + charId, char)
            .then(res => res.data);
        }
    };
});
