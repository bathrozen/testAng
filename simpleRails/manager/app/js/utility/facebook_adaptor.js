angular.module('phonecatApp')

.factory('fbAdaptor', function(getFBPicture){

  return function(scope){
    var tmp = facebookAuthen(scope);
    console.log('tmp', tmp);
    return tmp;
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

        return angular.extend(getUserData(response), getFBPicture(response.id));
      });

      function getUserData(data){ return { id: data.id, name: data.name }; }

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
    var picturePath = ['http://graph.facebook.com/', id,
              '/picture?type=small&redirect=false'].join('');

    delete $http.defaults.headers.common['X-Requested-With'];

    return $http.get(picturePath).then(function(response){
      return {picture: response.data.data.url};
    });

  };
});