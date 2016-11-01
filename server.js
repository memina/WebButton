var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var sock;

app.listen(8001, function(){
 console.log('listening on *.8001');
});

// button is attaced to pin 18, led to 17
var GPIO = require('onoff').Gpio;
var led1 = new GPIO(2, 'out');
var led2 = new GPIO(3, 'out');


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
    led1.writeSync(0);
    led2.writeSync(0);
    switch (data) {
        case "1":
          led1.writeSync(1);
          socket.emit('ledstatus', '1');
            break;
        case "2":
          led2.writeSync(1);
          socket.emit('ledstatus', '2');
            break;
           }
      
      
      
     
    
  });
    
});
 

