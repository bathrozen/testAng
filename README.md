Realtime Angular with Facebook using Rails

Dumb way to bind Angular to facebookAPI with realtime update by using rails

=======

Things you need for this app

1 Your own facebook application
2 Rails
3 Node

Things you need to config

/simpleRails/manager/app/js/utility/app_config.js
facebookAppConfig -> your facebook appId
realtimeServerConf-> your realtime server
/simpleRails/config/database.yml -> your database config

/simpleRails/manager/app/index.html
<script src="yourRealtimeSite/socket.io/socket.io.js"></script>

after that

1. /simpleRails/manager/ grunt
to create a bunch of codes in simpleRails/public and simpleRails/public_2

2. start rails

3. /pushServer node server.js