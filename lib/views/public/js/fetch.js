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
var map;
var infowindow;
var userPosition;
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
	//socket.emit("*", {lat: position.coords.latitude, long: position.coords.longitude, name: "fetch"});
	console.log(position);
	userPosition = {lat: position.coords.latitude, lng: position.coords.longitude}; 
	var marker = new google.maps.Marker({
		position: userPosition,
		map: map
	});
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

/**
 * This function is called as callback after Google Maps API is loaded
 * It initiates the map
 * no params no return
 */
function initMap() {
	var uluru = {lat: -25.363, lng: 131.044};
	var finlandCenter = {lat: 61.815477, lng: 25.423249};
	$("#map").css("height", "75vh");
	$("#map").on("touchmove", function(ev) {
		ev.preventDefault();	
	});
	var cssObject = $("#map").css("width", "100%");
	console.log("width: " + cssObject.width());
	console.log("height: " + cssObject.height());
	var test, test2;
	test = test2 = 2;
	if (cssObject.width() > cssObject.height()) {
		console.log("Moi");
		$("#map").css("width", cssObject.height());
	}
			
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 6,
		center: finlandCenter,
		gestureHandling: "greedy"
	});
	var icon = "https://upload.wikimedia.org/wikipedia/commons/c/c7/Lightning_Symbol.svg";	
	
	var marker2 = new google.maps.Marker({
		position: uluru,
		map: map,
		icon: "/graphics/li_icon_30.png"
	});
	console.log("map ready");
	mapReady = true;	
	map.data.addListener('click', function(event) {
		createPopup(event);		
	});
	updateMap();
}
socket.on("flashes", function(data) {
	salamat = data;
	console.log("salamat ready");
	salamatReady = true;
	trueInit();
});

/**
 * Emits fetch
 */
function updateMap () {
	//TODO 
	//tolle loading indicatorille vois tehä jotai
	$("#loadingIndicator").toggleClass("loading1");		
	socket.emit("*", {name: "fetch", message: "lightnings"});
}
function updateStyle() {
	var timeNow = (new Date().getTime()) / 1000;
	map.data.setStyle(function (feature) {
		var time = feature.getProperty("time");
		var timeDiff = timeNow - time;
		var val1 = 100;
		if (timeDiff <= 60*60) {
			val1 = parseInt(100 * timeDiff / (60*60));
		}
		var r = 20;
		var theIcon = {
			url: "/graphics/circle2_hues/circle2_" + val1 + ".png",
			scaledSize: new google.maps.Size(r, r),
			anchor: new google.maps.Point(r / 2, r / 2)
		};
		return {
			
			icon: theIcon
		}	
	});
	console.log("markers updated");
}
function trueInit() {
	console.log("nyt lähtee");
	var lightningCount;
	var yay = {lat: 61.497610, lng: 23.738371};
	var lightnings = {};
	map.data.forEach(function(feature) {
	     map.data.remove(feature);
	});
	map.data.loadGeoJson("/fmi/lightnings.json");
	map.data.loadGeoJson("/fmi/test1.json");
	updateStyle();
	//7400km
	map.addListener("bounds_changed", function (event) {
		//asdf
	});
	map.addListener("click", function(event) {
		if (infowindow != undefined) infowindow.close();
	});
	updateStyle();
	$("#loadingIndicator").toggleClass("loading1");

}


/**
 * Returns string that is number itself num>9
 * else returns string with zero in front of number
 * @param {Number} num
 * @return {String} ret
 */
function makeTwo(num) {
	var ret = num;
	if (num < 10) {
		ret = "0" + num;
	} if (num < 100) {
		ret = "0" + ret;
	}
	return ret;
}

/**
 * Creates popup on map that shows time and position of the strike
 * Takes Google Maps API event as only argument
 * @param {Object} event
 */
function createPopup(event) {
	var time = event.feature.getProperty("time");

	
	//get strike time and position from geojson through Maps API
	//then calculate distance and show that together with time on popup
	var date = new Date(time*1000);
	var dateString = makeItTwo(date.getHours()) + "." + makeItTwo(date.getMinutes());
	
	var pos = event.feature.getGeometry().get();
	var dis = calculateDistance(userPosition.lat, userPosition.lng, pos.lat(), pos.lng());
	

	//if infowindow exists, close it
	if (infowindow != undefined) {
		infowindow.close();
	}

	var content = "Aika: " + dateString + "<br>" + "Etäisyys: " + parseInt(dis) + " km";
	infowindow = new google.maps.InfoWindow({
		content: content,
		position: pos
	});
	
	infowindow.open(map);
}
