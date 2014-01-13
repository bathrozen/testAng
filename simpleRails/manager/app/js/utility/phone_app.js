angular.module('phonecatApp')

.filter('search', function(){
	return function(data, text){
    if (!data) { return; }
    return data.filter(function(data){
      if (!text || data.name.toLowerCase().indexOf(text) > -1) { return true; }
    });
  };
})

.factory('newDetail', function($http){
  return function(newDetail){
    return $http.post('/api/details', newDetail);
  };
})

.constant('detail', function($http, $stateParams){
  return $http.get('api/phones/'+$stateParams.id);
})

.factory('indexOfByID', function(){
  return function(value, array){
    if (!value.id || array.constructor.name !== 'Array') { return; }
    return array.reduce(function(memo, current, idx){
      if (current.id == value.id) { memo.push(idx); }
      return memo;
    },[]);
  };
})

.factory('isValid', function(){
  return function(text){
    return !text ? null : text;
  };
})

.factory('angularSocket', function($rootScope){
  var socket = io.connect('http://127.0.0.1:4000',{
    'sync disconnect on unload': true });
  socket.emit('join');
  return socket;
});

angular.el = function e(element, selector) {
  var elem = element.bind !== undefined ? element[0] : element;
  return angular.element(elem.querySelectorAll(selector));
};
