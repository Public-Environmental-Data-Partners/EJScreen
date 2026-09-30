<%-- 
  ************************************************************************************************************************
  * Title: EJScreen SOE Report
  * Description: This SOE report is accessed through EJScreenAPI includes geographic coordinates of an area, demographic details of the population  and 
  *              environmental justice indices relevant to the area.The data covers demographics broken down by race, age, 
  *			     and language proficiency, compares local values to state and national averages, and provides percentile rankings.
  *			     Additionally, the widget contains tables outlining EPA-reported sites, community features, environmental data,
  *      		 and information on Indian Land and disadvantaged communities ,Health, climate, and service gap indicators. 
  *
  * Author: SAIC, EPA OMS Contractor
  * Creation Date: 01/22/2024
  * Last Updated:  01/22/2024
 
  **************************************************************************************************************************
--%>
<%@ Page Language="VB" AutoEventWireup="false" CodeFile="EJscreen_SOE_report.aspx.vb" Inherits="EJscreen_SOE_report"  ValidateRequest="false" %>
<!DOCTYPE html>
<html lang="en-US" title="EJScreen Community Report">
<head>
    <title>EJScreen Community Report</title>
<!-- JS libraries -->

    <!-- Apex Charts -->
    <script src="javascript/apexcharts.js"></script>
    
    <!-- JQuery -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    
    <!-- fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@500;600"
        rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;700&display=swap"
        rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap" rel="stylesheet">

    <!-- make responsive -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <style>
        root {
            --epa-blue-base: #005ea2;
            --epa-blue-light-1: #aacdec;
            --epa-blue-light: #4f97d1;
            --epa-green-base: #5e9f69;
            --epa-green-light: #86b69e;
            --epa-secondary-light: #f2938c;
            --epa-accent-warm-base: #fa9441;
            --design-blue-base: #0E6CB6;
            --design-green-base: #3A7E11;
            --design-gauge-background: #6c6d70;
            --design-color-alt-table-header: #3A7E11;
            --design-color-alt-table-secondary-header: #b1db98;
            --design-color-alt-table-alt-row: #dfeed4;
            --design-lingiso-background: #d8eeff;
            --design-age-section-header: #253f8e;
            --design-data-yellow: #fff101;
            --design-data-orange: #faba59;
        }

        #print-content-frame {
            width: 1092px;
            margin: 0 8px 0 -8px;
            font-style: sans-serif;
            font-family: Arial, sans-serif;
            font-size: 14px;
            font-style: normal;
            font-variant: normal;
            font-weight: 400;
            line-height: 23px;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }

        #button {
            background-color: #4caf50;
            border-radius: 5px;
            margin-left: 650px;
            margin-bottom: 5px;
            color: white;
        }

        #header-secondary-background { 
            background-color: #3A7E11;
            width: 1090px;
            height: 1042px;
            display: inline-block;
            position: absolute;
            top: -800px;
            left: 0px;
            border-radius: 0 0 5% 0;
        }

        #header-primary-background { 
            background-color: #0E6CB6;
            width: 1079px;
            height: 1031px;
            display: inline-block;
            border-radius: 0 0 5% 0;
            position: absolute;
            top: -810px;
            left: 0px;
        }

        #header-background-detail { 
            display: inline-block;
            width: 35px;
            height: 30px;
            position: absolute;
            left: 1079px;
            top: 0;
            background-color: white;
        }

        .linear-bar-chart .apexcharts-legend {
            background-color: #cfcfcf;
        }

        /* ----------------- alt color table styling begin -------------------- */
        /* whole table */
        .color-alt-table { 
            border-collapse: collapse;
            font-family: Oswald, Arial, sans-serif;
            width: 90%;
            margin: 30px auto;
        }

        .color-alt-table-title { 
            font-size: 25px;
            font-family: Oswald, Arial, sans-serif;
            text-align: center;
            text-transform: uppercase;
            background-color: #3A7E11;
			color:white;			
        }

        .color-alt-table-title th {
            padding: 10px 0; 
        }

         /* every data cell */
        .color-alt-table td {
            font-size: 16px;
            font-weight: normal;
        }

        /* all cells */
        .color-alt-table th,
        .color-alt-table td {
            border: 2px solid black;
        }

        /* header cells */
        .color-alt-table-header th {
            font-family: Oswald, Arial, sans-serif;
            background-color: #3A7E11;
            border: 2px solid black;
            text-transform: uppercase;
            font-weight: bolder;
            font-size: 17px;
            line-height: 19px;
            padding: 5px 5px 5px 10px;
			color:white		   
        }
        .color-alt-table-header th:first-of-type {
            text-align: left;
        }

        /* subheader cells */
        .color-alt-table-subheader th {
            font-family: Oswald, Arial, sans-serif;
            background-color: #91cd6eaa;
            border: 2px solid black;
            text-transform: uppercase;
            font-weight: bolder;
            font-size: 14px;
            padding-left: 10px;
        }
        .color-alt-table-subheader th:first-of-type {
            text-align: left;
        }
        
        /* even data rows */
        .color-alt-table tr:nth-child(2n) {
            background-color: #dfeed4;
        }

        /* odd data rows */
        .color-alt-table td:nth-child(2n + 1) {
            text-align: left;
        }

        /* first column only */
        .color-alt-table tr td:first-of-type { 
            text-align: left;
            padding-left: 10px;
        }

        /* all columns but the first */
        .color-alt-table tr td:not(:first-of-type) { 
            text-align: center;
        }
        /* ---------- alt color table styling end ------------ */

        #lingiso-table td,
        #lingiso-table tr {
            border: 1px solid black;
            padding: 0;
            margin: 0;
        }

        h1 {
            font-family: Arial, sans-serif;
            font-size: 60px;
            font-style: normal;
            font-variant: normal;
            font-weight: 900;
            line-height: 23px;
        }

        h2 {
            font-family: Arial, sans-serif;
            font-size: 25px;
            font-style: normal;
            font-variant: normal;
            font-weight: 700;
            line-height: 23px;
        }

        h3 {
            font-family: Arial, sans-serif;
            font-size: 17px;
            font-style: normal;
            font-variant: normal;
            font-weight: 700;
            line-height: 23px;
        }

        h4 {
            font-family: Arial, sans-serif;
            font-size: 13.5px;
            font-style: normal;
            font-variant: normal;
            font-weight: 700;
            line-height: 23px;
        }

        p {
            font-family: Arial, sans-serif;
            font-style: normal;
            font-variant: normal;
            font-weight: 400;
            line-height: 23px;
        }

        blockquote {
            font-family: Arial, sans-serif;
            font-size: 17px;
            font-style: normal;
            font-variant: normal;
            font-weight: 400;
            line-height: 23px;
        }

        pre {
            font-family: Arial, sans-serif;
            font-size: 11px;
            font-style: normal;
            font-variant: normal;
            font-weight: 400;
            line-height: 23px;
        }

        /* table with leader lines (.....)  CSS */
        .entry {
            font-family: Oswald, Arial, sans-serif;
            display: grid;
            grid-template-columns: auto max-content;
            grid-template-areas: "chapter page";
            align-items: end;
            gap: 0 .25rem;
        }

        .chapter {
            font-family: Oswald, Arial, sans-serif;
            grid-area: chapter;
            position: relative;
            overflow: hidden;
        }

        .fine-print {
            font-family: 'Noto Sans', Arial, sans-serif;
            text-align: left;
            font-size: 0.70em;
            line-height: 0.9em;
        }


        @media not print { 
            #page-4-header { 
                margin-top: -27px;
            }
        }

        @media print {
            @page {
                width: 8.5in;
                height: 11in;
        }

            /* .print-page { 
                border: 1px solid red;
            } */

            #footer4 {  
                display: block;
                position: relative;
                top: 540px;
            }

            .header { 
                page-break-before: always;
                position: relative;
                top: 1px;
            }

            #header-secondary-background { 
                background-color: #3A7E11;
                width: 1071px;
                height: 1042px;
                display: inline-block;
                position: absolute;
                top: -800px;
                left: 0px;
                border-radius: 0 0 5% 0;
            }

            #header-primary-background { 
                background-color: #0E6CB6;
                width: 1060px;
                height: 1031px;
                display: inline-block;
                border-radius: 0 0 5% 0;
                position: absolute;
                top: -810px;
                left: 0px;
            }
            #header-background-detail { 
                display: inline-block;
                width: 16px;
                height: 30px;
                position: absolute;
                left: 1055px;
                top: 0;
                background-color: white;
            }

            hr {
                display: none;
            }

            #print-button,
            #print-button-background,
            #download-button,
            #download-button-background {
                display: none;
            }

            #page-3-header {
                margin-top: -30px;
            }

            #page-4-header {
                margin-top: -30px;
            }
        }
    </style>

    <!-- start report logic -->
    <script src="https://js.arcgis.com/4.11/"></script>
	    <link rel="stylesheet" href="https://js.arcgis.com/4.11/esri/css/main.css">
    <script src="javascript/reportdata.js"></script>
    <script src="javascript/config.js"></script>
	    <!--<script type="text/javascript" src="javascript/tagmanager.js"></script>-->
    <script>

        addEventListener("beforeprint", (event) => {
            alert("For the best print results, use:\n\n - Portrait orientation\n - Letter size paper\n - Default size margins & scale")
        })

        var statHash = new Object();
        var ejmainHash = new Object();
        var ejextraHash = new Object();

        function isKnownGeo(gtype) {
            var isGeo = false;
            for (var g in typelookup) {
                if (g == gtype) isGeo = true;
            }
            return isGeo;
        }

        require([
            "esri/config",
            "esri/request",
			"esri/views/MapView",
			"esri/Map",
			"esri/widgets/ScaleBar",
			"esri/geometry/geometryEngine",
			"esri/geometry/support/webMercatorUtils",
			"esri/Graphic",
			"esri/geometry/Point",
			"esri/geometry/Polyline",
			"esri/geometry/Polygon",
			 "esri/tasks/QueryTask",
 "esri/tasks/support/Query",
 "esri/geometry/SpatialReference",
            "dojo/domReady!"
        ],

            function (esriConfig, esriRequest,MapView,Map,ScaleBar,geometryEngine,webMercatorUtils, Graphic,Point,Polyline, Polygon,QueryTask,Query,SpatialReference) {
			//symbols
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
      var linesym ={ // symbol used for polylines
          type: "simple-line", // autocasts as new SimpleMarkerSymbol()
          color: "#ff0000",
          width: "2",
          style: "solid"
          };
    var polysym = { // symbol used for polygons
            type: "simple-fill", // autocasts as new SimpleMarkerSymbol()
            color: "rgba(0, 255, 0, 0.0)",
            style: "solid",
            outline: {
              color: "red",
              width: 1
            }
          };
		  
		//end symbols

                var useStaticData = false;
				var soeurldemog = ejscreendemogservice + "/exts/EJScreen_DemogReports/Get2021DemogACS";

                //begin geom input

                var headerstr = "";
                var locationstr = "";
                var intype = "";
                var radius = "";
                var bunit = "";
                var coords = "";
				var areaid = "";

                var hasBuffer = true;
				
				  if (useStaticData) {
                    intype = "point";
                    radius = "1";
                    bunit = "miles";
                    bunitcode = "9035";
                    //coords = "-73.984342,40.754438";
					coords = '{"spatialReference":{"wkid":4326},"x":-73.99764917327138,"y":40.721875510488985}';
                } else {
                    intype = "<%=feattype %>";
                    if (!(intype)) intype = "point";
                    else intype = intype.toLowerCase();

                    radius = "<%=dist %>";
                    if (!(radius) || (radius == "")) radius = 0;

                 var bunitcode = "<%=bunit %>";
                  var bunit = "mile";
                  for (var u in bufferunits) {
                    if (bufferunits[u].esricode == bunitcode) bunit = u;
                    }
                     areaid = "<%=areaid %>";
                    coords = '<%=coordstr %>';
	
                    
 
 /*if (radius == 0) {
     hasBuffer = false;
 }*/
                }

                // if (useStaticData) {
                    // intype = "point";
                    // radius = "1";
                    // bunit = "miles";
                    // bunitcode = "9035";
                    // coords = "-73.984342,40.754438";
					// basemap = "streets";
                // } else {
                    // intype = "<%=feattype %>";
                    // if (!(intype)) intype = "point";
                    // else intype = intype.toLowerCase();

                    // radius = "<%=dist %>";
                    // if (!(radius) || (radius == "")) radius = 0;

                    // bunit = "<%=bunit %>";
                    // if (!(bunit) || (bunit == "")) bunit = "mile";
                    // bunitcode = bufferunits[bunit].esricode;

                    // coords = "<%=coordstr %>";

                // }
				
				
		//start map, don't import image
				
	var basemap = "gray";	
 
    /*if (radius == 0) {
        hasBuffer = false;
    }*/
		
	
		
		 var map = new Map({
            basemap: basemap			
        });
		
    var mview = new MapView({
        map: map,
        container: "map",
        center: [-122.45, 37.75], // longitude, latitude
        zoom: 13
    });
	
	// var scaleBar = new ScaleBar({
        // view: mview,
        // style: "ruler",
        // unit: "dual" // The scale bar displays both metric and non-metric units.
    // });

    // // Add the widget to the bottom left corner of the view
    // mview.ui.add(scaleBar, {
        // position: "bottom-right"
    // });

    mview.when(disableZooming);

    function disableZooming(view) {
          $("canvas, .esri-view-surface, .esri-view-surface--inset-outline, .esri-overlay-surface, .esri-view-root, .esri-ui, .esri-view-user-storage").attr("title", "map showing the user-selected area");
          view.popup.dockEnabled = true;

          // Removes the zoom action on the popup
          view.popup.actions = [];

          // stops propagation of default behavior when an event fires
          function stopEvtPropagation(event) {
            event.stopPropagation();
          }

          // exlude the zoom widget from the default UI
          view.ui.components = ["attribution"];

          // disable mouse wheel scroll zooming on the view
          view.on("mouse-wheel", stopEvtPropagation);

          // disable zooming via double-click on the view
          view.on("double-click", stopEvtPropagation);

          // disable zooming out via double-click + Control on the view
          view.on("double-click", ["Control"], stopEvtPropagation);

          // disables pinch-zoom and panning on the view
          view.on("drag", stopEvtPropagation);

          // disable the view's zoom box to prevent the Shift + drag
          // and Shift + Control + drag zoom gestures.
          view.on("drag", ["Shift"], stopEvtPropagation);
          view.on("drag", ["Shift", "Control"], stopEvtPropagation);

          // prevents zooming with the + and - keys
          view.on("key-down", (event) => {
            const prohibitedKeys = [
              "+",
              "-",
              "Shift",
              "_",
              "=",
              "ArrowUp",
              "ArrowDown",
              "ArrowRight",
              "ArrowLeft"
            ];
            const keyPressed = event.key;
            if (prohibitedKeys.indexOf(keyPressed) !== -1) {
              event.stopPropagation();
            }
          });

          return view;
        }
		
		function drawFeature(gjson) {
        if (hasBuffer) zoomstatus = false;
        else zoomstatus = true;
        var geometry;
        var geom = JSON.parse(gjson);
        if (geom.x) {

            var pntgeom = Point.fromJSON(geom);
            var mgeom = webMercatorUtils.geographicToWebMercator(pntgeom);
            var tgraphic = new Graphic(mgeom, pointsym);
            mview.graphics.add(tgraphic);
            geometry = pntgeom;
            if (zoomstatus) {
                mview.center = mgeom;
                mview.zoom = 10;
            }
        } else if (geom.rings) {

            var polygeom = Polygon.fromJSON(geom);

            var mgeom = webMercatorUtils.geographicToWebMercator(polygeom);
            var tgraphic = new Graphic(mgeom, polysym);
            mview.graphics.add(tgraphic);
            geometry = mgeom;
            if (zoomstatus) {
                var uExtent = mgeom.extent.center;
                mview.extent = uExtent;
            }



        } else if (geom.paths) {

            var linegeom = Polyline.fromJSON(geom);
            var mgeom = webMercatorUtils.geographicToWebMercator(linegeom);
            geometry = mgeom;
            var tgraphic = new Graphic(mgeom, linesym);
            mview.graphics.add(tgraphic);
            if (zoomstatus) {
                var uExtent = mgeom.extent.center;
                mview.extent = uExtent;
            }

        }

        if (hasBuffer) {
            doBuffer(geometry);
        }
    }

function doBuffer(geometry) {
    var buffer;
    if (typeof radius === 'undefined' || radius <= 0) {
        // Display original geometry as graphic
        var originalGraphic = new Graphic({
            geometry: geometry,
            symbol: polysym // Use the symbol for your original geometry
        });
        mview.graphics.add(originalGraphic);
        mview.extent = geometry.extent.expand(2); // Adjust map extent to show the original geometry
        return;
    }
    if (bunitcode === "9035" || bunitcode === "9036") {
        if (bunitcode === "9035") {
            buffer = geometryEngine.geodesicBuffer([geometry], [radius], "miles", true);
        } else {
            buffer = geometryEngine.geodesicBuffer([geometry], [radius], "kilometers", true);
        }
    } else {
        buffer = geometryEngine.geodesicBuffer([geometry], [radius], bunitcode, true);
    }
    var bufgraphic = new Graphic({
        geometry: buffer[0],
        symbol: polysym
    });
    mview.graphics.add(bufgraphic);
    mview.extent = buffer[0].extent.expand(2);
}



 function doBuffer1(geometry) {
        var buffer;
            if (radius > 0) {
                if(bunitcode==="9035" || bunitcode==="9036"){
                    if(bunitcode==="9035"){ 
                    buffer = geometryEngine.geodesicBuffer([geometry], [radius], "miles",true);
                    }else {
                        buffer = geometryEngine.geodesicBuffer([geometry], [radius], "kilometers",true);
                    }
                }
                else {
                    buffer = geometryEngine.geodesicBuffer([geometry], [radius], bunitcode,true);
                }
                var bufgraphic = new Graphic({
                    geometry: buffer[0],
                    symbol: polysym
                });
                mview.graphics.add(bufgraphic);
                mview.extent = buffer[0].extent.expand(2);
            }

    }
	
		
		//end map
		
		              

                var namestr = "";
                if (isKnownGeo(intype)) {
                    namestr = "<%=namestr %>";
                    namestr = namestr.replace(/\scounty/gi, "");
                }

                var inGeom = null;
                var centerpnt = null;
                var content;
                 if (intype === "bg" || intype==="blockgroup") {
                    headerstr = "Blockgroup: " + namestr;
                    locationstr = "Blockgroup: " + namestr;
                    content = {
                        'geometry': '',
                        'distance': '',
                        'unit': '',
                        'areatype': 'blockgroup',
                        'areaid': areaid, //coords is returning null
                        'f': "json"
                    };
                } else if (intype == "city") {

                    namestr = namestr.replace(/\scity/gi, "");
                    headerstr = typelookup[intype].description + ": " + namestr;
                    locationstr = typelookup[intype].description + ": " + namestr;
                    content = {
                        'geometry': '',
                        'distance': '',
                        'unit': '',
                        'areatype': 'city',
                        'areaid': areaid,
                        'f': 'json'
                    };
                } else if (isKnownGeo(intype)) {

                    headerstr = typelookup[intype].description + ": " + namestr;
                    locationstr = typelookup[intype].description + ": " + namestr;
                    content = {
                        'geometry': '',
                        'distance': '',
                        'unit': '',
                        'areatype': intype,
                        'areaid': areaid, //coords is returning null,
                        'f': 'json'
                    };
                } else {
                    if (coords.length > 0) {
                        coords = unescape(coords);
                        var geomjson =coords ;
                        var coordsarray = coords.split(",");
                        var geom = JSON.parse(geomjson);
                        if (geom.x) {
            if (radius == 0) {
                alert("You have to enter a radius greater than 0 for point feature.");
                return false;
            }
            var x = geom.x;
            var y = geom.y;

            headerstr = headerstr + radius + " " + bunit + " Ring Centered at " + y.toFixed(6) + "," + x.toFixed(6);
            locationstr =  radius + " " + bunit + " Ring Centered at " + y.toFixed(6) + "," + x.toFixed(6);
        } else if (geom.rings) {

            headerstr = "";
            if (radius == 0) {
                //headerstr = headerstr + "<a href='javascript: void(0);' title='" + coords + "'>the User Specified Area</a>";
                headerstr = headerstr + "the User Specified Area";
                locationstr = "the User Specified Area";
            } else {
                //headerstr = headerstr + radius + " " + bunit + " Ring around <a href='javascript: void(0);' title='" + coords + "'>the Area</a>";
                headerstr = headerstr + radius + " " + bunit + " Ring around the Area";
                locationstr = radius + " " + bunit + " Ring around the Area";
                
            }


        } else if (geom.paths) {

            if (radius == 0) {
                alert("You have to enter a radius greater than 0 for linear feature.");
                return false;
            }

            headerstr = "";
            headerstr = headerstr + radius + " " + bunit + " Ring around ";
            headerstr = headerstr + "the Corridor";
            locationstr = radius + " " + bunit + " Ring around the Corridor";
        } else {
            alert("Invalid coordinates string or input geometry type.");
            return false;
        }
                        /*if ((coordsarray.length == 3) && (intype == "point")) {
                           // var x = parseFloat(coordsarray[0]);
                           // var y = parseFloat(coordsarray[1]);
                           var geom = JSON.parse(geomjson);
                            geomjson = '{"x":' + x + ',"y":' + y + ',"spatialReference":{"wkid":4326}}';
                            var unitstr = bunit;
                            if (radius == 1) unitstr = unitlookup[bunit];
                            headerstr = headerstr + radius + " " + unitstr + " Ring Centered at " + y.toFixed(6) + "," + x.toFixed(6);
                            locationstr = radius + " " + unitstr + " Ring Centered at " + y.toFixed(6) + "," + x.toFixed(6);
                        } else if ((intype == "polygon") || (intype == "poly")) {
                            geomjson = '{"rings":[[';
                            var ccount = coordsarray.length / 2;
                            var points = [];
                            for (var m = 0; m < ccount; m++) {
                                var lon1 = parseFloat(coordsarray[2 * m]);
                                var lat1 = parseFloat(coordsarray[2 * m + 1]);
                                var pointstr = "[" + lon1 + "," + lat1 + "]";
                                points.push(pointstr);
                            }

                            headerstr = "";
                            if (radius == 0) {
                                //headerstr = headerstr + "<a href='javascript: void(0);' title='" + coords + "'>the User Specified Area</a>";
                                headerstr = headerstr + "the User Specified Area";
                                locationstr = "the User Specified Area";
                            } else {
                                //headerstr = headerstr + radius + " " + bunit + " Ring around <a href='javascript: void(0);' title='" + coords + "'>the Area</a>";
                                var unitstr = bunit;
                                if (radius == 1) unitstr = unitlookup[bunit];
                                headerstr = headerstr + radius + " " + unitstr + " Ring around the Area";
                                locationstr = radius + " " + unitstr + " Ring around the Area";
                            }

                            geomjson = geomjson + points.join(",");
                            geomjson = geomjson + ']],"spatialReference":{"wkid":4326}}';
                        } else if ((intype == "polyline") || (intype == "line")) {
                            geomjson = '{"paths":[[';
                            var ccount = coordsarray.length / 2;
                            var points = [];
                            for (var m = 0; m < ccount; m++) {
                                var lon1 = parseFloat(coordsarray[2 * m]);
                                var lat1 = parseFloat(coordsarray[2 * m + 1]);
                                var pointstr = "[" + lon1 + "," + lat1 + "]";
                                points.push(pointstr);

                            }
                            geomjson = geomjson + points.join(",");
                            geomjson = geomjson + ']],"spatialReference":{"wkid":4326}}';
                            if (radius == 0) {
                                alert("You have to enter a radius greater than 0 for linear feature.");
                                return false;
                            }

                            var unitstr = bunit;
                            if (radius == 1) unitstr = unitlookup[bunit];
                            headerstr = "";
                            headerstr = headerstr + radius + " " + unitstr + " Ring around ";
                            headerstr = headerstr + "the Corridor";
                            //headerstr = headerstr + "<a href='javascript: void(0);' title='" + coords + "'>the Corridor</a>";
                            locationstr = radius + " " + unitstr + " Ring around the Corridor";

                        } else {
                            alert("Invalid coordinates string or input geometry type.");
                            return false;
                        }*/
                    }

                    content = {
                        'geometry': geomjson,
                        'distance': radius,
                        'unit': bunitcode,
                        'areatype': '',
                        'areaid': '',
                        'f': "json"
                    };
                }
				
	//add geom to map
 if(geomjson===undefined){
            geomjson ="";
          }
                //end geom input
                mview.when(function () {
        if (geomjson.length > 1) drawFeature(geomjson);
        else if (areaid.length > 4) drawID(areaid, intype);
    });

        function drawID(aid, alevel) {
        var lindex = typelookup[alevel].layer;
        var bgurl = typelookup[alevel].url + "/" + lindex;
        var idfield = typelookup[alevel].idfield;
        var queryTask = new QueryTask(bgurl);
        var query = new Query();

        query.returnGeometry = true;
        query.outSpatialReference = new SpatialReference({ wkid: 102100 }); ;
        query.outFields = [idfield];
        query.where = idfield + "='" + aid + "'";
        queryTask.execute(query).then(function (featset) {
            if (featset.features.length > 0) {
                var polysym = { // symbol used for polygons
            type: "simple-fill", // autocasts as new SimpleMarkerSymbol()
            color: "rgba(0, 255, 0, 0.25)",
            style: "solid",
            outline: {
              color: "red",
              width: 2
            }
          };
                var graphic = new Graphic(featset.features[0].geometry, polysym);
                mview.graphics.add(graphic);
                var countyextent = featset.features[0].geometry.extent.expand(2);
                mview.extent = countyextent;
            }

        });//.otherwise(function(error) {
           // alert("error occurred: " + error);

       // });
    }



                var pname = location.pathname;
                var pos = pname.lastIndexOf("/");
                pname = pname.substr(0, pos);
                var rooturl = location.protocol + "//" + location.host + pname + "/";
				//var urlParams = new URLSearchParams(window.location.search);
				//if (urlParams.get("f") === 'report') {
                 //    urlParams.set("f", "json");
                //}

                //const queryString = urlParams.toString();
                var ejscreenSOEbrokerurl = rooturl + "ejscreenRESTbroker1.aspx";
                //var method = "get";
                //if (method == "get") {
                    //dojo.byId("urlcontent").innerHTML = ejscreenSOEbrokerurl + "?" + queryString;
                  //  var urlcon = ejscreenSOEbrokerurl + "?" + queryString;
                    /*if(urlcon.trim().length > charLimit){
                         alert("2048 character limit exceeded for GET. Consider using POST.");
                         return false; 
                    }else{
                        dojo.byId("urlcontent").innerHTML = urlcon;
                    }*/
                //} else {
                    //var postcontent = "HTTP POST URL: " + ejscreenSOEbrokerurl + "<br />HTTP POST Body:<div style='padding-left: 10px;'>" + poststr + "</div>";
                    //dojo.byId("urlcontent").innerHTML = postcontent;
               // }
                $.ajax({
                    type: "POST",
                    url: ejscreenSOEbrokerurl ,//+ "?" + queryString,
                    data: content,
                    dataType: 'json',
                    success: function (response) {
                     
                            console.log(JSON.stringify(response));

                        if (useStaticData) {
                            processResultDemog(demogResultStatic);

                        } else {
                            processResultDemog(response);
                        }
                       
                        if (useStaticData) {
                            processResultEJMain(ejResultStatic);

                        } else {
                            processResultEJMain(response);
                        }

                     
                        if (useStaticData) {
                            processResultEJExtra(ejextraresultstatic);

                        } else {
                            processResultEJExtra(response);
                        }

                      
                    },
                    error: function (err) {;
                        //dojo.byId("resultjson").innerHTML = JSON.stringify(err, undefined, 2);
                    }
                });

               


                


                function processResultDemog(response) {
                    resultDEMOG = response;

                    //alert if error
                    if (resultDEMOG.data.demographics.message) {
                        var errElem = document.getElementById('geo-info-bar')
                        let no_report_msg_html = "<tr style='max-height: 20px'><td><p id='cannot-report-msg'>" + resultDEMOG.data.demographics.message; + "</p></td></tr>";
                        errElem.innerHTML = no_report_msg_html;

                        //return false;

                    } else {
                        //end alert

                        //alert 2 - no pop fro demog
                        //Note 6/27/23 RW:
                        //the above will catch error when no centroids are found. Also want to show no pop message when report works but population still 0
                        //alert if no pop, same message as 'too sparse' from SOE when no centroids.
                        //             if (resultDEMOG.statGroupList[0].statList[0] && resultDEMOG.statGroupList[0].statList[0].value == "0") {                                                  
                        //                 document.getElementById('geo-info-bar').innerHTML = no_report_msg_html;
                        //                     //alert(no_report_msg);
                        ////show the 0 pop on report
                        ////document.getElementById("TOTALPOP").innerHTML = resultDEMOG.statGroupList[0].statList[0].value;
                        ////alert("zero");
                        //                     return false;

                        //             }
                        //end alert

                        /* var statlist = resultDEMOG.statGroupList[0].statList;
     
                         for (let i = 0; i < statlist.length; i++) {
                             var currobj = statlist[i];
                             var currName = currobj.name;
                             var currValue = currobj.value;
                             //store value in hash for lookup for gauges
                             statHash[currName] = currValue;
     
                             if (document.getElementById(currName)) {
                                 document.getElementById(currName).innerHTML = currValue;
                             }
                         }*/

                        var ejDemog = response.data.demographics;
                        Object.entries(ejDemog).forEach(entry => {
                            //return;
                            const [key, value] = entry;
                            if (document.getElementById(key)) {
                                statHash[key] = value;
                                document.getElementById(key).innerHTML = value;
                            }
                        });


                        //update coords and area and name info
                        //  document.getElementById("inputAreaMiles").innerHTML = Number(resultDEMOG.inputAreaMiles);

                        // document.getElementById("LOCATIONSTR").innerHTML = locationstr;
                        // document.getElementById("LOCATIONSTR2").innerHTML = locationstr;
                        // document.getElementById("LOCATIONSTR3").innerHTML = locationstr;
                        // document.getElementById("LOCATIONSTR4").innerHTML = locationstr;

                        const longEnUSFormatter = new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        });

                        var tStamp = longEnUSFormatter.format(new Date());



                        //update report data and version
                        //var pDate = new Date();

                        //var formatDate = pDate.toLocaleString('default', { month: 'long' });
                        //var formatDate = pDate.getMonth();
                       // document.getElementById("REPORTDATE").innerHTML = tStamp;
                       // document.getElementById("REPORTVERSION").innerHTML = versionText; //from config
                       updateElementsWithContent('.LOCATIONSTR', locationstr);

                        // Update report date elements
                        updateElementsWithContent('.REPORTDATE', tStamp);

                            // Update report version elements
                            updateElementsWithContent('.REPORTVERSION', versionText);
                        //display life expectancy value only if the value is a positive number (otherwise show N/A)
                        if (!isNaN(document.getElementById("LIFEEXP").innerHTML) &&
                            Number(document.getElementById("LIFEEXP").innerHTML) > 0) {
                            document.getElementById("LIFEEXP").innerHTML += " years";
                        }
                        else
                            document.getElementById("LIFEEXP").innerHTML = "N/A";

                        //display per capita income value only if the value is a positive number (otherwise show N/A)
                        if (!isNaN(document.getElementById("PER_CAP_INC").innerHTML) &&
                            Number(document.getElementById("PER_CAP_INC").innerHTML) > 0) {
                            document.getElementById("PER_CAP_INC").innerHTML = "$" + Number(document.getElementById("PER_CAP_INC").innerHTML).toLocaleString("en-US");
                        }
                        else
                            document.getElementById("PER_CAP_INC").innerHTML = "N/A";

                        //format per capita income, number of household values
                        document.getElementById("TOTALPOP").innerHTML = Number(document.getElementById("TOTALPOP").innerHTML).toLocaleString("en-US");
                        document.getElementById("HSHOLDS").innerHTML = Number(document.getElementById("HSHOLDS").innerHTML).toLocaleString("en-US");

                        doLangSpokenTable();
                        doGauges();
                        doAgeChart();
                        doLingIsoChart();
						//RW remove,currently do not need opener when using API report, only main report that passes in image. API uses ESRI map.
						
                        //if (opener) {
                        //    if (opener.document.getElementById("mapimageurl")) {
                        //        var mimgurl = opener.document.getElementById("mapimageurl").innerHTML;
                        //        //document.getElementById("printmapimage").innerHTML = "<center><img  class='img-responsive' src='" + mimgurl + "' alt='Map' /></center>";
                        //        document.getElementById("mapimg").src = mimgurl;
                        //        // document.forms['Form1']['mapimage'].value = mimgurl;
                        //    }
                        //}
						

                        //apply tagged leader lines to leader line tables (done in v20)
                        // $(".chapter").after("<span style='font-family: Oswald, Arial, sans-serif; position: absolute; padding-left: .25ch; text-align: right; overflow: hidden;'> . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . </span>")
                    }
                }
                function processResultEJMain(response) {

                
                    //alert if error
                    if (response.data.main.message) {
                        let no_report_msg_html = "<tr style='max-height: 20px'><td><p id='cannot-report-msg'>" + response.data.errMain.message; + "</p></td></tr>";
                       
                        document.getElementById('geo-info-bar').innerHTML =  no_report_msg_html;
                        //return false;

                    } else {
                        ejmainHash = response.data.main;
                        doEJMainChart();
                        doEJSuppChart();

                        //update each element whos id is in the ej return with its value. Updates indicator tables.
                        Object.entries(ejmainHash).forEach(entry => {
                            //return;
                            const [key, value] = entry;
                            if (document.getElementById(key)) {
                                document.getElementById(key).innerHTML = value;
                            }
                        });

                        //format the toxic releases to air and traffic proximity values
                        document.getElementById("RAW_E_TRAFFIC").innerHTML = Number(document.getElementById("RAW_E_TRAFFIC").innerHTML).toLocaleString("en-US");
                        document.getElementById("S_E_TRAFFIC").innerHTML = Number(document.getElementById("S_E_TRAFFIC").innerHTML).toLocaleString("en-US");
                        document.getElementById("S_E_TRAFFIC_PER").innerHTML = Number(document.getElementById("S_E_TRAFFIC_PER").innerHTML).toLocaleString("en-US");
                        document.getElementById("N_E_TRAFFIC").innerHTML = Number(document.getElementById("N_E_TRAFFIC").innerHTML).toLocaleString("en-US");
                        document.getElementById("N_E_TRAFFIC_PER").innerHTML = Number(document.getElementById("N_E_TRAFFIC_PER").innerHTML).toLocaleString("en-US");

                        document.getElementById("RAW_E_RSEI_AIR").innerHTML = Number(document.getElementById("RAW_E_RSEI_AIR").innerHTML).toLocaleString("en-US");
                        document.getElementById("S_E_RSEI_AIR").innerHTML = Number(document.getElementById("S_E_RSEI_AIR").innerHTML).toLocaleString("en-US");
                        document.getElementById("S_E_RSEI_AIR_PER").innerHTML = Number(document.getElementById("S_E_RSEI_AIR_PER").innerHTML).toLocaleString("en-US");
                        document.getElementById("N_E_RSEI_AIR").innerHTML = Number(document.getElementById("N_E_RSEI_AIR").innerHTML).toLocaleString("en-US");
                        document.getElementById("N_E_RSEI_AIR_PER").innerHTML = Number(document.getElementById("N_E_RSEI_AIR_PER").innerHTML).toLocaleString("en-US");
                    }
                }

               

                function processResultEJExtra(response) {
                  
                    //alert if error
                    if (response.data.extras.message) {
                        let no_report_msg_html = "<tr style='max-height: 20px'><td><p id='cannot-report-msg'>" + response.data.extras.message; + "</p></td></tr>";
                        document.getElementById('geo-info-bar').innerHTML =  no_report_msg_html;
                        //return false;

                    } else {
                        ejextraHash = response.data.extras;
                        //doEJExtraChart();

                        //update each element whos id is in the ej return with its value. Updates indicator tables.
                        Object.entries(ejextraHash).forEach(entry => {
                            //return;
                            const [key, value] = entry;
                            if (document.getElementById(key)) {
                                document.getElementById(key).innerHTML = value;
                            }
                        });

                        //if less then 0 set to N/A
                        let stateAverageIds = ["S_HI_LIFEEXPPCT_AVG",
                            "S_HI_HEARTDISEASE_AVG",
                            "S_HI_ASTHMA_AVG",
                            "S_HI_CANCER_AVG",
                            "S_HI_DISABILITYPCT_AVG",
                            "S_CI_FLOOD_AVG",
                            "S_CI_FIRE_AVG",
                            "S_CG_LIMITEDBBPCT_AVG",
                            "S_CG_NOHINCPCT_AVG"];
                        stateAverageIds.forEach((id) => {
                            if (document.getElementById(id).innerHTML[0] == '-')
                                document.getElementById(id).innerHTML = "N/A";
                        });
                    }
                }
            });
           
         function updateElementsWithContent(selector, content) {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                elements.forEach(element => {
                    element.textContent = content;
                });
            }
         }

        function doLangSpokenTable() {
            //remove zero-valued rows from the table titled "LANGUAGES SPOKEN AT HOME"
            var row_ids = [
                "english-row", "spanish-row", "french-row", "german-row",
                "russian-row", "other-ie-row", "korean-row", "chinese-row",
                "vietnamese-row", "tagalog-row", "other-asian-row", "arabic-row",
                "other-row", "total-non-english-row"
            ]

            var value_ids = [
                "P_ENGLISH", "P_SPANISH", "P_FRENCH", "P_GERMAN",
                "P_RUS_POL_SLAV", "P_OTHER_IE", "P_KOREAN", "P_CHINESE",
                "P_VIETNAMESE", "P_TAGALOG", "P_OTHER_ASIAN", "P_ARABIC",
                "P_OTHER", "P_NON_ENGLISH"
            ]
            
            var dataPresent = false;
            for (var i = 0; i < row_ids.length; i++) {
                if (!Number(document.getElementById(value_ids[i]).innerHTML))
                    document.getElementById(row_ids[i]).remove()
                else
                    dataPresent = true;
            }

            if (!dataPresent) { 
                document.getElementById("language-table").innerHTML += "<tr><td style='text-align: center; padding: 50px 0;' colspan=2><b>No language data available.</b></td><tr>";
            }

        }

    

        function doLingIsoChart() {
            //do LINGISO linear graphs by adjusting div width based on
            document.getElementById("speak_spanish_linear_gauge").style.width = statHash["P_HLI_SPANISH_LI"] + "%";
            document.getElementById("speak_other_indio_european_linear_gauge").style.width = statHash["P_HLI_IE_LI"] + "%";
            document.getElementById("speak_asian_pacific_islander_linear_gauge").style.width = statHash["P_HLI_API_LI"] + "%";
            document.getElementById("speak_other_languages_linear_gauge").style.width = statHash["P_HLI_OTHER_LI"] + "%";
        }
    </script>
    <!--end report logic-->

