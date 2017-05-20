fs = require('fs');
var path = require("path");
global.appRoot = path.resolve(__dirname);
options = {
	//openssl req -x509 -newkey rsa:4096 -keyout server.key -out server.cert -days 365 -nodes
	key: fs.readFileSync('./keys/server.key'),
	cert: fs.readFileSync('./keys/server.crt')
} 
var express = require('express');
var https = require('https');
var http = require('http');
var app = express();
app.set("view engine", "pug");
app.set('views', path.join(__dirname, '/lib/views'));
var forceSSL = require("express-force-ssl");
app.use(forceSSL);
app.set("forceSSLOptions"); 
var server = http.createServer(app);
server.listen(8080);
var secureServer = https.createServer(options, app);
secureServer.listen(1443);
var router = require(__dirname + "/lib/routing/router");
router.init(app);
var ip = require("ip");
console.dir ( ip.address() );

var io = require("socket.io")(secureServer);
io.on('connection', function (socket) {	  
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		console.log(data);
	});
	socket.on("ready", function (data) {
		console.log("täällä ollaa");
	});	
});
