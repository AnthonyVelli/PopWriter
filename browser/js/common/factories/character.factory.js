

app.factory('CharacterFactory', ($http) => {
    return {
        saveAll: (characters) => {
            return $http.post('/api/character/', characters)
            .then(res => {
                let ret = res.data;
                console.log('returnrrrr int he factory',ret);
                return ret;
            });
        }
    };
});
