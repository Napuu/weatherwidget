module.exports = {
	initSocket: function(secureServer)  {
		var io = require("socket.io")(secureServer);
		io.on('connection', function (socket) {          
			//request can be found from
			//socket.handshake.headers.referer
			//not that it would be needed anywhere atm

			socket.on("*", function (data) {
				require(appRoot + "/lib/controllers/" + data.name + ".js").data(socket, data);
		        });     
		});

	},
	initRouting: function(app) {
		//match everything and then pass the request forward
		//right now only prints client ip, nothing else
		app.all(/.*/, function (req, res, next) {
			//printing clients ip - sometimes it works, sometimes it doesn't
			console.log("Request from ip " + req.connection.remoteAddress.match(/(\d){1,3}.(\d){1,3}.(\d){1,3}.(\d){1,3}/g)[0]);
			next();	
		});
		app.get("/fetch", function (req, res) {
			//res.sendFile(appRoot + "/lib/statics/fetch.html");
			res.render("fetch.pug");	
		});
		app.get("/test", function (req, res) {
			res.render("test.pug", {user: "admin"});
		});
		app.get("/", function (req, res) {
			res.render("test.pug", {user: "guest", pageTitle: "not permitted"});
		});
	
 	}
}
