var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  redis = require('redis'),
  redisClient = redis.createClient(),
  sockets = {};
  // ioSocket = io.sockets;

app.use( express.static(__dirname + '/socket.io'));

server.listen(4000);

io.configure(function () {
});

io.sockets.on('connection', function(socket){
  socket.on('join', handleJoin(socket));
  socket.on('disconnect', handleDisconnect(socket));
});

listen_to = ['new-phone', 'update-phone', 'new-detail', 'delete-phone'];

listen_to.forEach(function(message){
  redisClient.subscribe(message);
});

redisClient.on("message", function (message, data) {
  broadcast(message, data);
});

function broadcast(message, data){
  var parsed = JSON.parse(data),
    sessionID = parsed.sessionID;
    console.log('@@@@@@@@@@@@');
    console.log('message', data);
    delete parsed.sessionID;
  Object.keys(sockets).forEach(function(key){
    if (sessionID === sockets[key].id) { return; }
    sockets[key].emit(message, data.phone);
  });
}

function handleJoin(socket){
  return function(){
    sockets[socket.id] = socket;
  };
}

function handleNewPhone(){
  return function(phone){
    Object.keys(sockets).forEach(function(key){
      sockets[key].emit('new-phone', phone);
    });
  };
}

function handleDisconnect(socket){
  return function() {
    socket.get('id', function(err){
      if( err !== null ) { return; }
      delete sockets[socket.id];
    });
  };
}

process.on('uncaughtException', function(err) {
  console.log('ERRORRRRRRRRRRRRRR', arguments); //no idea what process is but it works
});

redisClient.on("error", function (err) {
  console.log("Redis Error ", err);
});
