angular.module('phonecatApp')

.factory('phoneResource', function($http, angularSocket, $rootScope){
	var phoneRes = {};

	phoneRes.get = function(){
		return $http.get('/api/phones');
	};

	phoneRes.new = function(phone, user){
		var data = {phone: phone, sessionID: angularSocket.socket.sessionid, userID: user.id};
		return $http.post('/api/phones', data);
	};

	phoneRes.update = function(phone, user){
		var data = {phone: phone, sessionID: angularSocket.socket.sessionid, userID: user.id};
		return $http.put('/api/phones/'+phone.id, data);
	};

	phoneRes.delete = function(phone, user){
		return $http.delete('/api/phones/'+phone.id+'?sessionID='+angularSocket.socket.sessionid+'&userID='+user.id);
	};

	return phoneRes;
});