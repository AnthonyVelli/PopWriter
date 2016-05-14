app.factory('AnalyticsFactory', ($http) => {
	const parseData = res => res.data;
	return {
		getScreenPlays: () => $http.get('/api/analytics').then(parseData),
		getSentiment: (id) => $http.get('/api/analytics/' + id + '/emotion').then(parseData),
		getCharacters: (id) => $http.get('/api/analytics/' + id + "/wordcount").then(parseData)
	}
});