</head>
<body>
    <div style="position: fixed; right: 20px; top: 20px; margin-bottom: -50px; z-index: 1000;
                width: 70px; height: 70px; border-radius: 70px;
                background-color: #e4e4e4; filter: drop-shadow(5px 6px 4px #aaaaaa);"
        id="print-button-background"
        role="button">
        <img id="print-button"
            alt="Printer icon"
            src="images/ejreport/print-button.png"
            style="position: fixed; right: 8px; top: 10px;"
            onClick="window.print();">
    </div>

    <div id="print-content-frame">
        <div class="print-page">
        <!-- Title/Header Area -->
        <div id="header-secondary-background"></div>
        <div id="header-primary-background"></div>
        <div id="header-background-detail"></div>
        <img src="images/ejreport/EPA_logo_white.png"
            alt="EPA logo"
            width="110"
            height="35"
            style="position: absolute; left: 850px; top: 15px" />
        <!--<h1 id="title" tabindex="0"
                style="white-space: nowrap; color: white; position: absolute; left: 40px; top: 40px;font-size: 60px;">
            EJScreen Community Report
        </h1>
        <p style="
            color: white;
            font-family: heebo, Arial, sans-serif;
            font-size: 25px;
            position: absolute;
            top: 120px;
            left: 40px;
            text-align: center;
                white-space: nowrap;
        ">
            This report provides environmental and socioeconomic information for
            user-defined areas,<br />
            and combines that data into environmental justice and supplemental
            indexes.
        </p>-->
		
           <div id="title" tabindex="0" role="banner" 
                summary="Title information of selected area" 
                style="
				    white-space: nowrap;
                    position: absolute; 
					left: 5px;
					top: 5px;
					font-size: 18pt;
                    background-color: #0E6CB6;                  
                    color: white;
                   
            "><h1 id="title" tabindex="0"
                style="white-space: nowrap; position: absolute; left: 40px; top: 40px;">
                EJScreen Community Report
            </h1>
			
                    

            <p style="
                font-family: heebo, Arial, sans-serif;
                font-size: 14pt;
                position: absolute;
                top: 120px;
                left: 80px;
				font-weight: bold;
                text-align: center;
                white-space: nowrap;
            ">
                This report provides environmental and socioeconomic information for
                user-defined areas,<br />
                and combines that data into environmental justice and supplemental
                indexes.
            </p>

          </div>



        <!-- Geographic Information -->
        <table id="geo-info-bar" role="grid" tabindex="1"
            summary="Geographic information of selected area" 
            style="
                height: 115px;
                background-color: #0E6CB6;
                margin-top: 272px;
                width: 100%;
                color: white;
                font-weight: bold;
        ">
            <tr style="max-height: 115px">
                <th scope="row" style="width: 45%">
                    <h2 id="placename"
                        style="
                font-size: 45px;
                padding-left: 50px;
                max-width: 100%;
                line-height: 1.15em;
                text-align: center;
                max-height: 115px;
                margin: 0;
                ">
                        XX
                    </h2>
                </th>
                <td style="
                font-family: heebo, Arial, sans-serif;
                text-align: center;
                font-size: 22px;
                line-height: 29px;
                text-align: center;">
                    <span class="LOCATIONSTR">XX</span><br />
                    Population: <span id="TOTALPOP">XX</span><br />
                    Area in square miles: <span id="inputAreaMiles">XX</span>
                </td>
            </tr>
        </table>
        <!-- left side content start -->
        <div style="width: 58%; float: left">
            <!--<div id="mapdiv" tabindex="2"><img id="mapimg" alt="Dynamic map initially showing the user-selected area" src="images/ejreport/Location_map_2.png" width="100%"></img></div>-->
			<!--<div id="map" class="w3-image"></div>-->
			<div id="map" style="width: 100%; height:455px;"></div>
            <div style="
                height: 46px;
                width: 100%;
                box-sizing: border-box;
                text-align: center;
                font-size: 23px;
                font-weight: bold;
                padding-top: 12px;
                float: left;">
                <h2 style="margin: 0; font-size: 19px;" tabindex="3">LANGUAGES SPOKEN AT HOME</h2>
                <div style="height: 405px;">
                    <table class="color-alt-table" id="language-table" role="Languages spoken at home" summary="Languages spoken at home">
                        <tr class="color-alt-table-header">
                            <th scope="col" width="65%">Language</th>
                            <th scope="col" width="35%">Percent</th>
                        </tr>
                        <tr id="english-row">
                            <td>English</td>
                            <td><span id="P_ENGLISH">XX</span>%</td>
                        </tr>
                        <tr id="spanish-row">
                            <td>Spanish</td>
                            <td><span id="P_SPANISH">XX</span>%</td>
                        </tr>
                        <tr id="french-row">
                            <td>French, Haitian, or Cajun</td>
                            <td><span id="P_FRENCH">XX</span>%</td>
                        </tr>
                        <tr id="german-row">
                            <td>German or other West Germanic</td>
                            <td><span id="P_GERMAN">XX</span>%</td>
                        </tr>
                        <tr id="russian-row">
                            <td>Russian, Polish, or Other Slavic</td>
                            <td><span id="P_RUS_POL_SLAV">XX</span>%</td>
                        </tr>
                        <tr id="other-ie-row">
                            <td>Other Indo-European</td>
                            <td><span id="P_OTHER_IE">XX</span>%</td>
                        </tr>
                        <tr id="korean-row">
                            <td>Korean</td>
                            <td><span id="P_KOREAN">XX</span>%</td>
                        </tr>
                        <tr id="chinese-row">
                            <td>Chinese (including Mandarin, Cantonese)</td>
                            <td><span id="P_CHINESE">XX</span>%</td>
                        </tr>
                        <tr id="vietnamese-row">
                            <td>Vietnamese</td>
                            <td><span id="P_VIETNAMESE">XX</span>%</td>
                        </tr>
                        <tr id="tagalog-row">
                            <td>Tagalog (including Filipino)</td>
                            <td><span id="P_TAGALOG">XX</span>%</td>
                        </tr>
                        <tr id="other-asian-row">
                            <td>Other Asian and Pacific Island</td>
                            <td><span id="P_OTHER_ASIAN">XX</span>%</td>
                        </tr>
                        <tr id="arabic-row">
                            <td>Arabic</td>
                            <td><span id="P_ARABIC">XX</span>%</td>
                        </tr>
                        <tr id="other-row">
                            <td>Other and Unspecified</td>
                            <td><span id="P_OTHER">XX</span>%</td>
                        </tr>
                        <tr id="total-non-english-row">
                            <td>Total Non-English</td>
                            <td><span id="P_NON_ENGLISH">XX</span>%</td>
                        </tr>
                    </table>
                </div>
            </div>
        
        </div>
        <!-- left side content end -->
        <!-- right side content start -->

            <div style="margin-bottom: 25px;">
            <div style="
                background-color: #3A7E11;
                height: 46px;
                box-sizing: border-box;
                text-align: center;
                color: white;
                font-size: 19px;
                font-weight: bold;
                padding-top: 6px;
            ">
                <h2 style="all: inherit;" tabindex="4">COMMUNITY INFORMATION</h2>
            </div>
            <div style="background-image: url('images/ejreport/topdown_streets_backdrop.png'); background-position-x: -290px; background-size: 460px 338px; background-color: #eee; height: 340px">
                <table role="Community information overview" summary="Community information overview" style="
                    font-family: Oswald, Arial, sans-serif;
                    width: 41%;
                    height: 338px;
                    font-size: 12px;
                    font-weight: bold;
                    text-align: center;
                    line-height: 16px;
                    position: relative;
                    top: 20px;">
                    <tr>
                        <td style="width: 25%">
                            <div id="low_income_radial_gauge" style="margin-top: -15px"></div>
                            Low income:<br /><span id="P_LOWINC">XX</span> percent
                        </td>

                        <td style="width: 25%">
                            <div id="people_of_color_radial_gauge"
                                style="margin-top: -15px"></div>
                            People of color:<br /><span id="PCT_MINORITY">XX</span> percent
                        </td>
                        <td style="width: 25%">
                            <div id="less_than_hs_radial_gauge"
                                style="margin-top: -15px"></div>
                            Less than high <br />school education:<br /><span id="P_EDU_LTHS">XX</span> percent
                        </td>
                        <td style="width: 25%">
                            <div id="limited_english_households_radial_gauge"
                                style="margin-top: -15px"></div>
                            Limited English <br />households:<br /><span id="P_LIMITED_ENG_HH">XX</span> percent
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 25%">
                            <div id="unemployment_radial_gauge"
                                style="margin-top: -15px"></div>
                            Unemployment:<br /><span id="P_EMP_STAT_UNEMPLOYED">XX</span> percent
                        </td>
                        <td style="width: 25%">
                            <div id="persons_with_disabilities_radial_gauge"
                                style="margin-top: -15px"></div>
                            Persons with <br />disabilities:<br /><span id="P_DISABILITY">XX</span> percent
                        </td>
                        <td style="width: 25%">
                            <div id="male_radial_gauge" style="margin-top: -15px"></div>
                            Male:<br /><span id="P_MALES">XX</span> percent
                        </td>
                        <td style="width: 25%">
                            <div id="female_radial_gauge" style="margin-top: -15px"></div>
                            Female:<br /><span id="P_FEMALES">XX</span> percent
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 25%; padding-bottom: 15px">
                            <div style="font-size: 18px; margin-bottom: 10px; padding-bottom:15px;">
                                <span id="LIFEEXP">XX</span>
                            </div>
                            Average life<br />expectancy<br />
                        </td>
                        </td>
                        <td style="width: 25%; padding-bottom: 15px">
                            <div style="font-size: 18px; margin-bottom: 10px; padding-bottom:15px;">
                                <span id="PER_CAP_INC">XX</span>
                            </div>
                            Per capita <br />income<br />
                        </td>
                        <td style="width: 25%">
                            <img src="images/ejreport/house icon.png"
                                alt="House icon"
                                width="60"
                                style="margin-top: -40px" />
                            <br />Number of <br />households:<br /><span id="HSHOLDS">XX</span>
                        </td>
                        <td style="width: 25%">
                            <div id="owner_occupied_radial_gauge"
                                style="margin-top: -15px"></div>
                            Owner <br />occupied:<br /><span id="P_OWN_OCCUPIED">XX</span> percent
                        </td>
                    </tr>
                </table>
            </div>
            <div style="
            background-color: #0E6CB6;
            height: 40px;
            box-sizing: border-box;
            text-align: center;
            color: white;
            font-size: 19px;
            font-weight: bold;
            padding-top: 6px;
            ">
                <h2 style="all: inherit;" tabindex="5">BREAKDOWN BY RACE</h2>
            </div>
            <div>
                <table role="Breakdown by race" summary="Breakdown by race" summary="Breakdown by race" style="
                font-family: Oswald, Arial, sans-serif;
                width: 41%;
                height: 168px;
                font-size: 12px;
                font-weight: bold;
                text-align: center;
                line-height: 16px;
                position: relative;
                top: 20px;
            ">
                    <tr>
                        <td style="width: 25%">
                            <div id="white_percent_radial_gauge"
                                 style="margin-top: -15px"></div>
                            White: <span id="P_NHWHITE">XX</span>%
                        </td>

                        <td style="width: 25%">
                            <div id="black_percent_radial_gauge"
                                 style="margin-top: -15px"></div>
                            Black: <span id="P_NHBLACK">XX</span>%
                        </td>
                        <td style="width: 25%">
                            <div id="american_indian_percent_radial_gauge"
                                 style="margin-top: -15px"></div>
                            American Indian: <span id="P_NHAMERIND">XX</span>%
                        </td>
                        <td style="width: 25%">
                            <div id="asian_percent_radial_gauge"
                                 style="margin-top: -15px"></div>
                            Asian: <span id="P_NHASIAN">XX</span>%
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 25%">
                            <div id="hawaiian_percent_radial_gauge"
                                 style="margin-top: -15px"></div>
                            Hawaiian/Pacific <br />Islander: <span id="P_NHHAWPAC">XX</span>%
                        </td>
                        <td style="width: 25%">
                            <div id="other_race_percent_radial_gauge"
                                 style="margin-top: -30px"></div>
                            Other race: <span id="P_NHOTHER_RACE">XX</span>%
                        </td>
                        <td style="width: 25%">
                            <div id="multiple_races_percent_radial_gauge"
                                 style="margin-top: -15px"></div>
                            Two or more <br />races: <span id="P_NHTWOMORE">XX</span>%
                        </td>
                        <td style="width: 25%">
                            <div id="hispanic_percent_radial_gauge"
                                 style="margin-top: -30px"></div>
                            Hispanic: <span id="P_HISP">XX</span>%
                        </td>
                    </tr>
                </table>
                <div style="width: 42%; position: relative; left: 58%; margin-top: 10px">
                    <div style="
                        background-color: #0E6CB6;
                        height: 40px;
                        box-sizing: border-box;
                        text-align: center;
                        color: white;
                        font-size: 19px;
                        font-weight: bold;
                        padding-top: 6px;
                        margin-bottom: 15px;
                        ">
                        <h2 style="all: inherit;" tabindex="6">BREAKDOWN BY AGE</h2>
                    </div>
                    <table role="Breakdown by age" summary="Breakdown by age">
                        <tr>
                            <td style="
                                margin: -20px 0 0 10px;
                                width: 30%;
                                height: 80%;
                                box-sizing: border-box;
                                padding-top: 5px;
                            ">
                                <div style="
                                    display: flex;
                                    flex-wrap: wrap;
                                    align-content: center;
                                    width: 128px;
                                    height: 17px;
                                    margin: 0 auto 4px auto;
                                    background-color: #888888;
                                ">
                                    <div id="ages_1_to_4_linear_gauge"
                                         style="
                                        display: inline-block;
                                        width: 50%;
                                        height: 17px;
                                        margin-left: 0;
                                        background-color: #0E6CB6;
                                "></div>
                                </div>
                                <div style="
                    display: flex;
                    flex-wrap: wrap;
                    align-content: center;
                    width: 128px;
                    height: 17px;
                    margin: 0 auto 4px auto;
                    background-color: #888888;
                    ">
                                    <div id="ages_1_to_18_linear_gauge"
                                         style="
                        display: inline-block;
                        width: 50%;
                        height: 17px;
                        margin-left: 0;
                        background-color: #fff101;
                    "></div>
                                </div>
                                <div style="
                    display: flex;
                    flex-wrap: wrap;
                    align-content: center;
                    width: 128px;
                    height: 17px;
                    margin: 0 auto 4px auto;
                    background-color: #888888;
                    ">
                                    <div id="ages_18_and_up_linear_gauge"
                                         style="
                        display: inline-block;
                        width: 50%;
                        height: 17px;
                        margin-left: 0;
                        background-color: #3A7E11;
                    "></div>
                                </div>
                                <div style="
                    display: flex;
                    flex-wrap: wrap;
                    align-content: center;
                    width: 128px;
                    height: 17px;
                    margin: 0 auto 4px auto;
                    background-color: #888888;
                    ">
                                    <div id="ages_65_and_up_linear_gauge"
                                         style="
                        display: inline-block;
                        width: 50%;
                        height: 17px;
                        margin-left: 0;
                        background-color: #faba59;
                    "></div>
                                </div>
                            </td>
                            <td style="
                    font-family: Oswald, Arial, sans-serif;
                    margin: -20px 0 0 5px;
                    width: 52%;
                    height: 80%;
                    line-height: 21px;
                    font-weight: normal;
                    font-size: 15px;
                ">
                                From Ages 1 to 4<br />
                                From Ages 1 to 18<br />
                                From Ages 18 and up<br />
                                From Ages 65 and up
                            </td>
                            <td style="
                    font-family: Oswald, Arial, sans-serif;
                    margin-left: 5px;
                    width: 10%;
                    height: 80%;
                    line-height: 21px;
                    font-weight: bold;
                    text-align: right;
                    padding-right: 8px;
                ">
                                <span id="P_AGE_LT5">XX</span>%<br />
                                <span id="P_AGE_LT18">XX</span>%<br />
                                <span id="P_AGE_GT17">XX</span>%<br />
                                <span id="P_AGE_GT64">XX</span>%
                            </td>
                        </tr>
                    </table>
                    <div style="height: 190px;">
                        <h2 style="
                    text-align: center;
                    font-size: 19px;
                    color: white;
                    background-color: #0E6CB6;
                    height: 34px;
                    padding-top: 12px;
                " tabindex="7">
                            LIMITED ENGLISH SPEAKING BREAKDOWN
                        </h2>
                        <table summary="Limited English speaking breakdown" role="Limited English speaking breakdown">
                            <tr>
                                <td style="
                        margin: -20px 0 0 10px;
                        width: 30%;
                        height: 80%;
                        box-sizing: border-box;
                        padding-top: 5px;
                    ">
                                    <div style="
                        display: flex;
                        flex-wrap: wrap;
                        align-content: center;
                        width: 128px;
                        height: 17px;
                        margin: 0 auto 4px auto;
                        background-color: #888888;
                        ">
                                        <div id="speak_spanish_linear_gauge"
                                             style="
                            display: inline-block;
                            width: 50%;
                            height: 17px;
                            margin-left: 0;
                            background-color: #0E6CB6;
                        "></div>
                                    </div>
                                    <div style="
                        display: flex;
                        flex-wrap: wrap;
                        align-content: center;
                        width: 128px;
                        height: 17px;
                        margin: 0 auto 4px auto;
                        background-color: #888888;
                        ">
                                        <div id="speak_other_indio_european_linear_gauge"
                                             style="
                            display: inline-block;
                            width: 50%;
                            height: 17px;
                            margin-left: 0;
                            background-color: #fff101;
                        "></div>
                                    </div>
                                    <div style="
                        display: flex;
                        flex-wrap: wrap;
                        align-content: center;
                        width: 128px;
                        height: 17px;
                        margin: 0 auto 4px auto;
                        background-color: #888888;
                        ">
                                        <div id="speak_asian_pacific_islander_linear_gauge"
                                             style="
                            display: inline-block;
                            width: 50%;
                            height: 17px;
                            margin-left: 0;
                            background-color: #3A7E11;
                        "></div>
                                    </div>
                                    <div style="
                        display: flex;
                        flex-wrap: wrap;
                        align-content: center;
                        width: 128px;
                        height: 17px;
                        margin: 0 auto 4px auto;
                        background-color: #888888;
                        ">
                                        <div id="speak_other_languages_linear_gauge"
                                             style="
                            display: inline-block;
                            width: 50%;
                            height: 17px;
                            margin-left: 0;
                            background-color: #faba59;
                        "></div>
                                    </div>
                                </td>
                                <td style="
                        font-family: Oswald, Arial, sans-serif;
                        margin: -20px 0 0 5px;
                        width: 52%;
                        height: 80%;
                        line-height: 21px;
                        font-weight: normal;
                        font-size: 15px;
                    ">
                                    Speak Spanish<br />
                                    Speak Other Indo-European Languages<br />
                                    Speak Asian-Pacific Island Languages<br />
                                    Speak Other Languages
                                </td>
                                <td style="
                        font-family: Oswald, Arial, sans-serif;
                        margin-left: 5px;
                        width: 10%;
                        height: 80%;
                        line-height: 21px;
                        font-weight: bold;
                        text-align: right;
                        padding-right: 8px;
                    ">
                                    <span id="P_HLI_SPANISH_LI">XX</span>%<br />
                                    <span id="P_HLI_IE_LI">XX</span>%<br />
                                    <span id="P_HLI_API_LI">XX</span>%<br />
                                    <span id="P_HLI_OTHER_LI">XX</span>%
                                </td>
                            </tr>
                        </table>
                        <p class="fine-print">
                            Notes: Numbers may not sum to totals due to rounding. Hispanic
                            population can be of any race. Source: U.S. Census Bureau, American
                            Community Survey (ACS) 2018-2022. Life expectancy data comes from
                            the Centers for Disease Control.
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- right side content end-->
        <div style=" height: 100px;
        font-style: italic;
        font-size: .82em;
        line-height: 1.65em;
        padding: 0 10px;
        margin: 10px 0 10px 25px;
        ">
            <span style="font-size: 14px">Report for <span class="LOCATIONSTR">1 mile Ring Centered at 39.002146,-77.921299</span></span>
            <br>
            <span style="font-size: 14px; font-style: italic;">Report produced <span class="REPORTDATE">July 16, 2024</span> using EJScreen <span class="REPORTVERSION"></span></span>
            </div>
        <!-- -------------------------------- PAGE 2 ----------------------------------- -->
        <div class="print-page">
        <div id="page-2-header"
             class="header"
             style="
            background-color: #0E6CB6;
            color: white;
            text-align: center;
            padding: 20px 32px 10px 32px;
            margin: 10px 0 -23px 0;
        ">
            <h2 tabindex="8" style="font-size: 30px; margin-bottom: -5px">
                Environmental Justice & Supplemental Indexes
            </h2>
            <p style="font-family: Oswald, Arial, sans-serif; font-size: 15px; padding-left: 20px;">
                The environmental justice and supplemental indexes are a combination of environmental 
                and socioeconomic information. There are thirteen EJ indexes and supplemental indexes 
                in EJScreen reflecting the 13 environmental indicators. The indexes for a selected area 
                are compared to those for all other locations in the state or nation. For more information 
                and calculation details on the EJ and supplemental indexes, please visit the 
                <a tabindex="9" href="https://www.epa.gov/ejscreen" style="color: white">EJScreen website</a>. 
            </p>
        </div>
        <div style="
            background-color: #3A7E11;
            color: white;
            text-align: center;
            padding: 0 32px 7px 32px;
        ">
            <h3  tabindex="10" style="
            padding-top: 10px;
            margin-bottom: -10px;
            font-family: Arial, sans-serif;
            font-size: 23px;
            ">
                EJ INDEXES
            </h3>
            <p style="font-family: Oswald, Arial, sans-serif; font-weight: 300; font-size: 16px; margin: 15px 15% -2px 15%">
                The EJ indexes help users screen for potential EJ concerns. To do this,
                the EJ index combines data on low income and people of color populations
                with a single environmental indicator.
            </p>
        </div>
        <div id="ej-index-bar-chart" class="linear-bar-chart"
             style="padding: 3px 0px; margin: 5px 0 -20px 0">
        </div>
        <div style="
            background-color: #3A7E11;
            color: white;
            text-align: center;
            padding: 0 32px 7px 32px;
        ">
            <h3 tabindex="11" style="
            padding-top: 10px;
            margin-bottom: -10px;
            font-family: Arial, sans-serif;
            font-size: 23px;
            ">
                SUPPLEMENTAL INDEXES
            </h3>
            <p style="font-family: Oswald, Arial, sans-serif; font-weight: 300; font-size: 16px; margin-bottom: -2px; padding-left: 20px;">
                The supplemental indexes offer a different perspective 
                on community-level vulnerability. They combine data on percent low income, 
                percent persons with disabilities, percent less than high school 
                education, percent limited English speaking, and percent low life expectancy 
                with a single environmental indicator.
            </p>
        </div>
        <div id="supp-index-bar-chart" class="linear-bar-chart"
             style="padding: 3px 0px; margin-top: 5px; margin-bottom: -20px">
        </div>
        <!-- <div style="padding-right: 5%; float: right;">
            <p class="fine-print">
                These percentiles provide perspective on how the selected block group or
                buffer area compares to the entire state or nation.<br>
                <div style="margin-top: 5px; font-size: 14px">Report for <span class="LOCATIONSTR">XX</span></div>
                <br/>
				<span style="font-size: 14px; font-style: italic;">Report produced <span class="REPORTDATE"></span> using EJScreen <span class="REPORTVERSION"></span></span>
            </p>
            </div> -->
            <div style=" height: 100px;
        font-style: italic;
        font-size: .82em;
        line-height: 1.65em;
        padding: 0 10px;
        margin: 10px 0 10px 50px;
        ">
            <span style="font-size: 14px">Report for <span class="LOCATIONSTR">1 mile Ring Centered at 39.002146,-77.921299</span></span>
            <br>
            <span style="font-size: 14px; font-style: italic;">Report produced <span class="REPORTDATE">July 16, 2024</span> using EJScreen <span class="REPORTVERSION"></span></span>
            </div>
        </div>

        <!------------------------------ PAGE 3  --------------------------------->
        <div class="print-page">
        <div id="page-3-header"
            class="header"
            style="
            background-color: #0E6CB6;
            color: white;
            height: 85px;
                clear: both;
                margin-top: 7px;">
            <h2  tabindex="12" style="text-align: center; padding-top: 35px; font-size: 32px; padding-left: 20px;">
                EJScreen Environmental and Socioeconomic Indicators Data
            </h2>
        </div>
        <table id="data-indicators-table" role="EJScreen environmental and socioeconomic indicators data" class="color-alt-table" summary="EJScreen environmental and socioeconomic indicators data">
            <thead id="data-indicators-table-header" class="color-alt-table-header">
              <tr>
                  <th id="data-indicators-table-selected-variables" scope="col">SELECTED VARIABLES</th>
                  <th id="data-indicators-table-value" scope="col">VALUE</th>
                  <th id="data-indicators-table-state-average" scope="col">STATE<BR> AVERAGE</th>
                  <th id="data-indicators-table-percentile-in-state" scope="col">PERCENTILE<BR> IN STATE</th>
                  <th id="data-indicators-table-usa average" scope="col">USA AVERAGE</th>
                  <th id="data-indicators-table-percentile-in-usa" scope="col">PERCENTILE<BR> IN USA</th>
              </tr>
            </thead>
            <tr class="color-alt-table-subheader">
                <th colspan="7">
                    Pollution and Sources
                </th>
            </tr>
            <tr>
                <td headers="data-indicators-table-selected-variables">Particulate Matter&nbsp;&nbsp;(&mu;g/m<span class="table-superscript"><sup>3</sup></span>)</td>
                <td headers="data-indicators-table-value"><span id="RAW_E_PM25">XX</span></td>
                <td headers="data-indicators-table-state-average"><span id="S_E_PM25">XX</span></td>
                <td headers="data-indicators-table-percentile-in-state"><span id="S_E_PM25_PER">XX</span></td>
                <td headers="data-indicators-table-usa average"><span id="N_E_PM25">XX</span></td>
                <td headers="data-indicators-table-percentile-in-usa"><span id="N_E_PM25_PER">XX</span></td>
            </tr>
            <tr>
                <td headers="data-indicators-table-selected-variables">Ozone&nbsp;&nbsp;(ppb)</td>
                <td headers="data-indicators-table-value"><span id="RAW_E_O3">XX</span></td>
                <td headers="data-indicators-table-state-average"><span id="S_E_O3">XX</span></td>
                <td headers="data-indicators-table-percentile-in-state"><span id="S_E_O3_PER">XX</span></td>
                <td headers="data-indicators-table-usa average"><span id="N_E_O3">XX</span></td>
                <td headers="data-indicators-table-percentile-in-usa"><span id="N_E_O3_PER">XX</span></td>
            </tr>
			<tr>
                    <td headers="data-indicators-table-selected-variables">Nitrogen Dioxide (NO<sub>2</sub>)&nbsp;&nbsp;(ppbv)</td>
                    <td headers="data-indicators-table-value"><span id="RAW_E_NO2">XX</span></td>
                    <td headers="data-indicators-table-state-average"><span id="S_E_NO2">XX</span></td>
                    <td headers="data-indicators-table-percentile-in-state"><span id="S_E_NO2_PER">XX</span></td>
                    <td headers="data-indicators-table-usa average"><span id="N_E_NO2">XX</span></td>
                    <td headers="data-indicators-table-percentile-in-usa"><span id="N_E_NO2_PER">XX</span></td>
              </tr>
            <tr>
                <td headers="data-indicators-table-selected-variables">Diesel Particulate Matter&nbsp;&nbsp;(&mu;g/m<span class="table-superscript"><sup>3</sup></span>)</td>
                <td headers="data-indicators-table-value"><span id="RAW_E_DIESEL">XX</span></td>
                <td headers="data-indicators-table-state-average"><span id="S_E_DIESEL">XX</span></td>
                <td headers="data-indicators-table-percentile-in-state"><span id="S_E_DIESEL_PER">XX</span></td>
                <td headers="data-indicators-table-usa average"><span id="N_E_DIESEL">XX</span></td>
                <td headers="data-indicators-table-percentile-in-usa"><span id="N_E_DIESEL_PER">XX</span></td>
            </tr>
            
            <tr>
                <td headers="data-indicators-table-selected-variables">Toxic Releases to Air&nbsp;&nbsp;(toxicity-weighted concentration)</td>
                <td headers="data-indicators-table-value"><span id="RAW_E_RSEI_AIR">XX</span></td>
                <td headers="data-indicators-table-state-average"><span id="S_E_RSEI_AIR">XX</span></td>
                <td headers="data-indicators-table-percentile-in-state"><span id="S_E_RSEI_AIR_PER">XX</span></td>
                <td headers="data-indicators-table-usa average"><span id="N_E_RSEI_AIR">XX</span></td>
                <td headers="data-indicators-table-percentile-in-usa"><span id="N_E_RSEI_AIR_PER">XX</span></td>
            </tr>
            <tr>
                <td headers="data-indicators-table-selected-variables">Traffic Proximity&nbsp;&nbsp;(daily traffic count/distance to road)</td>
                <td headers="data-indicators-table-value"><span id="RAW_E_TRAFFIC">XX</span></td>
                <td headers="data-indicators-table-state-average"><span id="S_E_TRAFFIC">XX</span></td>
                <td headers="data-indicators-table-percentile-in-state"><span id="S_E_TRAFFIC_PER">XX</span></td>
                <td headers="data-indicators-table-usa average"><span id="N_E_TRAFFIC">XX</span></td>
                <td headers="data-indicators-table-percentile-in-usa"><span id="N_E_TRAFFIC_PER">XX</span></td>
            </tr>
            <tr>
                <td headers="data-indicators-table-selected-variables">Lead Paint&nbsp;&nbsp;(% Pre-1960 Housing)</td>
                <td headers="data-indicators-table-value"><span id="RAW_E_LEAD">XX</span></td>
                <td headers="data-indicators-table-state-average"><span id="S_E_LEAD">XX</span></td>
                <td headers="data-indicators-table-percentile-in-state"><span id="S_E_LEAD_PER">XX</span></td>
                <td headers="data-indicators-table-usa average"><span id="N_E_LEAD">XX</span></td>
                <td headers="data-indicators-table-percentile-in-usa"><span id="N_E_LEAD_PER">XX</span></td>
            </tr>
            <tr>
                <td headers="data-indicators-table-selected-variables">Superfund Proximity&nbsp;&nbsp;(site count/km distance)</td>
                <td headers="data-indicators-table-value"><span id="RAW_E_NPL">XX</span></td>
                <td headers="data-indicators-table-state-average"><span id="S_E_NPL">XX</span></td>
                <td headers="data-indicators-table-percentile-in-state"><span id="S_E_NPL_PER">XX</span></td>
                <td headers="data-indicators-table-usa average"><span id="N_E_NPL">XX</span></td>
                <td headers="data-indicators-table-percentile-in-usa"><span id="N_E_NPL_PER">XX</span></td>
            </tr>
            <tr>
                <td headers="data-indicators-table-selected-variables">RMP Facility Proximity&nbsp;&nbsp;(facility count/km distance)</td>
                <td headers="data-indicators-table-value"><span id="RAW_E_RMP">XX</span></td>
                <td headers="data-indicators-table-state-average"><span id="S_E_RMP">XX</span></td>
                <td headers="data-indicators-table-percentile-in-state"><span id="S_E_RMP_PER">XX</span></td>
                <td headers="data-indicators-table-usa average"><span id="N_E_RMP">XX</span></td>
                <td headers="data-indicators-table-percentile-in-usa"><span id="N_E_RMP_PER">XX</span></td>
            </tr>
            <tr>
                <td headers="data-indicators-table-selected-variables">Hazardous Waste Proximity&nbsp;&nbsp;(facility count/km distance)</td>
                <td headers="data-indicators-table-value"><span id="RAW_E_TSDF">XX</span></td>
                <td headers="data-indicators-table-state-average"><span id="S_E_TSDF">XX</span></td>
                <td headers="data-indicators-table-percentile-in-state"><span id="S_E_TSDF_PER">XX</span></td>
                <td headers="data-indicators-table-usa average"><span id="N_E_TSDF">XX</span></td>
                <td headers="data-indicators-table-percentile-in-usa"><span id="N_E_TSDF_PER">XX</span></td>
            </tr>
            <tr>
                <td headers="data-indicators-table-selected-variables">Underground Storage Tanks&nbsp;&nbsp;(count/km<span class="table-superscript"><sup>2</sup></span>)</td>
                <td headers="data-indicators-table-value"><span id="RAW_E_UST">XX</span></td>
                <td headers="data-indicators-table-state-average"><span id="S_E_UST">XX</span></td>
                <td headers="data-indicators-table-percentile-in-state"><span id="S_E_UST_PER">XX</span></td>
                <td headers="data-indicators-table-usa average"><span id="N_E_UST">XX</span></td>
                <td headers="data-indicators-table-percentile-in-usa"><span id="N_E_UST_PER">XX</span></td>
            </tr>
            <tr>
                <td headers="data-indicators-table-selected-variables">Wastewater Discharge&nbsp;&nbsp;(toxicity-weighted concentration/m distance)</td>
                <td headers="data-indicators-table-value"><span id="RAW_E_NPDES">XX</span></td>
                <td headers="data-indicators-table-state-average"><span id="S_E_NPDES">XX</span></td>
                <td headers="data-indicators-table-percentile-in-state"><span id="S_E_NPDES_PER">XX</span></td>
                <td headers="data-indicators-table-usa average"><span id="N_E_NPDES">XX</span></td>
                <td headers="data-indicators-table-percentile-in-usa"><span id="N_E_NPDES_PER">XX</span></td>
            </tr>
				<tr>
                    <td headers="data-indicators-table-selected-variables">Drinking Water Non-Compliance&nbsp;&nbsp;(points)</td>
                    <td headers="data-indicators-table-value"><span id="RAW_E_DWATER">XX</span></td>
                    <td headers="data-indicators-table-state-average"><span id="S_E_DWATER">XX</span></td>
                    <td headers="data-indicators-table-percentile-in-state"><span id="S_E_DWATER_PER">XX</span></td>
                    <td headers="data-indicators-table-usa average"><span id="N_E_DWATER">XX</span></td>
                    <td headers="data-indicators-table-percentile-in-usa"><span id="N_E_DWATER_PER">XX</span></td>
                </tr>
            <tr class="color-alt-table-subheader">
                <th colspan="7">
                    Socioeconomic Indicators
                </th>
            </tr>
            <tr>
                <td headers="data-indicators-table-selected-variables">Demographic Index USA</td>
                <td headers="data-indicators-table-value"><span id="RAW_D_DEMOGIDX2">XX%</span></td>
                <td headers="data-indicators-table-state-average"><span id="S_D_DEMOGIDX2">N/A</span></td>
                <td headers="data-indicators-table-percentile-in-state"><span id="S_D_DEMOGIDX2_PER">N/A</span></td>
                <td headers="data-indicators-table-usa average"><span id="N_D_DEMOGIDX2">XX%</span></td>
                <td headers="data-indicators-table-percentile-in-usa"><span id="N_D_DEMOGIDX2_PER">XX</span></td>
            </tr>
            <tr>
                <td headers="data-indicators-table-selected-variables">Supplemental Demographic Index USA</td>
                <td headers="data-indicators-table-value"><span id="RAW_D_DEMOGIDX5">XX%</span></td>
                <td headers="data-indicators-table-state-average"><span id="S_D_DEMOGIDX5">N/A</span></td>
                <td headers="data-indicators-table-percentile-in-state"><span id="S_D_DEMOGIDX5_PER">N/A</span></td>
                <td headers="data-indicators-table-usa average"><span id="N_D_DEMOGIDX5">XX%</span></td>
                <td headers="data-indicators-table-percentile-in-usa"><span id="N_D_DEMOGIDX5_PER">XX</span></td>
            </tr>
            <tr>
                    <td headers="data-indicators-table-selected-variables">Demographic Index State</td>
                    <td headers="data-indicators-table-value"><span id="RAW_D_DEMOGIDX2ST">XX%</span></td>
                    <td headers="data-indicators-table-state-average"><span id="S_D_DEMOGIDX2ST">XX%</span></td>
                    <td headers="data-indicators-table-percentile-in-state"><span id="S_D_DEMOGIDX2ST_PER">XX</span></td>
                    <td headers="data-indicators-table-usa average"><span id="N_D_DEMOGIDX2ST">N/A</span></td>
                    <td headers="data-indicators-table-percentile-in-usa"><span id="N_D_DEMOGIDX2ST_PER">N/A</span></td>
             </tr>
             <tr>
                    <td headers="data-indicators-table-selected-variables">Supplemental Demographic Index State</td>
                    <td headers="data-indicators-table-value"><span id="RAW_D_DEMOGIDX5ST">XX%</span></td>
                    <td headers="data-indicators-table-state-average"><span id="S_D_DEMOGIDX5ST">XX%</span></td>
                    <td headers="data-indicators-table-percentile-in-state"><span id="S_D_DEMOGIDX5ST_PER">XX</span></td>
                    <td headers="data-indicators-table-usa average"><span id="N_D_DEMOGIDX5ST">N/A</span></td>
                    <td headers="data-indicators-table-percentile-in-usa"><span id="N_D_DEMOGIDX5ST_PER">N/A</span></td>
             </tr>
            <tr>
                <td headers="data-indicators-table-selected-variables">People of Color</td>
                <td headers="data-indicators-table-value"><span id="RAW_D_PEOPCOLOR">XX%</span></td>
                <td headers="data-indicators-table-state-average"><span id="S_D_PEOPCOLOR">XX%</span></td>
                <td headers="data-indicators-table-percentile-in-state"><span id="S_D_PEOPCOLOR_PER">XX</span></td>
                <td headers="data-indicators-table-usa average"><span id="N_D_PEOPCOLOR">XX%</span></td>
                <td headers="data-indicators-table-percentile-in-usa"><span id="N_D_PEOPCOLOR_PER">XX</span></td>
            </tr>
            <tr>
                <td headers="data-indicators-table-selected-variables">Low Income</td>
                <td headers="data-indicators-table-value"><span id="RAW_D_INCOME">XX%</span></td>
                <td headers="data-indicators-table-state-average"><span id="S_D_INCOME">XX%</span></td>
                <td headers="data-indicators-table-percentile-in-state"><span id="S_D_INCOME_PER">XX</span></td>
                <td headers="data-indicators-table-usa average"><span id="N_D_INCOME">XX%</span></td>
                <td headers="data-indicators-table-percentile-in-usa"><span id="N_D_INCOME_PER">XX</span></td>
            </tr>
           <%--  <tr>
                    <td headers="data-indicators-table-selected-variables">Persons with Disabilities</td>
                    <td headers="data-indicators-table-value"><span id="RAW_D_DISABLED">XX%</span></td>
                    <td headers="data-indicators-table-state-average"><span id="S_D_DISABLED">XX%</span></td>
                    <td headers="data-indicators-table-percentile-in-state"><span id="S_D_DISABLED_PER">XX</span></td>
                    <td headers="data-indicators-table-usa average"><span id="N_D_DISABLED">XX%</span></td>
                    <td headers="data-indicators-table-percentile-in-usa"><span id="N_D_DISABLED_PER">XX</span></td>
              </tr>--%>
            <tr>
                <td headers="data-indicators-table-selected-variables">Unemployment Rate</td>
                <td headers="data-indicators-table-value"><span id="RAW_D_UNEMPLOYED">XX%</span></td>
                <td headers="data-indicators-table-state-average"><span id="S_D_UNEMPLOYED">XX%</span></td>
                <td headers="data-indicators-table-percentile-in-state"><span id="S_D_UNEMPLOYED_PER">XX</span></td>
                <td headers="data-indicators-table-usa average"><span id="N_D_UNEMPLOYED">XX%</span></td>
                <td headers="data-indicators-table-percentile-in-usa"><span id="N_D_UNEMPLOYED_PER">XX</span></td>
            </tr>
            <tr>
                <td headers="data-indicators-table-selected-variables">Limited English Speaking Households</td>
                <td headers="data-indicators-table-value"><span id="RAW_D_LING">XX%</span></td>
                <td headers="data-indicators-table-state-average"><span id="S_D_LING">XX%</span></td>
                <td headers="data-indicators-table-percentile-in-state"><span id="S_D_LING_PER">XX</span></td>
                <td headers="data-indicators-table-usa average"><span id="N_D_LING">XX%</span></td>
                <td headers="data-indicators-table-percentile-in-usa"><span id="N_D_LING_PER">XX</span></td>
            </tr>
            <tr>
                <td headers="data-indicators-table-selected-variables">Less Than High School Education</td>
                <td headers="data-indicators-table-value"><span id="RAW_D_LESSHS">XX%</span></td>
                <td headers="data-indicators-table-state-average"><span id="S_D_LESSHS">XX%</span></td>
                <td headers="data-indicators-table-percentile-in-state"><span id="S_D_LESSHS_PER">XX</span></td>
                <td headers="data-indicators-table-usa average"><span id="N_D_LESSHS">XX%</span></td>
                <td headers="data-indicators-table-percentile-in-usa"><span id="N_D_LESSHS_PER">XX</span></td>
            </tr>
            <tr>
                <td headers="data-indicators-table-selected-variables">Under Age 5</td>
                <td headers="data-indicators-table-value"><span id="RAW_D_UNDER5">XX%</span></td>
                <td headers="data-indicators-table-state-average"><span id="S_D_UNDER5">XX%</span></td>
                <td headers="data-indicators-table-percentile-in-state"><span id="S_D_UNDER5_PER">XX</span></td>
                <td headers="data-indicators-table-usa average"><span id="N_D_UNDER5">XX%</span></td>
                <td headers="data-indicators-table-percentile-in-usa"><span id="N_D_UNDER5_PER">XX</span></td>
            </tr>
            <tr>
                <td headers="data-indicators-table-selected-variables">Over Age 64</td>
                <td headers="data-indicators-table-value"><span id="RAW_D_OVER64">XX%</span></td>
                <td headers="data-indicators-table-state-average"><span id="S_D_OVER64">XX%</span></td>
                <td headers="data-indicators-table-percentile-in-state"><span id="S_D_OVER64_PER">XX</span></td>
                <td headers="data-indicators-table-usa average"><span id="N_D_OVER64">XX%</span></td>
                <td headers="data-indicators-table-percentile-in-usa"><span id="N_D_OVER64_PER">XX</span></td>
            </tr>
           <%-- <tr>
                <td headers="data-indicators-table-selected-variables">Low Life Expectancy</td>
                <td headers="data-indicators-table-value"><span id="RAW_D_LIFEEXP">XX%</span></td>
                <td headers="data-indicators-table-state-average"><span id="S_D_LIFEEXP">XX%</span></td>
                <td headers="data-indicators-table-percentile-in-state"><span id="S_D_LIFEEXP_PER">XX</span></td>
                <td headers="data-indicators-table-usa average"><span id="N_D_LIFEEXP">XX%</span></td>
                <td headers="data-indicators-table-percentile-in-usa"><span id="N_D_LIFEEXP_PER">XX</span></td>
            </tr>--%>
          </table>
         <p class="fine-print" style="margin: -24px 5% 5px 5%;">*Diesel particulate matter index is from the EPA's Air Toxics Data Update, which is the Agency's ongoing, comprehensive evaluation of air 
            toxics in the United States. This effort aims to prioritize air toxics, emission sources, and locations of 
            interest for further study. It is important to remember that the air toxics data presented here provide broad 
            estimates of health risks over geographic areas of the country, not definitive risks to specific individuals or 
            locations.  More information on the Air Toxics 
            Data Update can be found at: <a tabindex="13" href="https://www.epa.gov/haps/air-toxics-data-update">https://www.epa.gov/haps/air-toxics-data-update</a>.</p>

        <table style="margin: 30px auto; width: 90%" role="additional information" summary="Additional environmental and socioeconomic information">
            <tr>
                <td style="
                border-right: 2px solid black;
                vertical-align: top;
                padding-right: 20px;
                width: 55%;
            ">
                    <h3  tabindex="14" style="font-family: Oswald, Arial, sans-serif">Sites reporting to EPA within defined area:</h3>
                    <div style="height: 4px; background-color: #b1db98; margin: -14px 0 10px 0"></div>
                    <table style="min-width: 92%; line-height: 18px" summary="Sites reporting to EPA within defined area" role="Sites reporting to EPA within defined area">
                        <tr class="entry">
                            <td class="chapter">Superfund<span role="presentation"> . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</span></td>
                            <td class="page" style="text-align: right"><span id="NUM_NPL">XX</span></td>
                        </tr>
                        <tr class="entry">
                            <td class="chapter">
                                Hazardous Waste, Treatment, Storage, and Disposal Facilities<span role="presentation"> . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . .</span>
                            </td>
                            <td class="page" style="text-align: right"><span id="NUM_TSDF">XX</span></td>
                        </tr>
                        <tr class="entry">
                            <td class="chapter">Water Dischargers<span role="presentation"> . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</span></td>
                            <td class="page" style="text-align: right"><span id="NUM_WATERDIS">XX</span></td>
                        </tr>
                        <tr class="entry">
                            <td class="chapter">Air Pollution<span role="presentation" style="padding-left: 0.25ch"> . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</span></td>
                            <td class="page" style="text-align: right"><span id="NUM_AIRPOLL">XX</span></td>
                        </tr>
                        <tr class="entry">
                            <td class="chapter">Brownfields<span role="presentation" style="padding-right: 0.25ch"> . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</span></td>
                            <td class="page" style="text-align: right"><span id="NUM_BROWNFIELD">XX</span></td>
                        </tr>
                        <tr class="entry">
                            <td class="chapter">Toxic Release Inventory<span role="presentation" style="padding-right: 0.25ch"> . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</span></td>
                            <td class="page" style="text-align: right"><span id="NUM_TRI">XX</span></td>
                        </tr>
                    </table>

                </td>
                <td style="vertical-align: top; padding-left: 20px;">
                    <h3  tabindex="15" style="font-family: Oswald, Arial, sans-serif">Other community features within defined area:</h3>
                    <div style="height: 4px; background-color: #b1db98; margin: -14px 0 10px 0"></div>
                    <table style="min-width: 92%; line-height: 18px" summary="Other community features within defined area" role="Other community features within defined area">
                        <tr class="entry">
                            <td class="chapter">Schools<span role="presentation" style="padding-left: 0.70ch;"> . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</span></td>
                            <td class="page" style="text-align: right"><span id="NUM_SCHOOL">XX</span></td>
                        </tr>
                        <tr class="entry">
                            <td class="chapter">Hospitals<span role="presentation" style="padding-left: 0.30ch;"> . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</span></td>
                            <td class="page" style="text-align: right"><span id="NUM_HOSPITAL">XX</span></td>
                        </tr>
                        <tr class="entry">
                            <td class="chapter">Places of Worship<span role="presentation"> . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</span></td>
                            <td class="page" style="text-align: right"><span id="NUM_CHURCH">XX</span></td>
                        </tr>
                    </table>
                    <div style="background-color: black; height: 0.75px; width: 85%; margin: 20px 0;"></div>
                    <h3 tabindex="16" style="font-family: Oswald, Arial, sans-serif">Other environmental data:</h3>
                    <div style="height: 4px; background-color: #b1db98; margin: -14px 0 10px 0"></div>
                    <table style="width: 92%; line-height: 18px" summary="Other environmental data" role="Other environmental data">
                        <tr class="entry">
                            <td class="chapter">Air Non-attainment<span role="presentation"> . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</span></td>
                            <td class="page" style="text-align: right"><span id="YESNO_AIRNONATT">XX</span></td>
                        </tr>
                        <tr class="entry">
                            <td class="chapter">Impaired Waters<span role="presentation" style="padding-left: 0.35ch"> . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .</span></td>
                            <td class="page" style="text-align: right"><span id="YESNO_IMPWATERS">XX</span></td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>

        <section style="background-color: #dfeed4; border: 1.5px solid #3A7E11; width: 513px; padding: 10px; margin-left: 55px">
            <div class="entry">
                <span class="chapter">Selected location contains American Indian Reservation Lands*<span role="presentation" style="padding-left: 0.2ch;"> . . . . . . . . . . . . . . . . . . . . . . . . . . . . . </span></span>
                <span id="YESNO_TRIBAL" class="page">XX</span>
            </div>
            <div class="entry">
                <span class="chapter">Selected location contains a "Justice40 (CEJST)" disadvantaged community<span role="presentation" style="padding-left: 0.2ch;"> . . . . . . . . . . . . . . . . . . . </span></span>
                <span id="YESNO_CEJSTDIS" class="page">XX</span>
            </div>
            <div class="entry">
                <span class="chapter">Selected location contains an EPA IRA disadvantaged community<span role="presentation"> . . . . . . . . . . . . . . . . . . . . . . . . . . . . </span></span>
				<!--Note 6/22/23 temp disable IRA question, always NA until further notice. Remove ID so doesn't update span-->
				<!--Note 7/11/23 added back-->
                <span id="YESNO_IRADIS" class="page">XX</span>
				<!--<span id="" class="page">N/A</span>-->
            </div>
        </section>

        <div style=" height: 100px;
        font-style: italic;
        font-size: .82em;
        line-height: 1.65em;
        padding: 0 10px;
        margin: 10px 0 10px 50px;
        ">
            <span style="font-size: 14px">Report for <span class="LOCATIONSTR">XX</span></span>
            <br/>
            <span style="font-size: 14px; font-style: italic;">Report produced <span class="REPORTDATE"></span> using EJScreen <span class="REPORTVERSION"></span></span>
            </div>
        </div>

        <!-- ----------------------------- PAGE 4 ------------------------------------- -->
        <div class="print-page">
        <div id="page-4-header"
            class="header"
            style="
            background-color: #0E6CB6;
            color: white;
                margin-top: 7px;
            height: 85px;">
            <h2 tabindex="17" style="text-align: center; padding-top: 35px; font-size: 32px; padding-left: 20px;">
                EJScreen Environmental and Socioeconomic Indicators Data
            </h2>
        </div>

        <table class="color-alt-table indicators-section-table" summary="Health indicators data" role="Health indicators data">
            <tr class="color-alt-table-title">
                <th colspan="6">
                    Health Indicators
                </th>
            </tr>
            <tr class="color-alt-table-subheader">
                <th scope="col">Indicator</th>
                <th scope="col">Value</th>
                <th scope="col">State Average</th>
                <th scope="col">State Percentile</th>
                <th scope="col">US Average</th>
                <th scope="col">US Percentile</th>
            </tr>
            <tr>
                <th scope="row" style="font-weight: normal; text-align: left; font-size: 16px; padding-left: 5px;">Low Life Expectancy</td>
                <td style="text-align: center;" id="RAW_HI_LIFEEXPPCT">XX</td>
                <td id="S_HI_LIFEEXPPCT_AVG">XX</td>
                <td id="S_HI_LIFEEXPPCT_PCTILE">XX</td>
                <td id="N_HI_LIFEEXPPCT_AVG">XX</td>
                <td id="N_HI_LIFEEXPPCT_PCTILE">XX</td>
            </tr>
            <tr>
                <th scope="row" style="font-weight: normal; text-align: left; font-size: 16px; padding-left: 5px;">Heart Disease</td>
                <td style="text-align: center;" id="RAW_HI_HEARTDISEASE">XX</td>
                <td id="S_HI_HEARTDISEASE_AVG">XX</td>
                <td id="S_HI_HEARTDISEASE_PCTILE">XX</td>
                <td id="N_HI_HEARTDISEASE_AVG">XX</td>
                <td id="N_HI_HEARTDISEASE_PCTILE">XX</td>
            </tr>
            <tr>
                <th scope="row" style="font-weight: normal; text-align: left; font-size: 16px; padding-left: 5px;">Asthma</td>
                <td style="text-align: center;" id="RAW_HI_ASTHMA">XX</td>
                <td id="S_HI_ASTHMA_AVG">XX</td>
                <td id="S_HI_ASTHMA_PCTILE">XX</td>
                <td id="N_HI_ASTHMA_AVG">XX</td>
                <td id="N_HI_ASTHMA_PCTILE">XX</td>
            </tr>
            <tr>
                <th scope="row" style="font-weight: normal; text-align: left; font-size: 16px; padding-left: 5px;">Cancer</td>
                <td style="text-align: center;" id="RAW_HI_CANCER">XX</td>
                <td id="S_HI_CANCER_AVG">XX</td>
                <td id="S_HI_CANCER_PCTILE">XX</td>
                <td id="N_HI_CANCER_AVG">XX</td>
                <td id="N_HI_CANCER_PCTILE">XX</td>
            </tr>
            <tr>
                <th scope="row" style="font-weight: normal; text-align: left; font-size: 16px; padding-left: 5px;">
                    Persons with Disabilities
                </td>
                <td style="text-align: center;" id="RAW_HI_DISABILITYPCT">XX</td>
                <td id="S_HI_DISABILITYPCT_AVG">XX</td>
                <td id="S_HI_DISABILITYPCT_PCTILE">XX</td>
                <td id="N_HI_DISABILITYPCT_AVG">XX</td>
                <td id="N_HI_DISABILITYPCT_PCTILE">XX</td>
            </tr>
        </table>
    
        <table class="color-alt-table indicators-section-table" summary="Climate indicators data" role="Climate indicators data">
            <tr class="color-alt-table-title">
                <th colspan="6">
                    Climate Indicators
                </th>
            </tr>
            <tr class="color-alt-table-subheader">
                <th scope="col">Indicator</th>
                <th scope="col">Value</th>
                <th scope="col">State Average</th>
                <th scope="col">State Percentile</th>
                <th scope="col">US Average</th>
                <th scope="col">US Percentile</th>
            </tr>
            <tr>
                <th scope="row" style="font-weight: normal; text-align: left; font-size: 16px; padding-left: 5px;">Flood Risk</td>
                <td style="text-align: center;" id="RAW_CI_FLOOD">XX</td>
                <td id="S_CI_FLOOD_AVG">XX</td>
                <td id="S_CI_FLOOD_PCTILE">XX</td>
                <td id="N_CI_FLOOD_AVG">XX</td>
                <td id="N_CI_FLOOD_PCTILE">XX</td>
            </tr>
            <tr>
                <th scope="row" style="font-weight: normal; text-align: left; font-size: 16px; padding-left: 5px;">Wildfire Risk </td>
                <td style="text-align: center;" id="RAW_CI_FIRE">XX</td>
                <td id="S_CI_FIRE_AVG">XX</td>
                <td id="S_CI_FIRE_PCTILE">XX</td>
                <td id="N_CI_FIRE_AVG">XX</td>
                <td id="N_CI_FIRE_PCTILE">XX</td>
            </tr>
            <!-- <tr>
                <th scope="row" style="font-weight: normal; text-align: left; font-size: 16px; padding-left: 5px;">Extreme Heat</td>
                <td style="text-align: center;" id="RAW_CI_HEAT">XX</td>
                <td id="S_CI_HEAT_AVG">XX</td>
                <td id="S_CI_HEAT_PCTILE">XX</td>
                <td id="N_CI_HEAT_AVG">XX</td>
                <td id="N_CI_HEAT_PCTILE">XX</td>
            </tr> -->
        </table>
    
        <table class="color-alt-table indicators-section-table" summary="Critical service gaps data" role="Critical service gaps data">
            <tr class="color-alt-table-title">
                <th colspan="6">
                Critical Service Gaps
                </th>
            </tr>
            <tr class="color-alt-table-subheader">
                <th scope="col">Indicator</th>
                <th scope="col">Value</th>
                <th scope="col">State Average</th>
                <th scope="col">State Percentile</th>
                <th scope="col">US Average</th>
                <th scope="col">US Percentile</th>
            </tr>
            <tr>
                <th scope="row" style="font-weight: normal; text-align: left; font-size: 16px; padding-left: 5px;">Broadband Internet</td>
                <td style="text-align: center;" id="RAW_CG_LIMITEDBBPCT">XX</td>
                <td id="S_CG_LIMITEDBBPCT_AVG">XX</td>
                <td id="S_CG_LIMITEDBBPCT_PCTILE">XX</td>
                <td id="N_CG_LIMITEDBBPCT_AVG">XX</td>
                <td id="N_CG_LIMITEDBBPCT_PCTILE">XX</td>
            </tr>
            <tr>
                <th scope="row" style="font-weight: normal; text-align: left; font-size: 16px; padding-left: 5px;">Lack of Health Insurance</td>
                <td style="text-align: center;" id="RAW_CG_NOHINCPCT">XX</td>
                <td id="S_CG_NOHINCPCT_AVG">XX</td>
                <td id="S_CG_NOHINCPCT_PCTILE">XX</td>
                <td id="N_CG_NOHINCPCT_AVG">XX</td>
                <td id="N_CG_NOHINCPCT_PCTILE">XX</td>
            </tr>
            <tr>
                <th scope="row" style="font-weight: normal; text-align: left; font-size: 16px; padding-left: 5px;">Housing Burden</td>
                <td style="text-align: center;" id="YESNO_HOUSEBURDEN">XX</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
            </tr>
            <tr>
                <th scope="row" style="font-weight: normal; text-align: left; font-size: 16px; padding-left: 5px;">Transportation Access Burden</td>
                <td style="text-align: center;" id="YESNO_TRANSDIS">XX</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
            </tr>
            <tr>
                <th scope="row" style="font-weight: normal; text-align: left; font-size: 16px; padding-left: 5px;">Food Desert</td>
                <td style="text-align: center;" id="YESNO_FOODDESERT">XX</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
            </tr>
        </table>
        
        <div style=" height: 100px;
            padding: 0 10px;
            margin: 10px 0 10px 50px;">
            <!--<span class="fine-print">Footnotes</span><br><br>-->
            <span style="font-size: 14px; font-style: italic;">Report for <span class="LOCATIONSTR">XX</span></span>
            <br/>
				<span style="font-size: 14px; font-style: italic;">Report produced <span class="REPORTDATE"></span> using EJScreen <span class="REPORTVERSION"></span></span>
        </div>

            <div id="footer4">
            <div style="
                background-color: #0E6CB6;
                box-sizing: border-box;
                width: 30%;
                height: 50px;
                margin: -14px -3px 0 0;
                border-radius: 0 10px 0 0;
                text-align: center;
                font-size: 22px;
                font-weight: bold;
                padding-top: 15px;
                float: left;">
                <a tabindex="18" href="https://www.epa.gov/ejscreen"
                   style="text-decoration: none; color: white">www.epa.gov/ejscreen</a>
            </div>
            <div style="
                background-color: #0E6CB6;
                box-sizing: border-box;
                height: 24px;
                margin-left: 30%;
                position: relative;
                top: 12px;
                width: 100%;">
                &nbsp;
                </div>
            </div>
        </div>
    </div>
