console.log("moikkamoi");
var socket = io();
//
//socket.emit("ready", "rad");
var EmitEvent = {};
socket.emit("*", {name: "fetch"});
navigator.geolocation.getCurrentPosition(handleLocation, handleLocationError, {
	timeout: 15000,
       	maximumAge: Infinity,
	enableHighAccuracy: true});

var pos = $("#pos");
var mapReady = true;
var salamatReady = false;
var mymap;
L_PREFER_CANVAS = true;
function test() {
//mapbox key
	var mapkey = "pk.eyJ1IjoicGFsaWtrIiwiYSI6ImNqNDJ2Z2llNjBvYTkzOW9ibGJwcGMybzkifQ.nSLXiCVvzV_aiRAXchdfRQ";
	mymap = L.map('map', {renderer: L.canvas()}).setView([61.497129, 23.829673], 13);
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		    maxZoom: 18,
		    id: 'mapbox.streets',
		    accessToken: mapkey
	}).addTo(mymap);
	socket.emit("*", {name: "fetch", message: "test event"});
}
function handleLocation(position) {
	pos.text(position.coords.latitude + ", " + position.coords.longitude);
	socket.emit("*", {lat: position.coords.latitude, long: position.coords.longitude, name: "fetch"});
	console.log(position);
}
function handleLocationError(err) {
	console.log(err);
	//alert("location error");
}
var offset = new Date().getTimezoneOffset();
console.log(offset);
var datetest = new Date();
console.log(datetest.getTime());
var dateNow = new Date();
function initMap() {
	/*
	var uluru = {lat: -25.363, lng: 131.044};
	var map = new google.maps.Map(document.getElementById('map'), {
		  zoom: 4,
		  center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
	*/
	console.log("map ready");
	mapReady = true;	
}
socket.on("flashes", function(data) {
	salamat = data;
	console.log("salamat ready");
	salamatReady = true;
	trueInit();
});
function test2() {
	$("#loadingIndicator").toggleClass("loading1");		
	socket.emit("*", {name: "fetch", message: "fetchLightnings"});
}
function trueInit() {
	console.log("nyt lähtee");
	console.log(salamat.length);
	var yay = {lat: 61.497610, lng: 23.738371};
	for (i in salamat) {
		if (salamat[i][0] == undefined) continue;
		console.log(salamat[i][0] + ", " + salamat[i][1]);
		var degE = degreeEquivalent(1, salamat[i][0]);	
		var deltaLat = degE.lat; 
		var deltaLng = degE.lng;
		var coords1 = [
			[salamat[i][0] - deltaLat, salamat[i][1] - deltaLng],
			[salamat[i][0] + deltaLat, salamat[i][1] + deltaLng]
		];
		var coords2 = [
			[salamat[i][0] + deltaLat, salamat[i][1] - deltaLng],
			[salamat[i][0] - deltaLat, salamat[i][1] + deltaLng]
		];
		/*
		var lineSettings = {color: "red", weight: 5};
		var mark1 = L.polyline(coords1, lineSettings).addTo(mymap);
		var mark2 = L.polyline(coords2, lineSettings).addTo(mymap);
		var rectangle = L.rectangle(coords2, {color: "hsla(237, 50%, 50%, 0)"}).addTo(mymap);
		var dayAgo = new Date();
		dayAgo.setDate(dayAgo.getDate() - 1);
		

		rectangle.strikeTime = salamat[i][2];
		rectangle.on("click", function (ev) {
			console.log(ev.target.strikeTime);	
			var tests = new Date(ev.target.strikeTime);
			//tests.setDate(ev.target.strikeTime);
			console.log(tests.toJSON());
		});
		*/
		L.marker([salamat[i][0], salamat[i][1]], {keyboard: false}).addTo(mymap);
		/*
		var circle = L.circle([salamat[i][0], salamat[i][1]], {radius: 2500, color: "hsl(0,100%,52%)"});
		circle.aika = salamat[i][2];
		circle.addTo(mymap);
		circle.on("click", function (ev) {
			console.log(ev.target.aika);
		});
		*/
	}
	$("#loadingIndicator").toggleClass("loading1");		
}
var range = document.getElementById("ranger");
var rangeColor = document.getElementById("rangeColor");
function muuttu() {
	console.log(range.value);
	//seuraava on sellane transition punasesta harmaaks (saturation -> 0)
	/*
	var red = 128 + parseInt(128 * range.value);
	var green = parseInt(128 * (1 - range.value));
	var blue = parseInt(128 * (1 - range.value));
	var col = "rgb(" + makeTwo(red) + ", " + makeTwo(green) + ", " + makeTwo(blue) + ")";
	console.log(col);
	*/
	var col = "rgba(255, " + parseInt(255*range.value) + ", 0, 1)";
	$("#rangeColor").css("background", col);
}
function makeTwo(num) {
	var ret = num;
	if (num < 10) {
		ret = "0" + num;
	} if (num < 100) {
		ret = "0" + ret;
	}
	return num;
}
