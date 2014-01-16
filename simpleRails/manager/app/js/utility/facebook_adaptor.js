angular.module('phonecatApp')

.factory('fbAdaptor', function($http, $rootScope){

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
          var userdata = {};
          getData(userdata);

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
        return $http.get(picturePath).then(function(response){
          var data = { id: rawData.id, name: rawData.name };
          data.pictureURL = response.data.data;
          // return data;
          $rootScope.$boardcast('userData', data);
        });

      }

      function appLogin(user){
        var xmlhttp = new window.XMLHttpRequest();
        xmlhttp.open('GET', '/phones?fID='+user.id+'&name='+user.name, true);
        xmlhttp.send();
      }

    }

  }

});