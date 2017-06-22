module.exports.data = function (socket, data) {
	if (data.message == "fetchLightnings") {
		var request = require('request');
		var reqURLPart1 = "http://data.fmi.fi/fmi-apikey/c032f648-f04d-48b7-95e5-af7541906622/wfs?request=getFeature&storedquery_id=fmi::observations::lightning::multipointcoverage"
		//var reqURL2 = "starttime=2017-06-15T21:00:00Z";
		 
		var dayAgo = new Date();
		dayAgo.setDate(dayAgo.getDate() - 1);
		var reqURLPart2 = "&starttime=" + dayAgo.toJSON(); 
		request(reqURLPart1 + reqURLPart2, function (error, response, body) {
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
						flashes[i].push(parseFloat(temp[o]));
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
