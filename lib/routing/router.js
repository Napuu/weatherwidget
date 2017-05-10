module.exports = {
	tset: function() {
		console.log("testing");
	},
	init: function(app) {
		app.use(function (req, res, next) {
			var response = 404;
			var fail = true;
			for (var i = 0; i < routes.length; i++) {
				if (req.path == ("/" + routes[i][0])) {
					var rPath = appRoot + "/lib/view/" + routes[i][1] + ".html";
					try {
						console.log("moi");
						fs.statSync(rPath);
						res.sendFile(rPath);
						fail = false;
						response = 200;
					} catch (e) {
						console.log("file not found");
						response = 500;
						break;	
					}
					//res.sendFile(rPath);
					//fail = false;
				}
			}
			if (response != 200 || fail) {
				res.sendStatus(response);
			}	
			
		});
 	}
}
var muuttuja = "tseting";
var routes = [
	[ "", "main" ]
];
console.log(routes[0][1]);
