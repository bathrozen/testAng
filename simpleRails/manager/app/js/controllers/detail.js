angular.module('phonecatApp')
.controller('DetailShowCtrl', function($scope, $stateParams, detail, newDetail, msgHandler){

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

	function init(){
		$scope.details = detail.data.data;
		$scope.addingState = false;
		$scope.isPhoneDeleted = false;

		var handlers = {
			newDetail: function(scope, detail){
				if ($stateParams.id == detail.phone_id){ $scope.details.push(detail); }
			},
			deletePhone: function(scope, phone){
				if ($stateParams.id == phone.id){
					$scope.details = [{snippet: 'phone has been deleted'}];
				}
				$scope.isPhoneDeleted = true;
			}
		};

		msgHandler(['new-detail', 'delete-phone'], handlers, $scope);
	}

});
