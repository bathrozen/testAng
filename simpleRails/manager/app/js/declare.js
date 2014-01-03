angular.module('phonecatApp', ['ui.router'])

.config(function($stateProvider, $locationProvider) {
	$locationProvider.html5Mode(true);

	$stateProvider
		.state('phones_new', {
			templateUrl: 'phones/new.html',
			controller: 'PhoneNewCtrl',
			url: '/phones/new'})
		.state('phones', {
			templateUrl: 'phones/show.html',
			controller: 'DetailShowCtrl',
			url: '/phones/:id',
			resolve: { detail: function($http, $stateParams){
				return $http.get('/api/phones/'+$stateParams.id);
			}}
		});
});