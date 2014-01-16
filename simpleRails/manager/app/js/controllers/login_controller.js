angular.module('phonecatApp')

.controller('LoginCtrl', function ($scope, fbAdaptor) {

	$scope.isLogin = false;
	fbAdaptor();

});