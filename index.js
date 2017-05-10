fs = require('fs');
options = {
	key: fs.readFileSync('./keys/server.key'),
	cert: fs.readFileSync('./keys/server.crt')
} 
var express = require('express');
var https = require('https');
var http = require('http');
var app = express();

//http.createServer(app).listen(8080);
https.createServer(options, app).listen(1443);
app.get("/", function (req, res) {
	res.sendFile(__pathname
	res.end("moi");
});
