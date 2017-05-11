fs = require('fs');
var path = require("path");
global.appRoot = path.resolve(__dirname);
options = {
	key: fs.readFileSync('./keys/server.key'),
	cert: fs.readFileSync('./keys/server.crt')
} 
var express = require('express');
var https = require('https');
var http = require('http');
var app = express();
app.set("view engine", "pug");
app.set('views', path.join(__dirname, '/lib/views'));

//http.createServer(app).listen(8080);
https.createServer(options, app).listen(1443);
var router = require(__dirname + "/lib/routing/router");
app.get("/", function (req, res) {
	res.render("test.pug", {user: "admin"});
});
//router.init(app);