</body>

<!-- community information radial gauges -->
<script>
    function doGauges() {
        //low income
        var options = {
            series: [statHash["P_LOWINC"]],
            chart: {
                type: "radialBar",
                offsetY: -20,
                sparkline: {
                    enabled: true,
                },
                animations: {
                    enabled: false
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 1,
                    track: {
                        margin: 0,
                        background: "#6c6d70",
                        strokeWidth: 110,
                    },
                    hollow: {
                        margin: 0,
                    },
                    dataLabels: {
                        show: false,
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: -2,
                            fontSize: "22px",
                        },
                    },
                },
            },
            grid: {
                padding: {
                    top: -10,
                },
            },
            fill: {
                colors: ["#3A7E11"],
                type: "solid",
                pattern: {
                    width: "100%",
                },
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                },
            }
        };

        var chart = new ApexCharts(
            document.querySelector("#low_income_radial_gauge"),
            options
        );
        chart.render();

        //people of color
        var options = {
            series: [statHash["PCT_MINORITY"]],
            chart: {
                type: "radialBar",
                offsetY: -20,
                height: 90,
                sparkline: {
                    enabled: true,
                },
                animations: {
                    enabled: false
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 1,
                    track: {
                        margin: 0,
                        background: "#6c6d70",
                        strokeWidth: 110,
                    },
                    hollow: {
                        margin: 0,
                    },
                    dataLabels: {
                        show: false,
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: -2,
                            fontSize: "22px",
                        },
                    },
                },
            },
            grid: {
                padding: {
                    top: -10,
                },
            },
            fill: {
                colors: ["#3A7E11"],
                type: "solid",
                pattern: {
                    width: "100%",
                },
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                },
            }
        };

        var chart = new ApexCharts(
            document.querySelector("#people_of_color_radial_gauge"),
            options
        );
        chart.render();

        //less than high school
        var options = {
            series: [statHash["P_EDU_LTHS"]],
            chart: {
                type: "radialBar",
                offsetY: -12,
                height: 90,
                sparkline: {
                    enabled: true,
                },
                animations: {
                    enabled: false
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 1,
                    track: {
                        margin: 0,
                        background: "#6c6d70",
                        strokeWidth: 110,
                    },
                    hollow: {
                        margin: 0,
                    },
                    dataLabels: {
                        show: false,
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: -2,
                            fontSize: "22px",
                        },
                    },
                },
            },
            grid: {
                padding: {
                    top: -10,
                },
            },
            fill: {
                colors: ["#3A7E11"],
                type: "solid",
                pattern: {
                    width: "100%",
                },
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                },
            }
        };

        var chart = new ApexCharts(
            document.querySelector("#less_than_hs_radial_gauge"),
            options
        );
        chart.render();

        //limited english households
        var options = {
            series: [statHash["P_LIMITED_ENG_HH"]],
            chart: {
                type: "radialBar",
                offsetY: -12,
                height: 90,
                sparkline: {
                    enabled: true,
                },
                animations: {
                    enabled: false
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 1,
                    track: {
                        margin: 0,
                        background: "#6c6d70",
                        strokeWidth: 110,
                    },
                    hollow: {
                        margin: 0,
                    },
                    dataLabels: {
                        show: false,
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: -2,
                            fontSize: "22px",
                        },
                    },
                },
            },
            grid: {
                padding: {
                    top: -10,
                },
            },
            fill: {
                colors: ["#3A7E11"],
                type: "solid",
                pattern: {
                    width: "100%",
                },
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                },
            }
        };

        var chart = new ApexCharts(
            document.querySelector("#limited_english_households_radial_gauge"),
            options
        );
        chart.render();

        //unemployment
        var options = {
            series: [statHash["P_EMP_STAT_UNEMPLOYED"]],
            chart: {
                type: "radialBar",
                offsetY: -20,
                height: 90,
                sparkline: {
                    enabled: true,
                },
                animations: {
                    enabled: false
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 1,
                    track: {
                        margin: 0,
                        background: "#6c6d70",
                        strokeWidth: 110,
                    },
                    hollow: {
                        margin: 0,
                    },
                    dataLabels: {
                        show: false,
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: -2,
                            fontSize: "22px",
                        },
                    },
                },
            },
            grid: {
                padding: {
                    top: -10,
                },
            },
            fill: {
                colors: ["#3A7E11"],
                type: "solid",
                pattern: {
                    width: "100%",
                },
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                },
            }
        };

        var chart = new ApexCharts(
            document.querySelector("#unemployment_radial_gauge"),
            options
        );
        chart.render();

        //persons with disabilities
        var options = {
            series: [statHash["P_DISABILITY"]],
            chart: {
                type: "radialBar",
                offsetY: -12,
                height: 90,
                sparkline: {
                    enabled: true,
                },
                animations: {
                    enabled: false
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 1,
                    track: {
                        margin: 0,
                        background: "#6c6d70",
                        strokeWidth: 110,
                    },
                    hollow: {
                        margin: 0,
                    },
                    dataLabels: {
                        show: false,
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: -2,
                            fontSize: "22px",
                        },
                    },
                },
            },
            grid: {
                padding: {
                    top: -10,
                },
            },
            fill: {
                colors: ["#3A7E11"],
                type: "solid",
                pattern: {
                    width: "100%",
                },
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                },
            }
        };

        var chart = new ApexCharts(
            document.querySelector("#persons_with_disabilities_radial_gauge"),
            options
        );
        chart.render();

        //male
        var options = {
            series: [statHash["P_MALES"]],
            chart: {
                type: "radialBar",
                offsetY: -20,
                height: 90,
                sparkline: {
                    enabled: true,
                },
                animations: {
                    enabled: false
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 1,
                    track: {
                        margin: 0,
                        background: "#6c6d70",
                        strokeWidth: 110,
                    },
                    hollow: {
                        margin: 0,
                    },
                    dataLabels: {
                        show: false,
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: -2,
                            fontSize: "22px",
                        },
                    },
                },
            },
            grid: {
                padding: {
                    top: -10,
                },
            },
            fill: {
                colors: ["#3A7E11"],
                type: "solid",
                pattern: {
                    width: "100%",
                },
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                },
            }
        };

        var chart = new ApexCharts(
            document.querySelector("#male_radial_gauge"),
            options
        );
        chart.render();

        //female
        var options = {
            series: [statHash["P_FEMALES"]],
            chart: {
                type: "radialBar",
                offsetY: -20,
                height: 90,
                sparkline: {
                    enabled: true,
                },
                animations: {
                    enabled: false
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 1,
                    track: {
                        margin: 0,
                        background: "#6c6d70",
                        strokeWidth: 110,
                    },
                    hollow: {
                        margin: 0,
                    },
                    dataLabels: {
                        show: false,
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: -2,
                            fontSize: "22px",
                        },
                    },
                },
            },
            grid: {
                padding: {
                    top: -10,
                },
            },
            fill: {
                colors: ["#3A7E11"],
                type: "solid",
                pattern: {
                    width: "100%",
                },
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                },
            }
        };

        var chart = new ApexCharts(
            document.querySelector("#female_radial_gauge"),
            options
        );
        chart.render();

        //owner occupied
        var options = {
            series: [statHash["P_OWN_OCCUPIED"]],
            chart: {
                type: "radialBar",
                offsetY: -10,
                height: 90,
                sparkline: {
                    enabled: true,
                },
                animations: {
                    enabled: false
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 1,
                    track: {
                        margin: 0,
                        background: "#6c6d70",
                        strokeWidth: 110,
                    },
                    hollow: {
                        margin: 0,
                    },
                    dataLabels: {
                        show: false,
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: -2,
                            fontSize: "22px",
                        },
                    },
                },
            },
            grid: {
                padding: {
                    top: -10,
                },
            },
            fill: {
                colors: ["#3A7E11"],
                type: "solid",
                pattern: {
                    width: "100%",
                },
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                },
            }
        };

        var chart = new ApexCharts(
            document.querySelector("#owner_occupied_radial_gauge"),
            options
        );
        chart.render();

        //white percent
        var options = {
            series: [statHash["P_NHWHITE"]],
            chart: {
                type: "radialBar",
                offsetY: -10,
                height: 110,
                sparkline: {
                    enabled: true,
                },
                animations: {
                    enabled: false
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 1,
                    track: {
                        margin: 0,
                        background: "#888888",
                        strokeWidth: 110,
                    },
                    hollow: {
                        margin: 0,
                    },
                    dataLabels: {
                        show: false,
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: -2,
                            fontSize: "22px",
                        },
                    },
                },
            },
            grid: {
                padding: {
                    top: -10,
                },
            },
            fill: {
                colors: ["#0E6CB6"],
                type: "solid",
                pattern: {
                    width: "100%",
                },
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                },
            }
        };

        var chart = new ApexCharts(
            document.querySelector("#white_percent_radial_gauge"),
            options
        );
        chart.render();

        //black percent
        var options = {
            series: [statHash["P_NHBLACK"]],
            chart: {
                type: "radialBar",
                offsetY: -10,
                height: 110,
                sparkline: {
                    enabled: true,
                },
                animations: {
                    enabled: false
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 1,
                    track: {
                        margin: 0,
                        background: "#888888",
                        strokeWidth: 110,
                    },
                    hollow: {
                        margin: 0,
                    },
                    dataLabels: {
                        show: false,
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: -2,
                            fontSize: "22px",
                        },
                    },
                },
            },
            grid: {
                padding: {
                    top: -10,
                },
            },
            fill: {
                colors: ["#0E6CB6"],
                type: "solid",
                pattern: {
                    width: "100%",
                },
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                },
            }
        };

        var chart = new ApexCharts(
            document.querySelector("#black_percent_radial_gauge"),
            options
        );
        chart.render();

        //american indian percent
        var options = {
            series: [statHash["P_NHAMERIND"]],
            chart: {
                type: "radialBar",
                offsetY: -10,
                height: 110,
                sparkline: {
                    enabled: true,
                },
                animations: {
                    enabled: false
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 1,
                    track: {
                        margin: 0,
                        background: "#888888",
                        strokeWidth: 110,
                    },
                    hollow: {
                        margin: 0,
                    },
                    dataLabels: {
                        show: false,
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: -2,
                            fontSize: "22px",
                        },
                    },
                },
            },
            grid: {
                padding: {
                    top: -10,
                },
            },
            fill: {
                colors: ["#0E6CB6"],
                type: "solid",
                pattern: {
                    width: "100%",
                },
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                },
            }
        };
		
		 var chart = new ApexCharts(
            document.querySelector("#american_indian_percent_radial_gauge"),
            options
        );
        chart.render();

        //asian percent
        var options = {
            series: [statHash["P_NHASIAN"]],
            chart: {
                type: "radialBar",
                offsetY: -10,
                height: 110,
                sparkline: {
                    enabled: true,
                },
                animations: {
                    enabled: false
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 1,
                    track: {
                        margin: 0,
                        background: "#888888",
                        strokeWidth: 110,
                    },
                    hollow: {
                        margin: 0,
                    },
                    dataLabels: {
                        show: false,
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: -2,
                            fontSize: "22px",
                        },
                    },
                },
            },
            grid: {
                padding: {
                    top: -10,
                },
            },
            fill: {
                colors: ["#0E6CB6"],
                type: "solid",
                pattern: {
                    width: "100%",
                },
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                },
            }
        };

        var chart = new ApexCharts(
            document.querySelector("#asian_percent_radial_gauge"),
            options
        );
        chart.render();

       

        //hawaiian / pacific islander percent
        var options = {
            series: [statHash["P_NHHAWPAC"]],
            chart: {
                type: "radialBar",
                offsetY: -10,
                height: 110,
                sparkline: {
                    enabled: true,
                },
                animations: {
                    enabled: false
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 1,
                    track: {
                        margin: 0,
                        background: "#888888",
                        strokeWidth: 110,
                    },
                    hollow: {
                        margin: 0,
                    },
                    dataLabels: {
                        show: false,
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: -2,
                            fontSize: "22px",
                        },
                    },
                },
            },
            grid: {
                padding: {
                    top: -10,
                },
            },
            fill: {
                colors: ["#0E6CB6"],
                type: "solid",
                pattern: {
                    width: "100%",
                },
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                },
            }
        };

        var chart = new ApexCharts(
            document.querySelector("#hawaiian_percent_radial_gauge"),
            options
        );
        chart.render();

        //other race percent
        var options = {
            series: [statHash["P_NHOTHER_RACE"]],
            chart: {
                type: "radialBar",
                offsetY: -10,
                height: 110,
                sparkline: {
                    enabled: true,
                },
                animations: {
                    enabled: false
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 1,
                    track: {
                        margin: 0,
                        background: "#888888",
                        strokeWidth: 110,
                    },
                    hollow: {
                        margin: 0,
                    },
                    dataLabels: {
                        show: false,
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: -2,
                            fontSize: "22px",
                        },
                    },
                },
            },
            grid: {
                padding: {
                    top: -10,
                },
            },
            fill: {
                colors: ["#0E6CB6"],
                type: "solid",
                pattern: {
                    width: "100%",
                },
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                },
            }
        };

        var chart = new ApexCharts(
            document.querySelector("#other_race_percent_radial_gauge"),
            options
        );
        chart.render();

        //multiple races percent
        var options = {
            series: [statHash["P_NHTWOMORE"]],
            chart: {
                type: "radialBar",
                offsetY: -10,
                height: 110,
                sparkline: {
                    enabled: true,
                },
                animations: {
                    enabled: false
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 1,
                    track: {
                        margin: 0,
                        background: "#888888",
                        strokeWidth: 110,
                    },
                    hollow: {
                        margin: 0,
                    },
                    dataLabels: {
                        show: false,
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: -2,
                            fontSize: "22px",
                        },
                    },
                },
            },
            grid: {
                padding: {
                    top: -10,
                },
            },
            fill: {
                colors: ["#0E6CB6"],
                type: "solid",
                pattern: {
                    width: "100%",
                },
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                },
            }
        };

        var chart = new ApexCharts(
            document.querySelector("#multiple_races_percent_radial_gauge"),
            options
        );
        chart.render();

        //hispanic percent
        var options = {
            series: [statHash["P_HISP"]],
            chart: {
                type: "radialBar",
                offsetY: -10,
                height: 110,
                sparkline: {
                    enabled: true,
                },
                animations: {
                    enabled: false
                }
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 1,
                    track: {
                        margin: 0,
                        background: "#888888",
                        strokeWidth: 110,
                    },
                    hollow: {
                        margin: 0,
                    },
                    dataLabels: {
                        show: false,
                        name: {
                            show: false,
                        },
                        value: {
                            offsetY: -2,
                            fontSize: "22px",
                        },
                    },
                },
            },
            grid: {
                padding: {
                    top: -10,
                },
            },
            fill: {
                colors: ["#0E6CB6"],
                type: "solid",
                pattern: {
                    width: "100%",
                },
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                },
            }
        };

        var chart = new ApexCharts(
            document.querySelector("#hispanic_percent_radial_gauge"),
            options
        );
        chart.render();
    }
