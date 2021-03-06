var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Redis = require('ioredis');
var redis = new Redis();

redis.subscribe('changed.team', function(err, count){
  console.log(count);
});

redis.subscribe('draft.player', function(err, count){
  console.log(count);
});

redis.subscribe('add.players', function(err, count){
  console.log(count);
});

redis.subscribe('add.sport',function(err, count){
console.log(count);
})

redis.on('message', function(channel , message) {
  console.log("message received");
  console.log(channel);
  message = JSON.parse(message);

  io.emit(channel + ":" + message.event, message.data);

},function(err){
  console.log("may error");
});

http.listen(3000, function(){
  console.log("Server starting at port 3000");
})
