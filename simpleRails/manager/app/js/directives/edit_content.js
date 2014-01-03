angular.module('phonecatApp')

.directive('editContent', function(){
  return {
    restrict: 'A',
    scope: {
      phone: '=phone',
      removePhone: '&removePhone',
      getDetail: '&getDetail',
      editPhone: '&editPhone',
      editState: '=editState'
    },
    link: function(scope, element, attrs, ctrl){

      scope.editState = false;

      var editBtn = angular.el(element, '.edit-btn'),
        removeBtn = angular.el(element, '.remove-btn'),
        spanField = angular.el(element, '.content-field'),
        inpField = angular.el(element, '.input-field'),
        getDetailField = angular.el(element, '.toggle-area'),

        preEdit= '';

			editBtn.bind('click', function(){
        if (getDetailField.css('display') === 'none') { return; }
        scope.$apply(function(){
          scope.editState = !scope.editState;
        });

        if(scope.editState) {
          inpField[0].focus();
          preEdit = inpField.val();
        }
			});

      inpField.bind('blur', function(evt){
        if (evt.relatedTarget.value !== 'edit') {
          scope.$apply(function(){
            scope.editState = false;
          });
        }
        inpField.val(preEdit);
        spanField.html(preEdit);
      });

      getDetailField.bind('click', function(){
        scope.getDetail()(scope.phone);
      });

      removeBtn.bind('click', function(){
        scope.removePhone()(scope.phone);
      });

      inpField.bind('keydown', function(evt){
        if (evt.which == 13) { scope.editPhone()(scope.phone); }
      });

    }
  };

});
