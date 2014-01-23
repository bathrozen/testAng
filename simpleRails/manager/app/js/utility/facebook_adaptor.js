angular.module('phonecatApp')

.factory('fbAdaptor', function($http, $rootScope, currentUser){

  return function(scope){
    facebookAuthen(scope);
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
          getData();
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

    function getData() {

      FB.api('/me', function(response) {

        appLogin(response);

        scope.$apply(function(){
          scope.isLogin = true;
        });

        return getUserData(response);
      });

      function getUserData(rawData){
        var picturePath = ['http://graph.facebook.com/', rawData.id,
              '/picture','?type=small&redirect=false'].join('');
              console.log('currentUserrrrrrrrr', currentUser);
        return $http.get(picturePath).then(function(response){
          currentUser.id = rawData.id;
          currentUser.name = rawData.name;
          currentUser.pictureURL = response.data.data;
        });

      }

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