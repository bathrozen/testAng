angular.module('phonecatApp')
.controller('DetailShowCtrl', function($scope, $stateParams, detail, newDetail, angularSocket){

	init();

	$scope.submitNewDetail = function(){
		var data = {snippet: $scope.detailField, phone_id: $stateParams.id};
		newDetail(data).then(function(response){
			if (response.data.status === 'fail') {
				// failllll someone do something
			}
		});
	};

	$scope.toggleAddingState = function(){
		$scope.addingState = !$scope.addingState;
	};

	$scope.shouldDisplayAddBtn = function(){
		if (!$scope.details) { return true; }
		return $scope.isPhoneDeleted && $scope.details.length;
	};

	$scope.$on('delete-phone', function(evt, id){
		if ($stateParams.id == id){
			$scope.$apply(function(){
				$scope.details = [{snippet: 'phone has been deleted'}];
			});
		}
		$scope.isPhoneDeleted = true;
	});

	angularSocket.on('new-detail', function(data){
		$scope.$apply(function(){
			addDetail(JSON.parse(data));
		});
	});

	angularSocket.on('delete-phone', function(data){
		parsed = JSON.parse(data);
		if ($stateParams.id == parsed.id){
			$scope.$apply(function(){
				$scope.details = [{snippet: 'phone has been deleted'}];
			});
		}
		$scope.isPhoneDeleted = true;
	});

	function addDetail(detail){
		if ($stateParams.id == detail.phone_id){ $scope.details.push(detail); }
	}

	function deletedPhone(id){
		if ($stateParams.id == phone.id){
			$scope.details = [{snippet: 'phone has been deleted'}];
		}
		$scope.isPhoneDeleted = true;
	}

	function init(){
		$scope.details = detail.data.data;
		$scope.addingState = false;
		$scope.isPhoneDeleted = false;
	}

});
