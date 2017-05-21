module.exports = {
	initSocket: function(secureServer)  {
		var io = require("socket.io")(secureServer);
		io.on('connection', function (socket) {          
			//request can be found from
			//socket.handshake.headers.referer
			//not that it would be needed anywhere atm

			socket.on("*", function (data) {
				require(appRoot + "/lib/controllers/" + data.name).data(socket, data);
		        });     
		});

	},
	initRouting: function(app) {
		//match everything and then pass the request forward
		app.all(/.*/, function (req, res, next) {
			//printing clients ip - sometimes it works, sometimes it doesn't
			console.log("Request from ip " + req.connection.remoteAddress.match(/(\d){1,3}.(\d){1,3}.(\d){1,3}.(\d){1,3}/g)[0]);
			next();	
		});
		app.get("/test", function (req, res) {
			res.render("test.pug", {user: "admin"});
		});
		app.get("/", function (req, res) {
			res.render("test.pug", {user: "guest", pageTitle: "not permitted"});
		});
	
 	}
}
