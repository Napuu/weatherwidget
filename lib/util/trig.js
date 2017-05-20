module.exports = {
	degreeEquivalent: function (distance, lat) {
		var r = 6371, pi = Math.PI;
		var lat1 = (distance * 180) / (pi * r);
		var lon1 = (distance * 180) / (Math.cos(lat / 180 * pi) * pi * r);	
		return {lat: lat1, lon: lon1};
	}	
}