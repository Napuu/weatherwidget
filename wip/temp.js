function downloadLatest(type, steps) {
	var date = new Date();
	var step = 0;
	if (type != "dbz" && type != "rr") date.setMinutes(0);
	else date.setMinutes(Math.floor(date.getMinutes() / 5) * 5);
	date.setSeconds(0);
	date.setMilliseconds(0);
	var timestamps = [];
	if (type == "dbz") {	
		date.setHours((new Date()).getHours() + 1);
		for (var i = 0; i < steps; i++) {
			timestamps.push(date.toJSON());
			date.setMinutes(date.getMinutes() - 5);
		}
	} else if (type == "rr") {
		for (var i = 0; i < steps; i++) {
			timestamps.push(date.toJSON());	
			date.setMinutes(date.getMinutes() - 5);
		}
	} else if (type == "rr1h") {
		for (var i = 0; i < steps; i++) {
			timestamps.push(date.toJSON());
			date.setHours(date.getHours() - 1);
		}
	} else if (type == "rr12h") {
		for (var i = 0; i < steps; i++) {
			timestamps.push(date.toJSON());
			date.setHours(date.getHours() - 12);
		}
	} else if (type == "rr24h") {
		for (var i = 0; i < steps; i++) {
			timestamps.push(date.toJSON());
			date.setHours(date.getHours() - 24);
		}
	} 
	for (var i = 0; i < timestamps.length; i++) {
		console.log(timestamps[i]);
	}
}
downloadLatest("rr12h", 10);
