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
        "esri/geometry/support/webMercatorUtils",
        "esri/geometry/geometryEngine",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/layers/FeatureLayer",
        "esri/tasks/PrintTask",
        "esri/tasks/support/PrintTemplate",
        "esri/tasks/support/PrintParameters",
        "esri/tasks/QueryTask",
        "esri/tasks/support/Query",
        "esri/tasks/support/LegendLayer",
        "dojo/text!mapdijit/templates/EJinfoWindow.html"

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
        webMercatorUtils,
        geometryEngine,
        Graphic,
        GraphicsLayer,
        FeatureLayer,
        PrintTask,
        PrintTemplate,
        PrintParameters,
        QueryTask,
        Query,
        LegendLayer,
        dijittemplate

    ) {

        var reportsJSON = {
            "ejschart": { "description": "Compare indexes or indicators...", "reporturl": "ejscreen_report.aspx", "category": "ejscreen" },
            "ejsrpt": { "description": "Get EJScreen report...", "reporturl": (window.EJAM_API_BASE || "https://ejamapi-84652557241.us-central1.run.app") + "/report", "category": "ejscreen" },
			"acs2022": { "description": "Get 2018-2022 ACS report...", "reporturl": "demogreportpdf.aspx?report=acs2022", "category": "demog" },
            "acs2021": { "description": "Get 2017-2021 ACS report...", "reporturl": "demogreportpdf.aspx?report=acs2021", "category": "demog" },
            "acs2019": { "description": "Get 2015-2019 ACS report...", "reporturl": "demogreportpdf.aspx?report=acs2019", "category": "demog" },
            "acs2018": { "description": "Get 2014-2018 ACS report...", "reporturl": "demogreportpdf.aspx?report=acs2018", "category": "demog" },
            "acs2017": { "description": "Get 2013-2017 ACS report...", "reporturl": "demogreportpdf.aspx?report=acs2017", "category": "demog" },
            "acs2015": { "description": "Get 2011-2015 ACS report...", "reporturl": "demogreportpdf.aspx?report=acs2015", "category": "demog" },
            "acs2012": { "description": "Get 2008-2012 ACS report...", "reporturl": "demogreportpdf.aspx?report=acs2012", "category": "demog" },
            "demog2010": { "description": "Get 2010 Census report...", "reporturl": "demogreportpdf.aspx?report=census2010sf1", "category": "demog" },
            "demog2000": { "description": "Get 2000 Census report...", "reporturl": "demogreportpdf.aspx?report=census2000sf3", "category": "demog" },
            "cdcReport": { "description": "Get CDC Census report...", "reporturl": "https://ephtracking.cdc.gov/InfoByLocation?&FIPS=", "category": "cdc" }

        };

        var notavailableMessage = "CDC report is not available for Puerto Rico!";
        var popupblockedMessage = "Popup window was blocked.";

        var a = dojo.create("link", { type: "text/css", rel: "stylesheet", href: "mapdijit/css/ejreport.css" });
        dojo.doc.getElementsByTagName("head")[0].appendChild(a);



        var EJinfoWindow = declare([_WidgetBase, _TemplatedMixin], {
            templateString: dijittemplate,

            widgetsInTemplate: true,
            currentGraphic: null,
            constructor: function(options, srcRefNode) {

                options = options || {};

                //if (!options.view) throw new Error("no map defined in params.");

                this.mapview = options.view;

                this.currentGraphic = options.inGraphic;

                // mixin constructor options 
                dojo.safeMixin(this, options);


            },

            startup: function() {



            },
            postCreate: function() {

                var graphic = this.currentGraphic;
                var desc = "";
                var coordstr;
                var defaultradius = 0;
                var gtype = graphic.attributes["gtype"];
                if ((gtype == "bg") || (gtype == "enterbg") || (gtype == "find")) {
                    if (graphic.attributes) {
                        desc = "Blockgroup " + graphic.attributes["fips"];
                        coordstr = graphic.attributes["fips"];
                        this.bufferNode.style.display = "none";
                    } else if (graphic.geometry.type == "point") {
                        var mgeometry = graphic.geometry;
                        var geometry = mgeometry;
                        if (mgeometry.spatialReference.wkid == "102100") geometry = webMercatorUtils.webMercatorToGeographic(mgeometry);
                        coordstr = geometry.x + "," + geometry.y;
                        desc = "Coordinates: " + geometry.y.toFixed(6) + "," + geometry.x.toFixed(6);
                        defaultradius = 1;
                        this.bufferNode.style.display = "block";
                    }
                } else if (this._isKnownGeo(gtype)) {
                    var fdesc = typelookup[gtype].description;
                    desc = fdesc + ": " + graphic.attributes["fips"];
                    coordstr = graphic.attributes["fips"];
                    this.bufferNode.style.display = "none";
                    //this.demog2010Node.style.display = "none";
                    //this.demog2000Node.style.display = "none";
                } else {
                    this.bufferNode.style.display = "block";
                    var mgeometry = graphic.geometry;

                    var geometry = mgeometry;
                    if (mgeometry.spatialReference.wkid == "102100") geometry = webMercatorUtils.webMercatorToGeographic(mgeometry);

                    switch (geometry.type) {
                        case "point":
                            coordstr = geometry.x.toFixed(6) + "," + geometry.y.toFixed(6);
                            desc = "Coordinates " + geometry.y.toFixed(6) + "," + geometry.x.toFixed(6);
                            defaultradius = 1;
                            break;
                        case "polyline":
                            coordstr = "";
                            var coordsarray = geometry.paths[0];
                            var ccount = coordsarray.length;

                            for (var m = 0; m < ccount; m++) {
                                var lon1 = coordsarray[m][0];
                                var lat1 = coordsarray[m][1];
                                if (m > 0) coordstr = coordstr + ",";
                                coordstr = coordstr + lon1.toFixed(6) + "," + lat1.toFixed(6);

                            }
                            var tdist = geometryEngine.geodesicLength(geometry, "miles");

                            desc = "Length " + tdist.toFixed(2) + " miles";

                            defaultradius = 1;
                            break;
                        case "polygon":
                            coordstr = "";
                            var coordsarray = geometry.rings[0];
                            var ccount = coordsarray.length;

                            for (var m = 0; m < ccount; m++) {
                                var lon1 = coordsarray[m][0];
                                var lat1 = coordsarray[m][1];
                                if (m > 0) coordstr = coordstr + ",";
                                coordstr = coordstr + lon1.toFixed(6) + "," + lat1.toFixed(6);

                            }
                            var tarea = geometryEngine.geodesicArea(geometry, "square-miles");

                            desc = "Area " + tarea.toFixed(2) + " sq. miles";

                            defaultradius = 0;
                            break;

                    }
                }

                var titlevalue = "";

                var radiusvalue = defaultradius;
                var unitvalue = "miles";
                if (graphic.attributes) {
                    if (graphic.attributes["ptitle"]) titlevalue = graphic.attributes["ptitle"];
                    else graphic.attributes["ptitle"] = titlevalue;

                    if (graphic.attributes["radius"]) radiusvalue = graphic.attributes["radius"];
                    else graphic.attributes["radius"] = radiusvalue;
                    if (graphic.attributes["unit"]) unitvalue = graphic.attributes["unit"];
                    else graphic.attributes["unit"] = unitvalue;
                }
                this.coordNode.value = coordstr;
                this.gtypeNode.value = gtype;

                this.unitNode.value = unitvalue;
                this.distNode.value = radiusvalue;
                this.titleNode.value = titlevalue;


            },
            _isKnownGeo: function(gtype) {
                var isGeo = false;
                for (var g in typelookup) {
                    if (g == gtype) isGeo = true;
                }
                return isGeo;
            },
            _setValue: function(e) {
                var v = e.target.value;

                var name = e.target.name;
                if (name == "radius") {
                    if (isNaN(v)) {
                        alert("Please enter numeric value");
                        e.target.value = "";
                        return false;
                        //            } else {
                        //                
                        //                if (v > 5) {
                        //                    alert("Currently the buffer limit is set to 5 miles. Please enter a value less than 5");
                        //                    e.target.value = "";
                        //                    return false;
                        //                }
                    }
                }

                this.currentGraphic.setAttribute(name, v);
                var featurelayer = this.currentGraphic.layer;
                featurelayer.applyEdits({
                    updateFeatures: [this.currentGraphic]
                });
                if (name == "ptitle") {
                    featurelayer.title = v;
                }
            },

            _addBuffer2Map: function() {
                var bgraphic = this.currentGraphic;
                var glayer;
                if (this.mapview.map.findLayerById("bufferlayer")) {
                    glayer = this.mapview.map.findLayerById("bufferlayer");
                } else {
                    glayer = new GraphicsLayer({ id: "bufferlayer", title: "Buffer graphics" });
                    this.mapview.map.add(glayer);
                }


                var buffid = "buffer" + bgraphic.attributes["id"];

                glayer.graphics.map(function(graphic) {

                    var idvalue = graphic.attributes["id"];
                    if (idvalue == buffid) {
                        glayer.remove(graphic);

                    }
                });
                var buff = this.distNode.value;
                if (buff.length > 0) {
                    buff = parseFloat(buff);
                } else {
                    buff = 0
                }
                if (buff > 0) {
                    var distUnits = this.unitNode.value;


                    var buffer = geometryEngine.geodesicBuffer(bgraphic.geometry, buff, distUnits);
                    var polySym = { // symbol used for polygons
                        type: "simple-fill", // autocasts as new SimpleMarkerSymbol()
                        color: "rgba(255, 255, 0, 0.2)",
                        style: "solid",
                        outline: {
                            color: "rgba(255, 0, 0, 0.65)",
                            width: 1
                        }
                    };

                    var att = { "id": buffid };
                    var bufgraphic = new Graphic({
                        geometry: buffer,
                        attributes: att,
                        symbol: polySym
                    });


                    glayer.add(bufgraphic);
                }


            },


            _deleteGraphic: function(e) {
                this.mapview.popup.visible = false;
                var digiLayer = this.currentGraphic.layer;
                if (digiLayer != null) {
                    // this.mapview.popup.close();
                    this.mapview.map.remove(digiLayer);
                    if (this.mapview.map.findLayerById("bufferlayer")) {
                        var blayer = this.mapview.map.findLayerById("bufferlayer");
                        var gid = this.currentGraphic.attributes["id"];
                        var bfid = "buffer" + gid;

                        blayer.graphics.map(function(graphic) {
                            var idvalue = graphic.attributes["id"];
                            if (idvalue == bfid) {
                                blayer.remove(graphic);

                            }
                        });

                    }

                }
            },
            _showCharts: function(e) {
                var vd = this.validateDistance();
                if (vd === false) {
                    alert("Please specify buffer greater than 0 for point or line!");
                    return false;
                }


                var graphic = this.currentGraphic;
                if (dojo.byId('sidefloater').style.visibility === 'hidden') {
                    //closeAllPanels();
                    dijit.byId('sidefloater').show();
                }
                dijit.byId('ejwg')._showEJpane(graphic);

            },
            _addToMultisite: function(e) {
                // Snapshot the current selection into the multisite basket (multisite.js).
                // Mirrors getEJReport()'s per-type parsing of the popup form/graphic.
                if (typeof window.EJmultisite === "undefined") { return; }
                var frm = document.getElementById("infoform");
                var gtype = frm.type.value;
                var geomString = frm.coords.value;
                var label = (frm.ptitle && frm.ptitle.value) ? frm.ptitle.value : "";
                var radius = (frm.radius && frm.radius.value) ? parseFloat(frm.radius.value) : 0;

                if (this._isKnownGeo(gtype)) {
                    // "Select an Area": attributes.fips may be a comma-separated list of
                    // up to 5 codes; add each as its OWN site (each FIPS is separate).
                    var namestr = this.currentGraphic.attributes["fips"];
                    if (namestr === null || namestr === undefined || String(namestr).trim() === "") {
                        alert("This selected area has no FIPS code to add.");
                        return;
                    }
                    var fipsList = String(namestr).split(",");
                    for (var i = 0; i < fipsList.length; i++) {
                        var f = fipsList[i].trim();
                        if (f && f !== "undefined") { window.EJmultisite.add({ type: "fips", label: (label || f), fips: f }); }
                    }
                } else if (gtype == "point") {
                    if (!(parseFloat(radius) > 0)) {
                        alert("Please specify a buffer greater than 0 before adding a point.");
                        return;
                    }
                    var p = geomString.split(",");
                    var plon = parseFloat(p[0]), plat = parseFloat(p[1]);
                    if (!isFinite(plon) || !isFinite(plat)) {
                        alert("This point has invalid coordinates.");
                        return;
                    }
                    window.EJmultisite.add({ type: "point", label: label, lon: plon, lat: plat, radius: radius });
                } else if (gtype == "polygon") {
                    var matches = geomString.match(/[^,]+,[^,]+/g);
                    if (!matches || matches.length < 3) {
                        alert("This area doesn't have enough points to form a polygon.");
                        return;
                    }
                    var listCoords = [];
                    for (var j = 0; j < matches.length; j++) {
                        var pp = matches[j].split(",");
                        var cx = parseFloat(pp[0]), cy = parseFloat(pp[1]);
                        if (!isFinite(cx) || !isFinite(cy)) { continue; }  // skip malformed coords
                        listCoords.push([cx, cy]);
                    }
                    if (listCoords.length < 3) {
                        alert("This area doesn't have enough valid points to form a polygon.");
                        return;
                    }
                    // GeoJSON polygon rings must be closed (first point == last point).
                    var first = listCoords[0], last = listCoords[listCoords.length - 1];
                    if (first[0] !== last[0] || first[1] !== last[1]) { listCoords.push([first[0], first[1]]); }
                    var feature = { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [listCoords] } };
                    window.EJmultisite.add({ type: "polygon", label: label, feature: feature, radius: radius });
                } else {
                    alert("This selection type can't be added to a multisite list yet.");
                }
            },
            _getEJscreen: function(e) {
                var rptid = e.target.id;
                var url = reportsJSON[rptid].reporturl;
                /* var newWindow = window.open();
                if (!newWindow) {
                    alert(popupblockedMessage);
                    return false;
                    //} else {
                    //    newWindow.close();
                } */
                //newWindow.document.write("Loading...Please wait!");
                var vd = this.validateDistance();
                if (vd === false) {
                    alert("Please specify buffer greater than 0 for point or line!");
                    return false;
                }


                var wobj = this;
                wobj.getEJReport(url);
                // PRINT OPTIONS BELOW? 
                //var legend_layers = this.get_legend_layers();
                /* var lytmp = "A3 Landscape";

                var layoutOptions = {
                    'scalebarUnit': 'Miles',
					'titleText': " "
                        //'legendLayers': legend_layers
                };
                var printTask = new PrintTask({ url: localPrintService });		
					
				
                var template = new PrintTemplate();				
									
				
                template.exportOptions = {
                    width: 800,
                    height: 450,
                    dpi: 96
                };
                template.format = "PNG32";
                template.layout = lytmp;
                //template.layout = "MAP_ONLY";
                template.layoutOptions = layoutOptions;
                template.scalePreserved = true;
                template.showAttribution = false;

                var params = new PrintParameters();
				//RW 4/24/24 - custom basemap has token issue on report print, force to esri street for now				
                params.view = this.mapview;
				//params.view.map.basemap = "streets-vector";
                params.template = template;
                //alert(params.toJson().Web_Map_as_JSON);

                printTask.execute(params).then(function(result) {
                        if (result.url) {
                            document.getElementById("mapimageurl").innerHTML = result.url;
                            wobj.getEJReport(url, newWindow);
                        }
                    },
                    function(err) {
                        console.log("error occurred when generating map image: " + err);
                        document.getElementById("mapimageurl").innerHTML = "";
                        wobj.getEJReport(url, newWindow);

                    }); */

            },
            get_legend_layers: function() {
                var legend_layers = Array();
                for (let i = 0; i < this.mapview.map.layers.length; i++) {
                    var lname = this.mapview.map.layers.items[i].title;
                    if (this.mapview.map.layers.items[i].visible) {
                        if (this.mapview.map.layers.items[i].type != "graphics") {
                            if (this.mapview.map.layers.items[i].layerType) {
                                if (this.mapview.map.layers.items[i].layerType == "digitize") {
                                    var ll = new LegendLayer();
                                    ll.layerId = this.mapview.map.layers.items[i].id;
                                    legend_layers.push(ll);
                                } else {
                                    var ll = new LegendLayer();
                                    ll.layerId = this.mapview.map.layers.items[i].id;
                                    ll.title = lname;
                                    legend_layers.push(ll);
                                }
                            } else {
                                var ll = new LegendLayer();
                                ll.layerId = this.mapview.map.layers.items[i].id;
                                ll.title = lname;
                                legend_layers.push(ll);
                            }
                        }
                    }

                }

                return legend_layers;
            },
            validateDistance: function() {
                var frm = document.getElementById("infoform");
                var gtype = frm.type.value;
                var radius = frm.radius.value;

                var emptyreg = /^\s*$/;
                if (emptyreg.test(radius)) radius = 0;
                if (((gtype == "point") || (gtype == "polyline")) && (parseFloat(radius) == 0)) return false;
                else return true;
            },
            getEJReport: function(url) {
                //alert("url:" + url)
                var frm = document.getElementById("infoform");

                //construct query here
                var html = "?"; //query
                //console.log("url", url)
                //html = html + "<html><head></head><body><form id='formid' method='get' action='" + url + "'>"; //switch to get for now
                var gtype = frm.type.value;
                var geomString = frm.coords.value;
                //var ptitle = frm.ptitle.value;
                //html = html + "<input type='hidden' name='coords' value='" + geomString + "' />";
                //html = html + "<input type='hidden' name='feattype' value='" + gtype + "' />";
                //html = html + "<input type='hidden' name='ptitle' value='" + ptitle + "' />";
                if (this._isKnownGeo(gtype)) {
                    var namestr = this.currentGraphic.attributes["fips"]; // FIPS
                    html = html + "fips="+namestr
                } else if (gtype == "point"){
                    var partsOfStr = geomString.split(',');
                    html = html + "lon=" + parseFloat(partsOfStr[0]) + "&" + "lat=" + parseFloat(partsOfStr[1])
                } else if ((gtype == "polygon") || (gtype == "polyline")) { //seprate out points and do lat/lon instead of shape
                    // split at commas and join every two items
                    var matches = geomString.match(/[^,]+,[^,]+/g);
                    var listCoords = [];
                    for (i in matches) {
                        var partsOfStr = matches[i].split(',');
                        var pair = [parseFloat(partsOfStr[0]),parseFloat(partsOfStr[1])];
                        listCoords.push(pair)
                    }
                    gtype = gtype == "polyline" ? "LineString" : "Polygon"
                    listCoords = gtype == "LineString" ? listCoords : [listCoords] // if line, don't need outer list
                    var geojson = {
                        "type": "FeatureCollection",
                        "features": [
                          {
                            "type": "Feature",
                            "properties": {},
                            "geometry": {
                              "coordinates": listCoords,
                              "type": gtype
                            }
                          }
                        ]
                      }
                    html = html + "shape=" + JSON.stringify(geojson)
                    //var radius = frm.radius.value;
                    //var unit = frm.unit.value;
                    //var unitcode = bufferunits[unit].esricode;
                    //html = html + "<input type='hidden' name='radius' value='" + radius + "' />";
                    //html = html + "<input type='hidden' name='unit' value='" + unit + "' />";
                    //html = html + "<input type='hidden' name='unitcode' value='" + unitcode + "' />";
                }
                if (frm.radius.value){
                    var buffer = frm.radius.value;
                    html = html + "&buffer=" + buffer;
                }
                //html = html + "<input type='hidden' name='distunits' value='" + distUnit + "' />";
                //html = html + "</form><script type='text/javascript'>document.getElementById('formid').submit();</script></body></html>";
                //myWindow.document.write(html);
                console.log("query", url+html)
                // jQuery async request
/*                 $.ajax(
                    {
                        url: url + html,
                        type: "GET", 
                        dataType: "html",
                        success: function(data) {
                            myWindow.document.write(data);
                        },
                        error: function(e) 
                        {
                            alert('Error: ' + e);
                        }
                    }); */
                // ajax doesn't work locally?
                var html2 = "<html><body><form method='get' id='fid' action=''> \
                <input type='hidden' value='Submit' onclick='window.open("+''+")'></form> \
                <script type='text/javascript'> \
                    document.getElementById('fid').action = url+html; \
                    document.getElementById('fid').submit(); \
                </script>"
                //console.log(html2)
                //myWindow.document.write(html2);
                window.open(url+html)
            },
            _getDemogReport: function(e) {
                var vd = this.validateDistance();
                if (vd === false) {
                    alert("Please specify buffer greater than 0 for point or line!");
                    return false;
                }
                var demogid = e.target.id;
                var url = reportsJSON[demogid].reporturl;

                var graphic = this.currentGraphic;



                var inGeom = graphic.geometry;
                var frm = document.getElementById("infoform");
                var geomstring = frm.coords.value;
                var gtype = frm.type.value;
                var radius = frm.radius.value;
                var unit = frm.unit.value;
                var unitcode = bufferunits[unit].esricode;
                var wobj = this;
                if (gtype == "bg") {
                    coordstr = "";
                    var geometry = inGeom;
                    if (inGeom.spatialReference.wkid == "102100") geometry = webMercatorUtils.webMercatorToGeographic(inGeom);
                    var coordsarray = geometry.rings[0];
                    var ccount = coordsarray.length;

                    for (var m = 0; m < ccount; m++) {
                        var lon1 = coordsarray[m][0];
                        var lat1 = coordsarray[m][1];
                        if (m > 0) coordstr = coordstr + ",";
                        coordstr = coordstr + lon1.toFixed(6) + "," + lat1.toFixed(6);

                    }
                    gtype = "polygon";
                    wobj.postBG(url, coordstr, gtype);
                } else if (this._isKnownGeo(gtype)) {
                    coordstr = graphic.attributes["fips"];
                    wobj.postBG(url, coordstr, gtype);

                } else {


                    wobj.postReport(url);



                }
            },
            _getCDCReport: function(e) {

                var vd = this.validateDistance();
                if (vd === false) {
                    alert("Please specify buffer greater than 0 for point or line!");
                    return false;
                }

                //get event items to pass to result call
                var event = e;
                var x;
                var y;
                if (event.x != undefined && event.y != undefined) {
                    x = event.clientX;
                    y = event.clientY;

                } else // Firefox method to get the position
                {
                    x = event.clientX + document.body.scrollLeft +
                        document.documentElement.scrollLeft;
                    y = event.clientY + document.body.scrollTop +
                        document.documentElement.scrollTop;
                }
                var demogid = e.target.id;



                //buffer geom if needed
                var bgraphic = this.currentGraphic;
                var geometry = bgraphic.geometry;

                //if county, bypass second query and call by fips directly
                var frm = document.getElementById("infoform");
                var gtype = frm.type.value;               
                if (gtype == "county" && bgraphic.attributes["fips"]){
                	this.showCDCReportByCounty(bgraphic,demogid,x,y);                	                	                 
                }   
                else {    
                	//else get CDC report by querying county layer     
	                var buff = this.distNode.value;
	                var wobj = this;
	                if (buff.length > 0) {
	                    buff = parseFloat(buff);
	                } else {
	                    buff = 0
	                }
	                if (buff > 0) {
	                    var distUnits = this.unitNode.value;
	                    var buffer = geometryEngine.geodesicBuffer(bgraphic.geometry, buff, distUnits);
	                    this.showCDCReport(buffer, x, y, demogid);

	                } else {
	                    //buff poly with 0 distance
	                    this.showCDCReport(geometry, x, y, demogid);

	                }

                } 


            },
            showCDCReportByCounty: function(selectedGraphic,cdcItemID,screenX,screenY) {
                var wobj = this;
    			var url = reportsJSON[cdcItemID].reporturl;
                var fips = selectedGraphic.attributes["fips"];                		
				if (!(fips.includes(","))) {
					//calls CDC report with known single fips, PR is excluded. Avoids having to re-query service for fips
		            
		            var stfips = fips.slice(0,2); //parse out state fips
	            	//skip PR 
	                if (wobj.getStateByFIPS(stfips) == "PR") {
	                    alert(notavailableMessage);
	                } else {
	                    //else call report with fips in new window
	                    var newWindow = window.open(url + fips);
	                    if (!newWindow) {
	                        alert(popupblockedMessage);
	                    }
	                }                			
                } else {
                	//handle multi fips
                	var cntynames = selectedGraphic.attributes["names"];
                	var fipsAry = fips.split(",");
                	var cntynamesAry = cntynames.split(",");
                	var showcounty = false;
                    for (i = 0; i < fipsAry.length; i++) {
                        var stfips = fipsAry[i].slice(0,2);
                        //skip PR
                        if (wobj.getStateByFIPS(stfips) != "PR") showcounty = true;
                    }
                    if (showcounty) {                               

                        var cntyObjs = [];
                        for (i = 0; i < fipsAry.length; i++) {
                        	cntyObjs.push({"fips": fipsAry[i], "name": cntynamesAry[i], "stab": wobj.getStateByFIPS(fipsAry[i].slice(0,2))});           
                        }

                        var htmlBuild = wobj.getCountyMenuHTML(cntyObjs,url);                                      
						wobj.appendCountyMenu(htmlBuild,screenX,screenY);                   

                        
                    } else {
                        alert(notavailableMessage);
                    }

                }               
            	
            },
            showCDCReport: function(bufferedGeometry, screenX, screenY, cdcItemID) {
                //console.log(cdcItemID);
                var wobj = this;
                var url = reportsJSON[cdcItemID].reporturl;

                var bndUrl = countybndurl;
                    


                var queryTask = new QueryTask({ url: bndUrl });
                var query = new Query();
                query.geometry = bufferedGeometry;            



                query.returnGeometry = false;
                query.outFields = ["STCN", "CNTY_NAME", "STAB"];
                query.orderByFields = ["STAB", "CNTY_NAME"];



                queryTask.execute(query).then(function(result) {
                    if (result.features[0]) {
                        if (result.features.length == 1) {
                            var stab = result.features[0].attributes["STAB"];
                            if (stab == "PR") {
                                alert(notavailableMessage);
                            } else {
                                var ctfips = result.features[0].attributes["STCN"];
                                var newWindow = window.open(url + ctfips);
                                if (!newWindow) {
                                    alert(popupblockedMessage);
                                }
                            }
                        } else {
                            var showcounty = false;
                            for (i = 0; i < result.features.length; i++) {
                                var stab = result.features[i].attributes["STAB"];
                                if (stab != "PR") showcounty = true;
                            }
                            if (showcounty) {
                                

                                var cntyObjs = [];
                                for (i = 0; i < result.features.length; i++) {
                                	cntyObjs.push({"fips": result.features[i].attributes["STCN"], "name": result.features[i].attributes["CNTY_NAME"], "stab": result.features[i].attributes["STAB"]});           
                                }
 
								var htmlBuild = wobj.getCountyMenuHTML(cntyObjs,url);     
								wobj.appendCountyMenu(htmlBuild,screenX,screenY);                           


                                
                            } else {
                                alert(notavailableMessage);
                            }

                        }


                    } else {
                        alert("No county found");
                    }

                }).catch(function(error) {
                    console.log(error);
                });


            },
            getCountyMenuHTML: function(objArray, url) {
            	var htmlBuild = "";
                htmlBuild += "<div id='cdcHead' style='height:18px;color:#FFFFFF;background-color: #446485;padding:2px 0 0 5px;border-radius:5px 5px 0 0;font-size:12px'><img src='images/close.png' style='float:right;padding:2px 3px 3px 3px;' onclick='removecdc();'/>CDC Report</div>";
                htmlBuild += "<span style='padding:5px;font-weight:bold;font-size:10pt;'>Select county:</span>";

                htmlBuild += "<div id='cdcDetails' style='height:100px;overflow:auto;padding:0px 0px 0px 5px;border: 1px solid gray;margin:5px;'>";
                for (i = 0; i < objArray.length; i++) {                                       
                        htmlBuild += "<a style='font-size:10pt;font-family:Calibri;' target='_blank' href=" + url + objArray[i]["fips"] + ">" + objArray[i]["name"] + ", " + objArray[i]["stab"] + "</a><br/>";
                }
                htmlBuild += "</div>";
                htmlBuild += "<div id='cdcInfo' style='padding:0px 5px 5px 5px;'>";
                htmlBuild += "<p style='font-size:10pt;margin:0px;'>The area contains multiple counties (" + objArray.length + "). Select each individual county to view CDC report.</p>";
                htmlBuild += "</div>";

                return htmlBuild;


            },
            appendCountyMenu: function(htmlString,screenX,screenY) {
            	var offy = -175;
                var offx = -75;
                var x = screenX;
                var y = screenY;
            	if (document.getElementById("cdcMain")) {
                    var dummy = document.getElementById("cdcMain");
                    dummy.style.position = "absolute";
                    dummy.style.left = (x + offx) + "px";
                    dummy.style.top = (y + offy) + "px";
                    dummy.style.display = "block";
                    dummy.innerHTML = htmlString;
                } else {
                    var dummy = document.createElement("div");
                    dummy.id = "cdcMain";
                    dummy.style.position = "absolute";

                    dummy.style.left = (x + offx) + "px";
                    dummy.style.top = (y + offy) + "px";
                    dummy.innerHTML = htmlString;
                    dummy.style.display = "block";
                    dummy.style.zIndex = "1000";
                    dummy.style.height = "210px";
                    dummy.style.width = "250px";
                    dummy.style.background = "#dddddd";
                    dummy.style.padding = '0 0 0 0';


                    document.body.appendChild(dummy);
                }
            },
            postBG: function(url, coordstr, gtype) {

                var frm = document.getElementById("infoform");
                var geomstring = coordstr;

                var ptitle = frm.ptitle.value;

                var newWindow = window.open();
                if (!newWindow) {
                    alert(popupblockedMessage);
                    return false;
                }
                var html = "";
                html = html + "<html><head></head><body><form id='formid' method='post' action='" + url + "'>";
                html = html + "<input type='hidden' name='coords' value='" + geomstring + "' />";
                if (this._isKnownGeo(gtype)) {
                    var namestr = this.currentGraphic.attributes["names"];
                    html = html + "<input type='hidden' name='namestr' value='" + namestr + "' />";
                }
                html = html + "<input type='hidden' name='feattype' value='" + gtype + "' />";
                html = html + "<input type='hidden' name='ptitle' value='" + ptitle + "' />";


                //html = html + "<input type='hidden' name='distunits' value='" + distUnit + "' />";
                html = html + "</form><script type='text/javascript'>document.getElementById('formid').submit();</script></body></html>";
                newWindow.document.write(html);
            },
            postReport: function(url) {

                var frm = document.getElementById("infoform");
                var geomstring = frm.coords.value;
                var gtype = frm.type.value;
                var radius = frm.radius.value;
                var unit = frm.unit.value;
                var unitcode = bufferunits[unit].esricode;
                var ptitle = frm.ptitle.value;

                var newWindow = window.open();
                if (!newWindow) {
                    alert(popupblockedMessage);
                    return false;
                }
                var html = "";
                html = html + "<html><head></head><body><form id='formid' method='post' action='" + url + "'>";
                html = html + "<input type='hidden' name='coords' value='" + geomstring + "' />";
                html = html + "<input type='hidden' name='feattype' value='" + gtype + "' />";
                html = html + "<input type='hidden' name='ptitle' value='" + ptitle + "' />";

                if (gtype != "bg") {

                    html = html + "<input type='hidden' name='radius' value='" + radius + "' />";
                    html = html + "<input type='hidden' name='unitcode' value='" + unitcode + "' />";
                    html = html + "<input type='hidden' name='unit' value='" + unit + "' />";
                }
                //html = html + "<input type='hidden' name='distunits' value='" + distUnit + "' />";
                html = html + "</form><script type='text/javascript'>document.getElementById('formid').submit();</script></body></html>";
                newWindow.document.write(html);
            },
            error: function(err) {

                alert("error occurred: " + err);
            },
            destroy: function() {

                dojo.empty(this.domNode);
                this.inherited(arguments);
            },
            getStateByFIPS: function(fipscode){
                var stateFIPSList = {
                    "01": {
                        "abbreviation": "AL",
                        "name": "Alabama"
                    },
                    "02": {
                        "abbreviation": "AK",
                        "name": "Alaska"
                    },
                    "03": {
                        "abbreviation": "AS",
                        "name": "American Samoa"
                    },
                    "04": {
                        "abbreviation": "AZ",
                        "name": "Arizona"
                    },
                    "05": {
                        "abbreviation": "AR",
                        "name": "Arkansas"
                    },
                    "06": {
                        "abbreviation": "CA",
                        "name": "California"
                    },
                    "07": {
                        "abbreviation": "CZ",
                        "name": "Canal Zone"
                    },
                    "08": {
                        "abbreviation": "CO",
                        "name": "Colorado"
                    },
                    "09": {
                        "abbreviation": "CT",
                        "name": "Connecticut"
                    },
                    "10": {
                        "abbreviation": "DE",
                        "name": "Delaware"
                    },
                    "11": {
                        "abbreviation": "DC",
                        "name": "District Of Columbia"
                    },
                    "12": {
                        "abbreviation": "FL",
                        "name": "Florida"
                    },
                    "13": {
                        "abbreviation": "GA",
                        "name": "Georgia"
                    },
                    "14": {
                        "abbreviation": "GU",
                        "name": "Guam"
                    },
                    "15": {
                        "abbreviation": "HI",
                        "name": "Hawaii"
                    },
                    "16": {
                        "abbreviation": "ID",
                        "name": "Idaho"
                    },
                    "17": {
                        "abbreviation": "IL",
                        "name": "Illinois"
                    },
                    "18": {
                        "abbreviation": "IN",
                        "name": "Indiana"
                    },
                    "19": {
                        "abbreviation": "IA",
                        "name": "Iowa"
                    },
                    "20": {
                        "abbreviation": "KS",
                        "name": "Kansas"
                    },
                    "21": {
                        "abbreviation": "KY",
                        "name": "Kentucky"
                    },
                    "22": {
                        "abbreviation": "LA",
                        "name": "Louisiana"
                    },
                    "23": {
                        "abbreviation": "ME",
                        "name": "Maine"
                    },
                    "24": {
                        "abbreviation": "MD",
                        "name": "Maryland"
                    },
                    "25": {
                        "abbreviation": "MA",
                        "name": "Massachusetts"
                    },
                    "26": {
                        "abbreviation": "MI",
                        "name": "Michigan"
                    },
                    "27": {
                        "abbreviation": "MN",
                        "name": "Minnesota"
                    },
                    "28": {
                        "abbreviation": "MS",
                        "name": "Mississippi"
                    },
                    "29": {
                        "abbreviation": "MO",
                        "name": "Missouri"
                    },
                    "30": {
                        "abbreviation": "MT",
                        "name": "Montana"
                    },
                    "31": {
                        "abbreviation": "NE",
                        "name": "Nebraska"
                    },
                    "32": {
                        "abbreviation": "NV",
                        "name": "Nevada"
                    },
                    "33": {
                        "abbreviation": "NH",
                        "name": "New Hampshire"
                    },
                    "34": {
                        "abbreviation": "NJ",
                        "name": "New Jersey"
                    },
                    "35": {
                        "abbreviation": "NM",
                        "name": "New Mexico"
                    },
                    "36": {
                        "abbreviation": "NY",
                        "name": "New York"
                    },
                    "37": {
                        "abbreviation": "NC",
                        "name": "North Carolina"
                    },
                    "38": {
                        "abbreviation": "ND",
                        "name": "North Dakota"
                    },
                    "39": {
                        "abbreviation": "OH",
                        "name": "Ohio"
                    },
                    "40": {
                        "abbreviation": "OK",
                        "name": "Oklahoma"
                    },
                    "41": {
                        "abbreviation": "OR",
                        "name": "Oregon"
                    },
                    "42": {
                        "abbreviation": "PA",
                        "name": "Pennsylvania"
                    },
                    "44": {
                        "abbreviation": "RI",
                        "name": "Rhode Island"
                    },
                    "45": {
                        "abbreviation": "SC",
                        "name": "South Carolina"
                    },
                    "46": {
                        "abbreviation": "SD",
                        "name": "South Dakota"
                    },
                    "47": {
                        "abbreviation": "TN",
                        "name": "Tennessee"
                    },
                    "48": {
                        "abbreviation": "TX",
                        "name": "Texas"
                    },
                    "49": {
                        "abbreviation": "UT",
                        "name": "Utah"
                    },
                    "50": {
                        "abbreviation": "VT",
                        "name": "Vermont"
                    },
                    "51": {
                        "abbreviation": "VA",
                        "name": "Virginia"
                    },
                    "52": {
                        "abbreviation": "VI",
                        "name": "Virgin Islands"
                    },
                    "53": {
                        "abbreviation": "WA",
                        "name": "Washington"
                    },
                    "54": {
                        "abbreviation": "WV",
                        "name": "West Virginia"
                    },
                    "55": {
                        "abbreviation": "WI",
                        "name": "Wisconsin"
                    },
                    "56": {
                        "abbreviation": "WY",
                        "name": "Wyoming"
                    },
                    "72": {
                        "abbreviation": "PR",
                        "name": "Puerto Rico"
                    }
                }

                return stateFIPSList[fipscode].abbreviation;



            }

        });


        return EJinfoWindow;

    });

function removecdc() {

    if (document.getElementById("cdcMain")) {
        var dummy = document.getElementById("cdcMain");
        document.body.removeChild(dummy);
    }
}