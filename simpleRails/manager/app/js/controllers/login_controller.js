angular.module('phonecatApp')

.controller('LoginCtrl', function ($scope, $rootScope, fbAdaptor) {

	$scope.isLogin = true;
	$rootScope.userData = fbAdaptor($scope);
	console.log('$roooooot', $rootScope.userData);

});