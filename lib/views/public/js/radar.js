console.log("am fine");
var date = new Date().toJSON();
console.log(date);
var socket = io();
socket.emit("*", {name: "radar", message: "tset"});
function initMap() {

	console.log("map initialized");
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 6,
		//center: {lat: 40.740, lng: -74.18},
		//61.490536, 23.768505
		center: {lat: 61.49, lng: 23.79},
		gestureHandling: "greedy"
	});

	//http://wms.fmi.fi/fmi-apikey/c032f648-f04d-48b7-95e5-af7541906622/geoserver/Radar/wms?service=WMS&version=1.3.0&request=GetMap&layers=Radar:suomi_rr_eureffin&bbox=-118331.366,6335621.167,875567.732,7907751.537&srs=EPSG:3067&format=image%2Fpng&time=2017-11-19T12:25:00Z&width=1987&height=3144
	/*var imageBounds = {
		north: 71.54296875,
		south: 56.812032811057,
		east: 34.27734375,
		west: 17.719217188943 
	};
	*/
	var imageBounds = {
		north: 70.10,
		south: 56.15,
		east: 37.05,
		west: 16.05
	}
	//kuva haetaan fmi:ltä seuraavilla koordinaateilla =56,16,70,37
	//eli pikkusen on korjailtu että se saadaan kohdilleen 
//k
	//56,16,70,37&srs=EPSG:4055
	//bottom left 56.5746231317, 16.8674300177
	//top right 70.864188072, 37.3716599949
	//
	//50199.4814, 6582464.0358, 761274.6247, 7799839.8902
	historicalOverlay = new google.maps.GroundOverlay(
		"/graphics/out3.png",
		imageBounds, {opacity: 1.0});
	historicalOverlay.setMap(map);
	imageBounds.north = 64;
	imageBounds.south = 50;


}
