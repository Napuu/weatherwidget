module.exports.data = function (socket, data) {
	console.log(data);
	if (data.message == "moi") {
		console.log("joo");
		socket.emit("answer", {message: "haloo"});
		
	}
}

