

app.factory('UserFactory', ($http) => {
	var UserFactory = {};
	var parseData = res => res.data;

	UserFactory.createUser = (body) => {
		return $http.post('/api/users/', body)
		.then(parseData);
	}

	UserFactory.updateUser = (id, body) => {
		return $http.put('/api/users/' + id, body)
		.then(parseData);
	}

	return UserFactory;
})