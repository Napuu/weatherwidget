module.exports.data = function (socket, data) {
	console.log(data);
	console.log("from fetch.js");
	if (data.message != undefined) {
		console.log("moi tässä tulee jotain");
		console.log(data.message);
	}
	console.log("ja sit request googlen etusivu");
	if (data.message == "fetchLightnings") {
		console.log("gonna fetch now");
		var request = require('request');
		var reqURL = "http://data.fmi.fi/fmi-apikey/c032f648-f04d-48b7-95e5-af7541906622/wfs?request=getFeature&storedquery_id=fmi::observations::lightning::multipointcoverage&starttime=2017-06-15T21:00:00Z";
		request(reqURL, function (error, response, body) {
			var mp = require(appRoot + "/lib/util/myParser");
			var positions = mp.parseAndFind(body, "gmlcov:positions");
			positions = positions.split("\n");
			var flashes = [];
			for (i in positions) {
				var temp = positions[i].split(" ");
				var tempList = [];
				flashes[i] = [];
				for (o in temp) {
					if (temp[o] != "") {
						flashes[i].push(temp[o]);
					}
				}
			}
			socket.emit("flashes",flashes);
		});
		
	}
}
//forecast request
//toi on siinä kätevässä multipointcoverage muodossa
//http://data.fmi.fi/fmi-apikey/c032f648-f04d-48b7-95e5-af7541906622/wfs?request=getFeature&storedquery_id=fmi::forecast::hirlam::surface::point::multipointcoverage&latlon=61.4979065,23.8360286
//
//observations request
//fmi::observations::weather::multipointcoverage
//pitää vielä miettiä miten valitaan käytettävät asemat
//
//salamaniskut - voi olla ihan kätevä
//fmi::observations::lightning::multipointcoverage
//
//google maps api key
//AIzaSyCkI6BG0xSyp0jSTj3WPxPpHmnw4UOYNmo
