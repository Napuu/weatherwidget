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
var mapReady = false;
var salamatReady = false;
function test() {
	socket.emit("*", {name: "fetch", message: "test event"});
}
function handleLocation(position) {
	pos.text(position.coords.latitude + ", " + position.coords.longitude);
	socket.emit("*", {lat: position.coords.latitude, long: position.coords.longitude, name: "fetch"});
	console.log(position);
}
function handleLocationError(err) {
	console.log(err);
	alert("location error");
}
var offset = new Date().getTimezoneOffset();
console.log(offset);
var datetest = new Date();
console.log(datetest.getTime());
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
	socket.emit("*", {name: "fetch", message: "fetchLightnings"});
}
function trueInit() {
	if (!mapReady || !salamatReady) return;
	console.log("nyt lähtee");
	console.log(salamat.length);
	var yay = {lat: 61.497610, lng: 23.738371};
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 7,
		center: yay
	});
	for (i in salamat) {
		console.log(salamat[i][0] + ", " + salamat[i][1]);
		var marker = new google.maps.Marker({
			position: {lat: parseFloat(salamat[i][0]), lng: parseFloat(salamat[i][1])},
			map: map
		});
	}
}

