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
