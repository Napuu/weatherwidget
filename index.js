var fs = require('fs'),
    http = require('http'),
    https = require('https'),
    express = require('express');

var port = 443;

var options = {
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
};


var app = express();

var server = https.createServer(options, app).listen(port, function(){
  console.log("Express server listening on port " + port);
});

app.get('/', function (req, res) {
    res.writeHead(200);
    console.log("ayyyyy");
    res.end("ayy");
});
