angular.module('phonecatApp')

.directive('togglePhone', function(){
  return {
      restrict: 'A',
      link: function(scope, element, attrs){
        var toggleBtn = angular.el(element, '.toggle-btn'),
            toggleArea = angular.el(element, '.toggle-area');

        toggleBtn.bind('click', function(){
          if (toggleArea.css('display') !== 'none') {
            toggleArea.css('display', 'none');
            toggleBtn.val('Show');
          } else {
            toggleArea.css('display', 'block');
            toggleBtn.val('Hide');
          }
        });

      }
  };

});
