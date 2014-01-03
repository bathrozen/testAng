var options = {port: 4000},
	socket = new io.Socket('localhost', options).connect();

socket.on("messages-available", function(message){
  // publish the change on the client side, the channel == the resource
  console.log('message', message);
});