</script>

<script>
    function doAgeChart() {

        //do LINGISO linear graphs by adjusting div width based on
        document.getElementById("ages_1_to_4_linear_gauge").style.width = statHash["P_AGE_LT5"] + "%";
        document.getElementById("ages_1_to_18_linear_gauge").style.width = statHash["P_AGE_LT18"] + "%";
        document.getElementById("ages_18_and_up_linear_gauge").style.width = statHash["P_AGE_GT17"] + "%";
        document.getElementById("ages_65_and_up_linear_gauge").style.width = statHash["P_AGE_GT64"] + "%";
    
    //The rest of this <script> block is the old radial bar chart generation     
    //Generate the Age Distribution Pie Chart
    //     var options = {
    //         //"Age 1 - 4", "Age 1 - 18", "Age 18+", "Age 65+"
    //         series: [Number(statHash["P_AGE_LT5"]), Number(statHash["P_AGE_LT18"]), Number(statHash["P_AGE_GT17"]), Number(statHash["P_AGE_GT64"])],
    //         chart: {
    //             type: "radialBar",
    //             height: 175,
    //             animations: {
    //                 enabled: false
    //             }
    //         },
    //         labels: ["Age 1 - 4", "Age 1 - 18", "Age 18+", "Age 65+"],
    //         colors: ["#0E6CB6", "#3A7E11", "#253f8e", "#faba59"],
    //         plotOptions: {
    //             radialBar: {
    //                 offsetX: -90,
    //                 offsetY: -15,
    //                 startAngle: -90,
    //                 endAngle: 270,
    //                 hollow: {
    //                     size: '10%'
    //                 },
    //                 dataLabels: {
    //                     show: false
    //                 },
    //                 track: {
    //                     background: "#f5f5f5"
    //                 }
    //             },

    //         },
    //         dataLabels: {
    //             show: false,
    //             formatter(val, opts) {
    //                 return "";
    //             },
    //             style: {
    //                 fontSize: "17px",
    //                 fontFamily: '"Source Sans Pro", sans-serif',
    //                 fontWeight: "normal",
    //             },
    //         },
    //         legend: {
    //             show: true,
    //             floating: true,
    //             fontSize: "14px",
    //             position: "right",
    //             offsetX: 45,
    //             offsetY: -12,
    //             labels: {
    //                 useSeriesColors: false,
    //             },
    //             fontFamily: "Oswald, Arial, sans-serif",
    //             markers: {
    //                 size: 1,
    //                 radius: 0
    //             },
    //             formatter: function (seriesName, opts) {
    //                 return (
    //                     seriesName + ":  " + String(opts.w.globals.series[opts.seriesIndex] + "%").bold()
    //                 );
    //             },
    //             itemMargin: {
    //                 vertical: 3,
    //             },
    //             onItemClick: {
    //                 toggleDataSeries: false
    //             },
    //             onItemHover: {
    //                 highlightDataSeries: false
    //             }
    //         },
    //         states: {
    //             hover: {
    //                 filter: {
    //                     type: 'none'
    //                 }
    //             },
    //             active: {
    //                 filter: {
    //                     type: 'none'
    //                 }
    //             },
    //         }
    //     };

    //     var chart = new ApexCharts(
    //         document.querySelector("#age-radial-bar-chart"),
    //         options
    //     );
    //     chart.render();
    }
