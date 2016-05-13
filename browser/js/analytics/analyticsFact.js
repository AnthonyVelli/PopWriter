app.factory('AnalyticsFactory', ($http) => {
	const parseData = res => res.data;
	return {
		getScreenPlays: () => {
			return $http.get('/api/analytics')
			.then(parseData)
		},
		getSentiment: (id) => {
			return $http.get('/api/analytics/' + id)
			.then(parseData)
		},
		getCharacters: (id) => {
			return $http.get('/api/analytics/' + id + "/characters")
			.then(parseData)
		}
	}
});