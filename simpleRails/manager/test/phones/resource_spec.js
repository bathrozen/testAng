describe('phonecatApp', function(){
	var returnedData = {status: 'success'},
		newPhone = copyThenExtend(returnedData, {phone: {id: 1, name: 'newPhone'}}),
		phones = [],
		phone = copyThenExtend(returnedData, {phone: {id: 1, name: 'updatedPhone'}});

	beforeEach(module('phonecatApp'));

	beforeEach(inject(function($injector) {
     $httpBackend = $injector.get('$httpBackend');
     $httpBackend.when('POST', '/api/phones').respond(newPhone);
     $httpBackend.when('GET', '/api/phones').respond(phones);
     $httpBackend.when('PUT', '/api/phones/1').respond(phone);
     $httpBackend.when('DELETE', '/api/phones/1').respond(phone);
	}));

	it('calls POST /api/phones when called new', inject(function(phoneResource){
		phoneResource.new({});
		$httpBackend.expectPOST('/api/phones');
		$httpBackend.flush();
	}));

	it('calls GET /api/phones when called get', inject(function(phoneResource){
		phoneResource.get({});
		$httpBackend.expectGET('/api/phones');
		$httpBackend.flush();
	}));

	it('calls PUT /api/phones when called update', inject(function(phoneResource){
		phoneResource.update({id: 1}, {});
		$httpBackend.expectPUT('/api/phones/1');
		$httpBackend.flush();
	}));

	it('calls DELETE /api/phones when called delete', inject(function(phoneResource){
		phoneResource.delete({id: 1});
		$httpBackend.expectDELETE('/api/phones/1');
		$httpBackend.flush();
	}));

	function copyThenExtend(copy, extend){
		extend = {data: extend};
		return angular.extend(angular.copy(copy), extend);
	}

});
