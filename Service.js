var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(3000);

mangUserName = [];
io.on('connection', function(socket){
  console.log('Đã có người kết nối đến: ' + socket.id);

  socket.on('c-gui-sv', function(data){
    console.log('Server đã nhận được: ' +data);
    var kq=false;
    if(mangUserName.indexOf(data) >=0 ){
      console.log('Đã có người đky tên này !');
      kq=false;
    }else{
      kq=true;
      socket.username=data;
      mangUserName.push(data);
      console.log('Đky thành công !');
    }
    socket.emit('sv-send-username-c', kq);
  })

  socket.on('c-mess-sv', function(data){
    console.log('SV nhận được ndung chat: ' +data);

  io.sockets.emit('sv-send-mess-c',{u:data[0], m:data[1]});
  });

});
