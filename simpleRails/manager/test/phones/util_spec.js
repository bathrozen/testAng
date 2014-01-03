describe('phonecatApp', function(){
	var thethingtotest = true;

	beforeEach(module('phonecatApp'));

	it('returns null when the 1st parameter doesnt have id', inject(function(indexOfByID){
			var result = indexOfByID({not_id: 2}, []);
			expect(result).toEqual(null);
		}));

	it('returns null when the 2nd parameter is not array', inject(function(indexOfByID) {
		var result = indexOfByID({id: 2}, {});
		expect(result).toEqual(null);
	}));

	it('returns indexes of matched obj', inject(function(indexOfByID){
		var	first = {id: 1},
			second = {id: 3},
			result = indexOfByID({id: 3}, [first, second]);
		expect(result).toEqual([1]);
	}));

});
