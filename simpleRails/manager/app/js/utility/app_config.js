angular.module('phonecatApp')

.factory('facebookAppConfig', function(){
  return {
	appId:  '420575864742428',
	status: true,
	cookie: true,
	xfbml:  true
  };
})

.factory('realtimeServerConf', function(){
	return 'http://warm.paiges.net:4000';
});
