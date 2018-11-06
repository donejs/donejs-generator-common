

exports.addRoutingMap = function(newContent, originalContent) {
	var data = originalContent;

    // Add buildElectron variable
    var buildElectronVarIndex = newContent.indexOf("var buildElectron");
	if(buildElectronVarIndex === -1) {
		newContent = "var buildElectron = process.argv.indexOf(\"electron\") > 0;\n\n" + newContent;
    }

    // Add buildCordova variable
    var buildCordovaVarIndex = newContent.indexOf("var buildCordova");
    if(buildCordovaVarIndex === -1) {
		newContent = "var buildCordova = process.argv.indexOf(\"cordova\") > 0;\n" + newContent;
    }

    // The generator-donejs version of build.js, unedited
    var defaultStealToolsBuildStart = "stealTools.build({},";
    var buildStartIndex = data.indexOf(defaultStealToolsBuildStart);
    if(buildStartIndex > 0) {
		newContent = newContent.replace(defaultStealToolsBuildStart, `stealTools.build({
  map: (buildElectron || buildCordova) ? {
    "can-route-pushstate": "can-route-hash"
  } : {}
},`);
	} else {
		var includesRouteMapping = data.indexOf("map: (buildElectron") > 0;
		if(!includesRouteMapping) {
			// A custom configuration version
	        var configedStealToolsBuildStart = "stealTools.build({\n";
	        buildStartIndex = data.indexOf(configedStealToolsBuildStart);
	        if(buildStartIndex > 0) {
					newContent = newContent.replace(configedStealToolsBuildStart, `stealTools.build({
  map: (buildElectron || buildCordova) ? {
    "can-route-pushstate": "can-route-hash"
  }, : {},
`);
			}
		}
	}

	return newContent;
}
