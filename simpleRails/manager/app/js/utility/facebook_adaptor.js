angular.module('phonecatApp')

.factory('fbAdaptor', function(getFBPicture){

  return function(scope){
    return facebookAuthen(scope);
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

        appLogin(response);

        scope.$apply(function(){
          scope.isLogin = true;
        });

        return angular.extend(userData(response), getFBPicture(response.id));
      });

      function userData(data){ return { id: data.id, name: data.name }; }

      function appLogin(user){
        var xmlhttp = new window.XMLHttpRequest();
        xmlhttp.open('GET', '/phones?fID='+user.id+'&name='+user.name, true);
        xmlhttp.send();
      }

    }

  }

})

.factory('getFBPicture', function($http){

  return function(id){
    delete $http.defaults.headers.common['X-Requested-With'];
    var picturePath = ['http://graph.facebook.com/', id,
              '/picture?type=small&redirect=false'].join('');

    $http.get(picturePath, function(response){
      console.log('pictureee', response);
    });

    return {picture: ''};

  };
});