</script>

<script>
    function doEJMainChart() {
        //Generate the EJ Index bar chart
        var options = {
            series: [
                {
                    name: "State Percentile",
                    data: [
                        Number(ejmainHash["S_P2_PM25"]),
                        Number(ejmainHash["S_P2_O3"]),
                        Number(ejmainHash["S_P2_NO2"]),
                        Number(ejmainHash["S_P2_DIESEL"]),
                        Number(ejmainHash["S_P2_RSEI_AIR"]),
                        Number(ejmainHash["S_P2_TRAFFIC"]),
                        Number(ejmainHash["S_P2_LEAD"]),
                        Number(ejmainHash["S_P2_NPL"]),
                        Number(ejmainHash["S_P2_RMP"]),
                        Number(ejmainHash["S_P2_TSDF"]),
                        Number(ejmainHash["S_P2_UST"]),
                        Number(ejmainHash["S_P2_NPDES"]),
                        Number(ejmainHash["S_P2_DWATER"]),
                    ],
                },
                {
                    name: "National Percentile",
                    data: [
                        Number(ejmainHash["N_P2_PM25"]),
                        Number(ejmainHash["N_P2_O3"]),
                        Number(ejmainHash["N_P2_NO2"]),
                        Number(ejmainHash["N_P2_DIESEL"]),
                        Number(ejmainHash["N_P2_RSEI_AIR"]),
                        Number(ejmainHash["N_P2_TRAFFIC"]),
                        Number(ejmainHash["N_P2_LEAD"]),
                        Number(ejmainHash["N_P2_NPL"]),
                        Number(ejmainHash["N_P2_RMP"]),
                        Number(ejmainHash["N_P2_TSDF"]),
                        Number(ejmainHash["N_P2_UST"]),
                        Number(ejmainHash["N_P2_NPDES"]),
                        Number(ejmainHash["N_P2_DWATER"]),
                    ],
                },
            ],
            chart: {
                type: "bar",
                height: 460,
                width: "95%",
                offsetX: 20,
                animations: {
                    enabled: false
                }
            },
            title: {
                text: "EJ INDEXES FOR THE SELECTED LOCATION",
                align: "center",
                style: {
                    fontSize: 19,
                    fontFamily: "Arial",
                    fontWeight: 800
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    dataLabels: {
                        position: "top",
                    },
                    columnWidth: '70%',
                    borderRadius: 10,
                    borderRadiusApplication: 'end'
                },
            },
            colors: ['#0E6CB6', '#3A7E11'],
            legend: {
                position: "right",
                offsetY: 322,
                fontWeight: 700,
                height: 62,
                markers: {
                    width: 18,
                    height: 18,
                    radius: 0,
                    offsetY: 4,
                    offsetX: -5
                },
                itemMargin: {
                    horizontal: 5,
                    vertical: 3
                },
                onItemClick: {
                    toggleDataSeries: false
                },
                onItemHover: {
                    highlightDataSeries: false
                }
            },
            tooltip: {
                enabled: false
            },
            dataLabels: {
                enabled: true,
                offsetX: 0,
                offsetY: -18,
                style: {
                    fontSize: "12px",
                    fontFamily: '"Source Sans Pro", sans-serif',
                    colors: ["#000"],
                },
            },
            stroke: {
                show: true,
                width: 1,
                colors: ["#fff"],
            },
            tooltip: {
                enabled: false,
                shared: true,
                intersect: false,
            },
            xaxis: {
                categories: [
                    ["Particulate", "Matter 2.5"],
                    ["Ozone"],
                    ["Nitrogen", "Dioxide", "(NO\u2082)"],
                    ["Diesel", "Particulate", "Matter"],
                    ["Toxic", "Releases", "To Air"],
                    ["Traffic", "Proximity"],
                    ["Lead", "Paint"],
                    ["Superfund", "Proximity"],
                    ["RMP", "Facility", "Proximity"],
                    ["Hazardous", "Waste", "Proximity"],
                    ["Underground", "Storage", "Tanks"],
                    ["Wastewater", "Discharge"],
                    ["Drinking", "Water", "Non-Compliance"],
                ],
                labels: {
                    rotate: 0,
                    style: {
                        fontSize: 10
                    }
                }
            },
            yaxis: {
                max: 100,
                min: 0,
                title: {
                    text: "PERCENTILE",
                    style: {
                        fontFamily: "Oswald, Arial, sans-serif",
                        fontWeight: 500,
                        fontSize: 16
                    }
                }
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                },
            }
        };

        var chart = new ApexCharts(
            document.querySelector("#ej-index-bar-chart"),
            options
        );
        chart.render();

    }
