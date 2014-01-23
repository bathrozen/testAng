angular.module('phonecatApp')

.factory('fbAdaptor', function($http, $rootScope, currentUser){

  return function(scope){
    facebookAuthen(scope, currentUser);
  };

  function facebookAuthen(scope){

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '420575864742428',
        status     : true,
        cookie     : true,
        xfbml      : true
      });

      FB.Event.subscribe('auth.authResponseChange', function(response) {
        if (response.status === 'connected') {
          getData(currentUser);
        } else if (response.status === 'not_authorized') {
          FB.login();
        } else {
          FB.login();
        }
      });
    };

    (function(d){
      var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement('script'); js.id = id; js.async = true;
      js.src = "//connect.facebook.net/en_US/all.js";
      ref.parentNode.insertBefore(js, ref);
    }(document));

    function getData(currentUser) {

      FB.api('/me', function(response) {
        scope.$apply(function(){
          scope.isLogin = true;
          currentUser.facebookID = response.id;
          currentUser.name = response.name;
        });
        appLogin(response);

      });

      function appLogin(user){
        $http.get('/phones?facebookID='+user.id+'&name='+user.name);
      }
    }
  }

})

.factory('getFaceobookImage', function(){
  return function(id){
    return['http://graph.facebook.com/', id,
      '/picture','?type=small&redirect=false'].join('');
  };
});