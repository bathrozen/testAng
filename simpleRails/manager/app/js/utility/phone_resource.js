angular.module('phonecatApp')

.factory('phoneResource', function($http, angularSocket, $rootScope){
	var phoneRes = {},
		userID = $rootScope.userData.id;

	phoneRes.get = function(){
		return $http.get('/api/phones');
	};

	phoneRes.new = function(phone){
		var data = {phone: phone, sessionID: angularSocket.socket.sessionid, userID: userID};
		return $http.post('/api/phones', data);
	};

	phoneRes.update = function(phone){
		var data = {phone: phone, sessionID: angularSocket.socket.sessionid, userID: userID};
		return $http.put('/api/phones/'+phone.id, data);
	};

	phoneRes.delete = function(phone){
		return $http.delete('/api/phones/'+phone.id+'?sessionID='+angularSocket.socket.sessionid+'&userID='+userID);
	};

	return phoneRes;
});