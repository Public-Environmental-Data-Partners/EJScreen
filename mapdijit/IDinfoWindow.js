define(

    ['dojo/_base/declare',
        "dojo/_base/lang",
        "dojo/on",
        "dojo/dom-construct",
        'dijit/_Widget',
        'dijit/_Templated',
        'dijit/_WidgetBase',
        'dijit/_TemplatedMixin',
        'dijit/_WidgetsInTemplateMixin',
        'dojo/Evented',
        "dojox/layout/FloatingPane",
        "dojo/text!mapdijit/templates/IDinfoWindow.html",
        "esri/geometry/support/webMercatorUtils",
        "esri/geometry/geometryEngine",
        "esri/layers/GraphicsLayer",
        "esri/layers/FeatureLayer",
        "esri/Graphic",
        "esri/PopupTemplate",
        "./mapdijit/EJinfoWindow.js"
    ],
    function(
        declare,
        lang,
        on,
        domConstruct,
        _Widget,
        _Templated,
        _WidgetBase,
        _TemplatedMixin,
        _WidgetsInTemplateMixin,
        Evented,
        FloatingPane,
        dijittemplate,
        webMercatorUtils,
        geometryEngine,
        GraphicsLayer,
        FeatureLayer,
        Graphic,
        PopupTemplate,
        EJinfoWindow
    ) {       

        var pointsym = { // symbol used for points
            type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
            style: "cross",
            color: "rgba(255, 0, 255, 1.0)",
            size: "12px",
            outline: { // autocasts as new SimpleLineSymbol()
                color: "rgba(255, 0, 255, 1.0)",
                width: 1 // points
            }
        };
        var linesym = { // symbol used for polylines
            type: "simple-line", // autocasts as new SimpleMarkerSymbol()
            color: "#ff0000",
            width: "2",
            style: "solid"
        };
        var polysym = { // symbol used for polygons
            type: "simple-fill", // autocasts as new SimpleMarkerSymbol()
            color: "rgba(0, 255, 0, 0.25)",
            style: "solid",
            outline: {
                color: "red",
                width: 2
            }
        };

        function getEnvText(invalue,digsig) {
            invalue = parseFloat(invalue);
            digsig = parseInt(digsig);
            var invaluestr = roundNumber(invalue,0) + "";
            var dint = invaluestr.length;
        
            var v = 0;
            if (invalue > 0) {
                if (dint <= 2) {
                    var dig = digsig - 1 - Math.floor(Math.log(Math.abs(invalue)) / Math.log(10));
                    //v = invalue.toFixed(dig);
                    v = roundNumber(invalue,dig);
                    //alert(invalue + ": " + dig);
                    //v = Math.round(invalue,digsig - 1 - (parseInt(Math.log(Math.abs(invalue))) / Math.log(10)));
                } else {
                   var m = dint - 2;
                    v = Math.round(invalue / Math.pow(10, m)) * Math.pow(10, m);
                }
            }
            return v;
        }

        var IDinfoWindow = declare([_WidgetBase, _TemplatedMixin], {
            templateString: dijittemplate,

            constructor: function(options) {
                this.mapview = options.view;
                this.idgraphic = options.idgraphic;
                this.removefooter = options.removefooter;
                

            },

            startup: function() {
                this.inherited(arguments);

            },
            postCreate: function() {
                var feat = this.idgraphic;
                var templatestr = "";
                console.log(feat)
                for (var prop in feat.attributes) {
                    var fldvalue = feat.attributes[prop];
                    console.log(fldvalue)
                    var proplabel = prop;
                    //if feature has layer info try to get alias for the field instead of default field name

                     //built in fieldInfos template setting doesn't work since the id function overrides the popup content so 'content' is not used
                     //ideally would have id popup somehow still use content string and use the fieldinfos from the API, manually setting decimals instead
                     //this won't work since not using 'content':
                    //if (suggestservices[sugid].fieldInfos) infoTemplate.fieldInfos = suggestservices[sugid].fieldInfos;
                    //infoTemplate.fieldInfos = [{fieldName:'PCT_BROADBAND',format:{places:3}}];
                    if (feat.layer){
                        
                    	//get fieldInfos from config if set
                    	var lyrcfgnm = feat.layer.id.replace("_map","");
                    	if (suggestservicesFieldDecimalPlacesNAMES[lyrcfgnm]){
                    		var fldInf = suggestservicesFieldDecimalPlacesNAMES[lyrcfgnm];
                    		if (prop in fldInf){
                    			var decs = fldInf[prop];
                    			if (fldvalue != 0){
                    				fldvalue = fldvalue.toFixed(decs);
                    			}
                    		} 

                    	}
                        console.log(fldvalue)
                        var fldObj = feat.layer.fieldsIndex.get(prop);

                        if (fldObj) {                                            
                    	 
                            var al = fldObj.alias;                    
                        	if (al) {
                            	proplabel = al;
                        	}
                        }

                        if (feat.layer.maptype == "ejscreen"){
                            //handle ejscreen ID here - used to be done in layout_new when it was map server image
                            //console.log("EJSCREEN LABELING")
                            console.log("[MAIN_INFO_WINDOW] Processing ejscreen layer field:", fldObj.name);
                            console.log(fldObj)
                            var pctpattern = /^pct_/i;
                            var lyType = feat.layer.maptype
                            var formatObj = ejIdentifyJSON[feat.sourceLayer.renderField]
                            var fldobj = fldObj;
                            var prop = fldObj.name;
                            var falias = al;
                            //if footerfields are set in config, use those alias values for the alias instead of from service
                            //only apply if the usefooteralias is true, otherwise skip and use alias from service
                            if (dynamicJSON[lyType].footerfields[prop] && dynamicJSON[lyType].usefooteralias == true) {
                                console.log("[MAIN_INFO_WINDOW] Using footerfield alias for:", prop);
                                falias = dynamicJSON[lyType].footerfields[prop];
                            }
                            
                            // don't include "B_" properties as these are map bin values
                            if (fldObj.name.includes("B_")){
                                continue
                            }
                            // switch "Map popup text" "T_" for "Percentile"
                            if (falias.includes("Map popup text")) {
                                falias = falias.replace("Map popup text for", "")
                            }
    
                            var fldvalue = fldvalue;
                            if (fldvalue == null) fldvalue = "N/A";
                            console.log(fldvalue)
                            if (
                                (pctpattern.test(prop) || prop == "POP_DEN") &&
                                typeof fldvalue == "number"
                            ) {
                                fldvalue = fldvalue.toFixed(2);
                            }
                            
                            if (lyType == "ejscreen" || lyType == "ejscreen_supp" || lyType == "ejscreen_multi" || lyType === "health") {
                                
                                //override default alias if set in formatter
                                if (formatObj && formatObj.formatter && formatObj.formatter.aliasnew && formatObj.formatter.aliasnew[prop] ){							
                                    falias = formatObj.formatter.aliasnew[prop];							
                                }
                                //append optional values to alias
                                //prefix text
                                if (formatObj && formatObj.formatter && formatObj.formatter.prefixtext && formatObj.formatter.prefixtext[prop]  ){
                                    falias = formatObj.formatter.prefixtext[prop] + " " + falias;						
                                }
                                //suffix text
                                if (formatObj && formatObj.formatter && formatObj.formatter.suffixtext && formatObj.formatter.suffixtext[prop]  ){
                                    falias += " " + formatObj.formatter.suffixtext[prop];							
                                }	
                                //adjust pct values by multiple if needed
                                if (formatObj && formatObj.formatter && formatObj.formatter.multiplier && formatObj.formatter.multiplier[prop] ){
                                    if (typeof fldvalue === 'number') {//skip if N/A or non-numeric					
                                        fldvalue = fldvalue * formatObj.formatter.multiplier[prop];	
                                    }							
                                }				
                                console.log(fldvalue)		
                                //format p_env using significant digit rounding to match SOE
                                if (formatObj && formatObj.formatter && formatObj.formatter.signifdigits){
                                    if (typeof fldvalue === 'number') {//skip if N/A or non-numeric			
                                            console.log(prop)						
                                            fldvalue = getEnvText(fldvalue,formatObj.formatter.signifdigits[prop])						
                                    }							
                                }
                                console.log(fldvalue)	
                                //format values to round to match return from SOE
                                if (formatObj && formatObj.formatter && formatObj.formatter.roundplaces){
                                    if (typeof fldvalue === 'number') {//skip if N/A or non-numeric									
                                            fldvalue = fldvalue.toFixed(formatObj.formatter.roundplaces[prop]);						
                                    }							
                                }
                                console.log(fldvalue)	
                                //format decimal places or round p_env using significant digit rounding to match SOE
                                if (formatObj && formatObj.formatter && formatObj.formatter.ispercent){	
                                    if (typeof fldvalue === 'number') {//skip if N/A or non-numeric		
                                            fldvalue = Math.round(fldvalue);
                                    }
                                }
                                console.log(fldvalue)			
                                //NOTE: do any string operations to fldvalue after above, all above assumes number, after this all are string operations.
                                
                                //for all number values, format to show comma if > 1000
                                if (typeof fldvalue === 'number') {
                                    fldvalue = fldvalue.toLocaleString("en-US");
                                }
                                console.log(fldvalue)	
    
                                
                                //append optional units to value
                                if (formatObj && formatObj.formatter && formatObj.formatter.units && formatObj.formatter.units[prop] ){						
                                    fldvalue += " " + formatObj.formatter.units[prop];							
                                }
                                console.log(fldvalue)	
                                //append optional % to value
                                if (formatObj && formatObj.formatter && formatObj.formatter.pctsign && formatObj.formatter.pctsign[prop] ){						
                                    fldvalue += " " + formatObj.formatter.pctsign[prop];							
                                }
                                console.log(fldvalue)	
                            }
                            proplabel = falias
    
                        }

                	} else {
                    //not a feature layer, look up by alias. Map layer passes in aliases only
                    //currently cannot get layer name, look for any alias in alias object list
                            if (prop in suggestservicesFieldDecimalPlacesALIASES){
                                var decs = suggestservicesFieldDecimalPlacesALIASES[prop];
                                if (fldvalue != 0){
                                    //when not feature layer number are string, convert back to number before set decimals
                                    fldvalue = parseFloat(fldvalue).toFixed(decs);

                                }
                            } 
                    }

                    // Label everything here - first testing whether it's a link
                    var httpreg = /^https?:/i;
                    if (httpreg.test(fldvalue)) {
                        templatestr += proplabel + ": <a href='" + fldvalue + "' target=_blank>More info</a></br>";
                    } else if ((prop.toLowerCase().indexOf("shape") != 0) && (prop.toLowerCase().indexOf("objectid") != 0)) {
                        templatestr += proplabel + ": " + fldvalue + "</br>";
                    }
                }

                
                if (templatestr == "") {
                    this.idinfoNode.style.display = "none";
                } else {
                    this.idinfoNode.style.display = "block";
                    this.idinfoNode.innerHTML = templatestr;
                     
                    //console.log("templatestr");
                    //console.log(templatestr);
                }
                var showConvertBtn = true;

                if (feat.geometry.type == "polygon") {
                    if (feat.geometry.rings.length > 1) {
                        showConvertBtn = false; // no reports on multipart polygons?
                    } else {
                        var geom = feat.geometry;
                        if (geom.spatialReference.wkid == "102100") geom = webMercatorUtils.webMercatorToGeographic(feat.geometry);
                        var polyarea = geometryEngine.geodesicArea(geom, "square-miles");

                        if (polyarea > arealimit) {
                            //alert("The defined area is too large for analysis. Please change the project area or buffer distance.");
                            showConvertBtn = false;
                        } else {
                            showConvertBtn = true; 
                        }
                    }
                }
                if (showConvertBtn) {
                    this.idbtnNode.disabled = false;
                    this.idnoteNode.style.display = "none";
                    this.idbtnNode.style.color = "#000";
                } else {
                    this.idbtnNode.disabled = true;
                    //this.idnoteNode.style.display = "none";
                    //make the button text appear disabled as well
                    this.idbtnNode.style.color = "#999";
                }
               // if(this.removefooter){
                   // $(".esri-popup__footer").css("display", "none");
               // }

            },

            _convertGraphic: function() {
                this.mapview.popup.close();
                var feature = this.idgraphic;
                var defaultradius = 1;
                switch (feature.geometry.type) {
                    case "point":
                        symbol = pointsym;
                        break;
                    case "polygon":
                        defaultradius = 0;
                        symbol = polysym;
                        break;
                    case "polyline":
                        symbol = linesym;
                        break;
                }
               
                var mgeometry = feature.geometry;
                var graphic = new Graphic(mgeometry);
                var gcounter = 0;
                var layerid = "Project" + gcounter;
                do {
                    gcounter = gcounter + 1;
                    layerid = "Project" + gcounter;
                } while ((this.mapview.map.findLayerById(layerid) != null))

                graphic.attributes = { "id": gcounter, "gtype": graphic.geometry.type, "radius": defaultradius.toString(), "unit": "miles", "ptitle": "" };
                var dlayer = new FeatureLayer({
                    id: layerid,
                    source: [graphic],
                    title: "Project " + gcounter,
                    objectIdField: "id",
                    outFields: ['*'],
                    fields: [{
                            name: "id",
                            type: "oid"
                        },
                        {
                            name: "gtype",
                            type: "string"
                        },

                        {
                            name: "radius",
                            type: "string"
                        },
                        {
                            name: "unit",
                            type: "string"
                        },
                        {
                            name: "ptitle",
                            type: "string"
                        }
                    ],
                    popupTemplate: {
                        title: "EJScreen Reports and Charts",
                        content: lang.hitch(this, this.drawDesc)
                    },
                    renderer: {
                        type: "simple",
                        symbol: symbol
                    }
                });
                dlayer.layerType = "digitize";
                this.view.map.add(dlayer);

                var gtype = graphic.geometry.type;
                var cpoint;
                if (gtype == "point") {
                    cpoint = graphic.geometry;
                } else if (gtype == "polyline") {
                    cpoint = mgeometry.extent.center;
                } else {
                    cpoint = mgeometry.centroid;
                }
                this.mapview.popup.open({ features: [graphic], location: cpoint });


            },
            drawDesc: function(e) {
                if (dijit.registry.byId("infowg")) {
                    dijit.byId("infowg").destroy();
                    dijit.registry.remove("infowg");

                }
                //alert(igraphic.attributes["descinfo"]);
                var infowidget = new EJinfoWindow({
                    view: this.mapview,
                    inGraphic: e.graphic,
                    id: 'infowg'
                }, domConstruct.create('div'));
                infowidget.startup();

                return infowidget.domNode;

            },
            destroy: function() {
                dojo.empty(this.domNode);
                this.inherited(arguments);
            }
        });

        return IDinfoWindow;

    });