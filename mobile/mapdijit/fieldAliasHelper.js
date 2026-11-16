/**
 * Field Alias Helper
 * Utility to inject friendly field names (aliases) from config.js footerfields
 * into layer field definitions for use by ArcGIS Legend and other widgets
 * 
 * This resolves: https://github.com/Public-Environmental-Data-Partners/EJScreen/issues/91
 */

define([], function () {
	/**
	 * Inject footerfields aliases into a layer's field definitions
	 * so the ArcGIS Legend widget will display our custom labels instead of raw field names
	 * 
	 * @param {Object} layer - The layer object with a fields array (e.g., MapImageLayer sublayer)
	 * @param {Object} dynamicJSON - The config.js dynamicJSON object containing footerfields mappings
	 * @returns {void} - Modifies layer.fields in place
	 */
	function injectFieldAliases(layer, dynamicJSON) {
		// console.log("fieldAliasHelper.injectFieldAliases called");
		
		if (!layer || !layer.fields || typeof dynamicJSON === 'undefined') {
			// console.log("  Skipping: layer=", !!layer, "layer.fields=", !!layer?.fields, "dynamicJSON=", typeof dynamicJSON);
			return;
		}

		var layerType = layer.maptype || layer.layerType;
		// console.log("  Layer type:", layerType);
		
		// Check if footerfields are configured for this layer type
		if (layerType && dynamicJSON[layerType] && 
		    dynamicJSON[layerType].footerfields && 
		    dynamicJSON[layerType].usefooteralias === true) {
			
			// console.log("  Found footerfields for", layerType, "- injecting", layer.fields.length, "fields");
			var injected = 0;
			var skipped = 0;
			
			layer.fields.forEach(function(field) {
				// Only inject if geodatabase alias is not already set
				// (by observation, when alias equals field name, it's not set)
				if (field.alias === field.name || 
				    field.alias === undefined || 
				    field.alias === "" || 
				    field.alias === null) {
					
					var configJsAlias = dynamicJSON[layerType].footerfields[field.name];
					if (configJsAlias) {
						// console.log("    Setting field", field.name, "alias to:", configJsAlias);
						field.alias = configJsAlias;
						injected++;
					} else {
						// console.log("    Warning: no config.js alias found for", field.name);
						skipped++;
					}
				}
			});
			
			if (injected > 0) {
				console.log("[LEGEND] Injected " + injected + " field aliases for layer type: " + layerType);
			}
		} else {
			// console.log("  No footerfields configured for layer type:", layerType);
		}
	}

	return {
		injectFieldAliases: injectFieldAliases
	};
});
