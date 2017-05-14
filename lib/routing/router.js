module.exports = {
	tset: function() {
		console.log("testing");
	},
	init: function(app) {
		console.log("??");
		app.get("/test", function (req, res) {
			console.log("test");
			res.render("test.pug", {user: "testuser"});
		});
			
 	}
}
var muuttuja = "tseting";
var routes = [
	[ "", "main" ]
];
console.log(routes[0][1]);
