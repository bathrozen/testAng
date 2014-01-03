angular.module('phonecatApp')

.directive('autoFocus', function(){
  return {
      restrict: 'A',
      link: function(scope, element, attrs){

        var myElement = angular.element(element)[0];
        myElement.focus();

      }
  };

});
