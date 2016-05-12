app.factory('AnalyticsFactory', ($http) => {
	const parseData = res => res.data;
	return {
		getSentiment: () => {
			console.log('called get sent');
			return $http.get('/api/analytics')
			.then(parseData)
		}
	}
});