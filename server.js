var express = require('express');
var app = express();
var path = require('path')

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// app.use(express.static('public'));

app.use(function(req,res,next){
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// var server = app.listen(5000, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   console.log('Example app listening at http://%s:%s', host, port);
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
