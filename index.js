fs = require('fs')
options = {
	key: fs.readFileSync('./keys/server.key'),
	cert: fs.readFileSync('./keys/server.crt')
} 

app = require('express.io')()
app.https(options).io()
app.listen(1443)
app.get("/", function(req, res) {
	res.write("tset\n");
	res.end("moi");
}); 
app.get("/m", function (req, res) {
	res.sendfile(__dirname + "/lib/view/main.html");
});
