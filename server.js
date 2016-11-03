var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
var sock;
var ledcount = 2;

app.listen(8001, function(){
 console.log('listening on *.8001');
});

// button is attaced to pin 18, led to 17
var GPIO = require('onoff').Gpio;
var leds = [];
for (var i = 0; i < ledcount; i++) {
  leds.push(new GPIO(i+2, 'out'));
}
//Init LED to off
for (var i = 0; i < ledcount; i++) {
  leds[i].writeSync(0);
}


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
    for (var i = 0; i < ledcount; i++) {
      leds[i].writeSync(0);
    }
    leds[data-1].writeSync(1);
    socket.emit('ledstatus', data);
    
  });
    
});
 

