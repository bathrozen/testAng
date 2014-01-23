angular.module('phonecatApp')

.controller('PhoneIndexCtrl', function ($scope, $state, $stateParams, $rootScope, indexOfByID, phoneResource, angularSocket, currentUser) {

	init();

	$scope.editPhone = function(phone){
		phoneResource.update(phone).then(function(response){
			if (response.data.status === 'fail') {
				// failllll someone do something
			} else {
				updatePhone(response.data.data);
			}
		});
	};

	$scope.removePhone = function(phone){
		phoneResource.delete(phone).then(function(response){
			$rootScope.$broadcast('delete-phone', response.data.data.id);
			if (response.data.status === 'fail') {
				// failllll someone do something
			} else {
				deletePhone(response.data.data);

			}
		});
	};

	$scope.getDetail = function(phone){
		$state.go('phones', {id: phone.id});
	};

	function init(){

		phoneResource.get().then(function(response){
			$scope.phones = response.data.data;
		});

		$scope.editState = true;

		$scope.$on('new-phone', function(evt, phone) {
			newPhone(phone);
		});

		angularSocket.on('new-phone', function(data){
			$scope.$apply(function(){
				newPhone(JSON.parse(data).phone);
			});
		});

		angularSocket.on('update-phone', function(data){
			$scope.$apply(function(){
				updatePhone(JSON.parse(data).phone);
			});
		});

		angularSocket.on('delete-phone', function(data){
			parsed = JSON.parse(data);
			$scope.$apply(function(){
				deletePhone(parsed);
			});
		});
	}

	function newPhone(phone){
		$scope.phones.push(phone);
	}

	function updatePhone(phone){
		var target = indexOfByID(phone, $scope.phones)[0];
		$scope.phones[target] = phone;
	}

	function deletePhone(id){
		var target = indexOfByID(id, $scope.phones)[0];
		$scope.phones.splice(target, 1);
	}

	$scope.isOwner = function(phone){
		console.log('iswoner', phone.facebookID === currentUser.facebookID);
		return phone.facebookID === currentUser.facebookID;
	};

})

.controller('PhoneNewCtrl', function ($scope, $http, $rootScope, isValid, phoneResource) {

	$scope.isValid = isValid;

	$scope.submitNewPhone = function(){
		var phone = {name: $scope.name, snippet: $scope.snippet};
		phoneResource.new(phone).then(function(response){
			if (response.data.status === 'fail') {
				// failllll someone do something
			} else {
				$rootScope.$broadcast('new-phone', response.data.data);
			}
		});
	};

});
