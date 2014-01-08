angular.module('phonecatApp')

.directive('newPhoneBehavior', function(){
  return {
    restrict: 'A',
    scope: {
			submitNewPhone: "=createNewPhone",
			isValid: "=isValid"
    },
    link: function(scope, element, attrs){

      var name = angular.el(element, '.name-input'),
				snippet = angular.el(element, '.snippet-input'),
				submitBtn = angular.el(element, '.submitBtn'),
				errorMsg = angular.el(element, '.error-message');

			submitBtn.bind('click', function(){
				if(scope.isValid(name.val()) && scope.isValid(snippet.val())) {
					scope.submitNewPhone({name: scope.name, snippet: scope.snippet});
					clearField();
				} else {
					errorMsg.text('name or snippet is blank');
				}
			});

			snippet.bind('keydown', function(evt){
				if (event.which === 13) {
					scope.$apply(function(){
						scope.submitNewPhone();
					});
					clearField();
				}
			});

			function clearField(){
				name.val('');
				snippet.val('');
				errorMsg.text('');
			}

    }
  };

});
