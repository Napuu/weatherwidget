var degreeEquivalent = function (distance, lat) {
        var r = 6371, pi = Math.PI;
        var lat1 = (distance * 180) / (pi * r);
	var lng1 = (distance * 360) / (Math.cos(lat / 180 * pi) * pi * r * 2);
        //var lng1 = (distance * 180) / (Math.cos(lat / 180 * pi) * pi * r);
	return {lat: lat1, lng: lng1}; 
}
var calculateDistance = function (lat1, lng1, lat2, lng2) {
        var r = 6371, pi = Math.PI;
	var deltaLng = Math.abs(lng1 - lng2);
	var deltaLat = Math.abs(lat1 - lat2);
	var r1 = Math.cos(lat1 / 180 * pi) * r;
	var r2 = Math.cos(lat2 / 180 * pi) * r;
	var deltaX = (deltaLng / 360) * (pi * 2 * (r1 + r2) / 2);
	var deltaY = (deltaLat * (pi * r)) / 180;
	return (Math.sqrt(deltaX * deltaX + deltaY * deltaY));
}
var toDeg = function (angleInRad) {
	return angleInRad * (180 / Math.PI);
}
var toRad = function (angleInDeg) {
	return angleInDeg * (Math.PI / 180);
}
var haversine = function (lat1, lng1, lat2, lng2) {
	
}