</script>

<script>
    function doEJSuppChart() {
        //Generate the Supplemental Index bar chart
        var options = {
            series: [
                {
                    name: "State Percentile",
                    data: [
                        Number(ejmainHash["S_P5_PM25"]),
                        Number(ejmainHash["S_P5_O3"]),
                        Number(ejmainHash["S_P5_NO2"]),
                        Number(ejmainHash["S_P5_DIESEL"]),
                        Number(ejmainHash["S_P5_RSEI_AIR"]),
                        Number(ejmainHash["S_P5_TRAFFIC"]),
                        Number(ejmainHash["S_P5_LEAD"]),
                        Number(ejmainHash["S_P5_NPL"]),
                        Number(ejmainHash["S_P5_RMP"]),
                        Number(ejmainHash["S_P5_TSDF"]),
                        Number(ejmainHash["S_P5_UST"]),
                        Number(ejmainHash["S_P5_NPDES"]),
                        Number(ejmainHash["S_P5_DWATER"]),
                    ],
                },
                {
                    name: "National Percentile",
                    data: [
                        Number(ejmainHash["N_P5_PM25"]),
                        Number(ejmainHash["N_P5_O3"]),
                        Number(ejmainHash["N_P5_NO2"]),
                        Number(ejmainHash["N_P5_DIESEL"]),
                        Number(ejmainHash["N_P5_RSEI_AIR"]),
                        Number(ejmainHash["N_P5_TRAFFIC"]),
                        Number(ejmainHash["N_P5_LEAD"]),
                        Number(ejmainHash["N_P5_NPL"]),
                        Number(ejmainHash["N_P5_RMP"]),
                        Number(ejmainHash["N_P5_TSDF"]),
                        Number(ejmainHash["N_P5_UST"]),
                        Number(ejmainHash["N_P5_NPDES"]),
                        Number(ejmainHash["N_P5_DWATER"]),
                    ],
                },
            ],
            chart: {
                type: "bar",
                height: 460,
                width: "95%",
                offsetX: 20,
                animations: {
                    enabled: false
                }
            },
            title: {
                text: "SUPPLEMENTAL INDEXES FOR THE SELECTED LOCATION",
                align: "center",
                style: {
                    fontSize: 19,
                    fontFamily: "Arial",
                    fontWeight: 800
                }
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    dataLabels: {
                        position: "top",
                    },
                    columnWidth: '70%',
                    borderRadius: 10,
                    borderRadiusApplication: 'end'
                },
            },
            colors: ['#0E6CB6', '#3A7E11'],
            legend: {
                position: "right",
                offsetY: 322,
                fontWeight: 700,
                height: 62,
                markers: {
                    width: 18,
                    height: 18,
                    radius: 0,
                    offsetY: 4,
                    offsetX: -5
                },
                itemMargin: {
                    horizontal: 5,
                    vertical: 3
                },
                onItemClick: {
                    toggleDataSeries: false
                },
                onItemHover: {
                    highlightDataSeries: false
                }
            },
            dataLabels: {
                enabled: true,
                offsetX: 0,
                offsetY: -18,
                style: {
                    fontSize: "12px",
                    fontFamily: '"Source Sans Pro", sans-serif',
                    colors: ["#000"],
                },
            },
            stroke: {
                show: true,
                width: 1,
                colors: ["#fff"],
            },
            tooltip: {
                enabled: false,
                shared: true,
                intersect: false,
            },
            xaxis: {
                categories: [
                    ["Particulate", "Matter 2.5"],
                    ["Ozone"],
                    ["Nitrogen", "Dioxide", "(NO\u2082)"],
                    ["Diesel", "Particulate", "Matter"],
                    ["Toxic", "Releases", "To Air"],
                    ["Traffic", "Proximity"],
                    ["Lead", "Paint"],
                    ["Superfund", "Proximity"],
                    ["RMP", "Facility", "Proximity"],
                    ["Hazardous", "Waste", "Proximity"],
                    ["Underground", "Storage", "Tanks"],
                    ["Wastewater", "Discharge"],
                    ["Drinking", "Water", "Non-Compliance"]
                ],
                labels: {
                    rotate: 0,
                    style: {
                        fontSize: 10
                    }
                }
            },
            yaxis: {
                max: 100,
                min: 0,
                title: {
                    text: "PERCENTILE",
                    style: {
                        fontFamily: "Oswald, Arial, sans-serif",
                        fontWeight: 500,
                        fontSize: 16
                    }
                }
            },
            states: {
                hover: {
                    filter: {
                        type: 'none'
                    }
                },
                active: {
                    filter: {
                        type: 'none'
                    }
                },
            }
        };

        var chart = new ApexCharts(
            document.querySelector("#supp-index-bar-chart"),
            options
        );
        chart.render();
    }
</script>
</html>