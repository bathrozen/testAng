angular.module('phonecatApp')

.factory('fbAdaptor', function($http){

  return function(scope){
    return facebookAuthen(scope);
  };

  function facebookAuthen(scope){

    var userData = {};

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '420575864742428',
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
      });

      FB.Event.subscribe('auth.authResponseChange', function(response) {
        if (response.status === 'connected') {
          return getData();
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

        var xmlhttp = new window.XMLHttpRequest();

        $http.get('graph.facebook.com/me/picture', function(response){
          console.log('picture', response);
        });

        xmlhttp.open('GET', '/phones?fID='+data.id+'&name='+data.name, true);
        xmlhttp.send();

        angular.extend(userData, dataFilter(response));

        scope.$apply(function(){
          scope.isLogin = true;
        });

      });

      function dataFilter(data){
        return {
          id: data.id,
          name: data.name
        };
      }

    }

  }

});