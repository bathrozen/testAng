angular.module('phonecatApp')

.factory('phoneResource', function($http){
	var phoneRes = {};

	phoneRes.get = function(){
		return $http.get('/api/phones');
	};

	phoneRes.new = function(phone){
		return $http.post('/api/phones', phone);
	};

	phoneRes.update = function(phone){
		return $http.put('/api/phones/'+phone.id, phone);
	};

	phoneRes.delete = function(phone){
		return $http.delete('/api/phones/'+phone.id);
	};

	return phoneRes;
});