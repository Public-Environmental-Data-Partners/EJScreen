define(

['dojo/_base/declare',
"dojo/_base/lang",
"dojo/on",
"dojo/dom-construct",
"dojo/query",
"dojo/dom-class",
 'dijit/_Widget',
 'dijit/_Templated',
 'dijit/_WidgetBase',
 'dijit/_TemplatedMixin',
 'dijit/_WidgetsInTemplateMixin',
 'dojo/Evented',
 "dojox/layout/FloatingPane",
 "esri/geometry/support/webMercatorUtils",
 "esri/geometry/support/jsonUtils",
 "esri/geometry/geometryEngine",
 "dojo/text!mapdijit/templates/reportPanel.html",
 
 "esri/Graphic"
], function (
  declare,
  lang,
  on,
  domConstruct,
  query, 
  domClass,
  _Widget,
  _Templated,
  _WidgetBase,
  _TemplatedMixin,
  _WidgetsInTemplateMixin,
  Evented,
  FloatingPane,
 webMercatorUtils,
 geometryJsonUtils,
 geometryEngine,
  dijittemplate,
  
  Graphic
) {

    var polysym = { // symbol used for polygons
        type: "simple-fill", // autocasts as new SimpleMarkerSymbol()
        color: "rgba(0, 255, 0, 0.0)",
        style: "solid",
        outline: {
          color: "red",
          width: 1
        }
      };
    

    var reportPanel_v4 = declare([_WidgetBase, _TemplatedMixin], {
        templateString: dijittemplate,

        currentGraphic: null,
        constructor: function (options, srcRefNode) {

            options = options || {};
            if (!options.map) throw new Error("no map defined in params.");

            this.map = options.map;

            this.currentGraphic = options.inGraphic;

            // mixin constructor options 
            dojo.safeMixin(this, options);


        },

        startup: function () {



        },
        postCreate: function () {
            var graphic = this.currentGraphic;
            this.bufferlayer = this.map.findLayerById("bufferLayer");

            var mgeometry = graphic.geometry;
            var geometry = mgeometry;
//console.log("sp: " + mgeometry.spatialReference.wkid)
            if (mgeometry.spatialReference.wkid == 102100) {
                geometry = webMercatorUtils.webMercatorToGeographic(mgeometry);
            }
					            
			//Note RW 6/19/23 - switch geom json to simple xy coord string to match how regular report sends in. Special chars now caught on input
			//Note RW 6/26/23 - client needed old format, switch back to json input
            this.coordNode.value = JSON.stringify(geometry.toJSON());
			//this.coordNode.value = geometry.x + "," + geometry.y;
            
            this.locNode.innerHTML = graphic.attributes["Match_addr"];
            this.doBuffer(geometry);
        },
        _setValue: function (e) {
            this.noteNode.innerHTML = "";
            var v = e.target.value;
            var sreg = /^\s?$/;
            if ((isNaN(v)) || sreg.test(v)) {
                this.noteNode.innerHTML = "Please enter a numeric value!";
                e.target.value = "";
              
            } else if (Number(v) > 10)  {
                this.noteNode.innerHTML = "Please enter a smaller value!";  
                e.target.value = "";
            } else {
                e.target.value = v.replace(/\s+/,'');
                var graphic = this.currentGraphic;
                var mgeometry = graphic.geometry;
                var geometry = mgeometry;

                if (mgeometry.spatialReference.wkid == 102100) {
                    geometry = webMercatorUtils.webMercatorToGeographic(mgeometry);
                }
                this.doBuffer(geometry);
            }
            
        },
    doBuffer: function(geometry) {
        //setup the buffer parameters
        var bufflayer = this.bufferlayer;
        var radius = this.distNode.value;
        //console.log("radius: " + radius +"; " + geometry.x);
        var bunit = "miles";
        bufflayer.graphics.removeAll();
        var buffer = geometryEngine.geodesicBuffer(geometry, radius, bunit);
                var mbuff = webMercatorUtils.geographicToWebMercator(buffer);
                var bufgraphic = new Graphic({
                    geometry: mbuff,
                    symbol: polysym
                });
                //console.log(mbuff.rings)
                bufflayer.graphics.add(bufgraphic);
                app.activeView.extent = mbuff.extent.expand(2);
        

    },
        _getEJscreen: function (e) {
            var frm = this.infoformNode;
            
            var sreg = /^\s?$/;
            var v = frm.distance.value;
            if ((isNaN(v)) || sreg.test(v)) {
                this.noteNode.innerHTML = "Please enter a numeric value!";
                frm.distance.value = "";
              
            } else if (Number(v) > 10)  {
                this.noteNode.innerHTML = "Please enter a smaller value!";  
                frm.distance.value = "";
            } else {
                // create API call here
                var buffer = frm.distance.value;
                var kvpairs = [];
                // get point coords
                var geomObj = JSON.parse(frm.geometry.value);
                geomObj = Terraformer.arcgisToGeoJSON(geomObj);
                geomObj = JSON.stringify(geomObj);
                kvpairs.push("shape" + "=" + geomObj);
                kvpairs.push("buffer" + "=" + buffer.toString());
                var queryString = kvpairs.join("&");
                // Centralized base from javascript/config.js (mobile/index.html loads it);
                // the literal is only a fallback if that global is ever unset. Trailing
                // slashes are normalized (same idiom as javascript/multisite.js).
                var ejscreenReportfile = String(window.EJAM_API_BASE || "https://ejamapi-84652557241.us-central1.run.app").replace(/\/+$/, "") + "/report";
                //console.log(cbasemap, e, frm.ptitle.value, ejreporturl)
                //frm.submit();
                // noopener/noreferrer prevents the opened origin from reaching
                // window.opener (reverse tabnabbing), as in javascript/multisite.js.
                window.open(ejscreenReportfile + "?" + queryString, "_blank", "noopener,noreferrer");
            }
        },
       
        
        _deleteGraphic: function () {
            this.bufferlayer.removeAll();
            var digiLayer = this.currentGraphic.layer;
            var delgraphic = this.currentGraphic;
            digiLayer.remove(delgraphic);

            dojo.empty(this.domNode);
            this.domNode.innerHTML = "Please enter a new location!";
            this._showPanel("#panelLocation");
        },

        _showPanel: function(panid) {
            var panel = query(panid);
        var panelBody = query(panel).query(".panel-collapse");
        
         if (!domClass.contains(panel[0], "in")) {
            // Close panels
            panels = query(panel).parent().query(".panel.in");
            panels.collapse("hide");
            // Close bodies
            query(panels).query(".panel-collapse").collapse("hide");
            // Show panel
            panel.collapse("show");
            // Show body
            query(panelBody[0]).collapse("show");
          } else { // Re-show
            panel.removeClass("in");
            query(panelBody[0]).removeClass("in");
            panel.collapse("show");
            query(panelBody[0]).collapse("show");
          } 
        },

        
        
        destroy: function () {

            dojo.empty(this.domNode);
            this.inherited(arguments);
        }

    });

    return reportPanel_v4;

});


