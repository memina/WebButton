var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var sock;

app.listen(8001, function(){
 console.log('listening on *.8001');
});

// button is attaced to pin 18, led to 17
var GPIO = require('onoff').Gpio;
var led1 = new GPIO(14, 'out');
var led2 = new GPIO(15, 'out');
var button = new GPIO(18, 'in', 'both');

//Init LED to off
led1.writeSync(0);
led2.writeSync(0);

function handler (req, res) {
  fs.readFile('/root/Node-Button/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}


 
io.on('connection', function (socket) {

  sock = socket;
  
  socket.on('led', function (data) {
    console.log(data);
    if (data == '1'){
          led1.writeSync(1);
          socket.emit('ledstatus', '1');
 
    }else if (data == '1-0'){
          led1.writeSync(0);
          socket.emit('ledstatus', '1-0');
    }else if (data == '2'){
          led2.writeSync(1);
          socket.emit('ledstatus', '2');
    }else if (data == '2-0'){
          led2.writeSync(0);
          socket.emit('ledstatus', '2-0');
    }
    
  });
    
});
 
