angular.module('phonecatApp')

.controller('PhoneIndexCtrl', function ($scope, $state, $stateParams, indexOfByID, phoneResource, msgHandler) {

	init();

	phoneResource.get().then(function(response){
		$scope.phones = response.data.data;
	});

	$scope.editPhone = function(phone){
		phoneResource.update(phone).then(function(response){
			if (response.data.status === 'fail') {
				// failllll someone do something
			}
		});
	};

	$scope.removePhone = function(phone){
		phoneResource.delete(phone).then(function(response){
			if (response.data.status === 'fail') {
				// failllll someone do something
			}
		});
	};

	$scope.getDetail = function(phone){
		$state.go('phones', {id: phone.id});
	};

	function init(){
		var handlers = {
			newPhone: function(scope, phone){
				scope.phones.push(phone);
			},
			deletePhone: function(scope, phone){
				var target = indexOfByID(phone, scope.phones)[0];
				scope.phones.splice(target, 1);
			},
			updatePhone: function(scope, phone){
				var target = indexOfByID(phone, scope.phones)[0];
				scope.phones[target] = phone;
			}
		};
		$scope.editState = true;
		msgHandler(['new-phone', 'delete-phone', 'update-phone'], handlers, $scope);
	}

})

.controller('PhoneNewCtrl', function ($scope, $http, isValid, phoneResource) {

	$scope.isValid = isValid;

	$scope.submitNewPhone = function(){
		// talk to rails server
		var phone = {name: $scope.name, snippet: $scope.snippet};
		phoneResource.new(phone).then(function(response){
			if (response.data.status === 'fail') {
				// failllll someone do something
			}
		});
	};

});
