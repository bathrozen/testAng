angular.module('phonecatApp')

.factory('facebookAppConf', function(){
  return {
	appId:  '420575864742428', // your facebook app id here
	status: true,
	cookie: true,
	xfbml:  true
  };
})

.factory('realtimeServerConf', function(){
	return 'http://warm.paiges.net:4000'; // your realtime server here
});
