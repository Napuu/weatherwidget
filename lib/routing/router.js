module.exports = {
	tset: function() {
		console.log("testing");
	},
	init: function(app) {
		console.log("??");

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
var muuttuja = "tseting";
var routes = [
	[ "", "main" ]
];
console.log(routes[0][1]);
