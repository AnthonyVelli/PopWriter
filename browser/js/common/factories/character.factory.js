

app.factory('CharacterFactory', ($http) => {
    return {
        saveAll: (characters) => {
            return $http.post('/api/character/', characters)
            .then(res => res.data );
        }
    };
});
