//latestFetch stores last fetch times of certain requests
//they're all set to 0 at start so after starting server all requests are fresh
var latestFetch = {};
latestFetch.lightnings = 0;
module.exports.data = function (socket, data) {
	if (data.message == "lightnings") {
		var request = require('request');
		var reqURLPart1 = "http://data.fmi.fi/fmi-apikey/c032f648-f04d-48b7-95e5-af7541906622/wfs?request=getFeature&storedquery_id=fmi::observations::lightning::multipointcoverage"
		 
		var dayAgo = new Date();
		var hours = 12;
		dayAgo.setHours((new Date()).getHours() - hours);
		var reqURLPart2;
		reqURLPart2 = "&starttime=" + dayAgo.toJSON(); 
		//manually set starttime for debugging
		//reqURLPart2 = "&starttime=2017-08-25T21:00:00Z";
		console.log(reqURLPart1 + reqURLPart2);

		//TODO 
		//:)li_icon_hues
		//

		//timeDiff; how much time has passed since last time lightning data was fetched
		var timeDiff = (new Date()).getTime()/1000 - latestFetch.lightnings;
		if (latestFetch.lightnings == undefined || timeDiff > 60) {
			console.log("ok");
			latestFetch.lightnings = (new Date()).getTime() / 1000;
		} else {
			console.log("not enough time has passed");
			socket.emit("flashes",[]);
			return; 
		}
		console.log((new Date()).toJSON());
		var fs = require("fs");
		var temp = "http://data.fmi.fi/fmi-apikey/c032f648-f04d-48b7-95e5-af7541906622/wfs?request=getFeature&storedquery_id=fmi::observations::lightning::multipointcoverage&starttime=2017-06-22T09:28:24.686Z";
		request(reqURLPart1 + reqURLPart2, function (error, response, body) {
			var mp = require(appRoot + "/lib/util/myParser");
			var positions = mp.parseAndFind(body, "gmlcov:positions");
			var currents = mp.parseAndFind(body, "gml:doubleOrNilReasonTupleList");
			if (positions == undefined) {
				//no strikes
				socket.emit("flashes", []);
				//ei jaksa tehä tätä parserin kautta ":D"
				fs.writeFile("lib/views/public/fmi/lightnings.json", 
					'{' +
					 '"type": "FeatureCollection",'+
					 '"features": []' +
					'}'
					, 'utf8', function () {});
			} else {	
				currents = currents.split("\n");
				positions = positions.split("\n");
				var flashes = [];
				var almostGeoJSONFlashes = [];
				for (i in positions) {
					var temp = positions[i].split(" ");
					var tempList = [];
					var GeoJSONReadyFlash = {};
					flashes[i] = [];
					for (o in temp) {
						if (temp[o] != "") {
							flashes[i].push(parseFloat(temp[o]));
						}
					}
					if (flashes[i][0] == undefined) continue;
					GeoJSONReadyFlash.lat = flashes[i][0];
					GeoJSONReadyFlash.lng = flashes[i][1];
					GeoJSONReadyFlash.time = flashes[i][2];
					almostGeoJSONFlashes.push(GeoJSONReadyFlash);
				}
				var GeoJSON = require('geojson');
				var parsed1 = GeoJSON.parse(almostGeoJSONFlashes, {Point: ["lat", "lng"]});
				fs.writeFile("lib/views/public/fmi/lightnings.json", JSON.stringify(parsed1), 'utf8', function () {});
			}
			socket.emit("flashes","");
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
//AIzaSyBej9fCwuETi14G6kfLYbQVo-WNahaskqI
