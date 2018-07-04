//Returns first match
module.exports.parseAndFind = function(chunk, name) {	
	//var ex1 = "<eka><toka1><kolmas1>moi</kolmas1><kolmas2><neljas1>noin</neljas1></kolmas2></toka1><toka2>ayy</toka2></eka>";
	var parse = require("xml-parser");
	var parsed = parse(chunk);
	//returns undefined if no results are found
	return dfs(parsed.root, name);
}
function dfs(currentPath, target) {
	if (target == currentPath.name) {
		 return currentPath.content;
	}
	for (i in currentPath.children) {
		var ans = dfs(currentPath.children[i], target);	
		if (ans != undefined) {
			return ans;
		}
	}
}

var matches;
//fmi::radar::composite::rr
//http://wms.fmi.fi/fmi-apikey/c032f648-f04d-48b7-95e5-af7541906622/geoserver/Radar/wms?service=WMS&version=1.3.0&request=GetMap&layers=Radar:suomi_rr_eureffin&styles=raster&bbox=-118331.366,6335621.167,875567.732,7907751.537&srs=EPSG:3067&format=image%2Fgeotiff&time=2017-10-31T18:50:00Z&width=1987&height=3144
//toimii kuhan poistaa ton argumentin styles=raster
//jostain syystä se näyttää vaan mustan ruudun
/*
function fullDfs(currentPath, target) {
	if (target == currentPath.name) {
		matches.push(target);
		return currentPath.content;
	}
	for (i in currentPath.children) {
		var ans = fullDfs(currentPath.children[i], target);
		if (ans != undefined) {
			return ans;
*/

/*
 *
<eka>
	<toka1>
		<kolmas1>moi</kolmas1>
		<kolmas2>
			<neljas1>noin</neljas1>
		</kolmas2>
	</toka1>
	<toka2>
		ayy
	</toka2>
</eka>
	<eka><toka1><kolmas1>moi</kolmas1><kolmas2><neljas1>noin</neljas1></kolmas2></toka1><toka2>ayy</toka2></eka>

*/
