angular.module('phonecatApp')

.factory('fbAdaptor', function(){

  return function(scope){
    facebookAuthen(scope);
  };

  function facebookAuthen(scope){
    window.fbAsyncInit = function() {
    FB.init({
      appId      : '420575864742428',
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    FB.Event.subscribe('auth.authResponseChange', function(response) {
      if (response.status === 'connected') {
        testAPI();
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

    function testAPI() {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
        var xmlhttp = new window.XMLHttpRequest(),
          data = dataFilter(response);

        xmlhttp.open('GET', '/phones?fID='+data.id+'&name='+data.name, true);
        xmlhttp.send();

        console.log('scope.isLogin', scope.isLogin);

        scope.$apply(function(){
          scope.isLogin = true;
        });

        console.log('scope.isLogin', scope.isLogin);

        console.log('Good to see you, ' + response.name + '.');
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