//---------------------------------------IMPORTANT PLEASE READ-------------------------------------------------
// ONLY USE THIS FOR ARCGIS JAPI 4.xx AND ABOVE. THIS WIDGET WILL NOT WORK WITH ANY VERSION BELOW.
// Current Only Supports MapImageLayer,TileLayer and FeatureLayer
// If you are using NodeJS and esriLoader please download use TOC_esriLoader.js instead
//
// CREDITS TO Nianwei Liu for original widget @ https://www.arcgis.com/home/item.html?id=9b6280a6bfb0430f8d1ebc969276b109
//changed to: https://www.arcgis.com/home/item.html?id=0aa209f176444e29a80f7ea0118d737a
/**
 * @name Table of Contents (TOC) widget for ArcGIS Server JavaScript API by Nianwei Liu modified For Arcgis JSAPI Version 4.xx
 * @author: Ang Hiap Lee
 * @fileoverview
 * <p>A TOC (Table of Contents) widget for ESRI ArcGIS Server JavaScript API 4.xx. The namespace is <code>agsjs</code></p>
 */
// change log:
// v0.3 -- 2017-11-28: Fixed layers being displayed in reversed order - Credits to Matt Price for finding solution
// v0.2 -- 2017-11-04: Fixed typo errors causing widget to not work with some map services
// v0.1 -- 2017-11-03: Modified library to be compatible with Arcgis JSAPI 4.xx

define([
	"esri/layers/MapImageLayer",
	"esri/layers/TileLayer",
	"esri/layers/FeatureLayer",
	"esri/layers/GraphicsLayer",
	"esri/layers/ImageryLayer",
	"esri/layers/WMSLayer",
	"esri/layers/KMLLayer",
	"esri/core/watchUtils",
	"esri/widgets/Legend",
	"esri/request",
	"./mapdijit/sliderItem.js",
	"./mapdijit/DemogFilter.js",
	"dijit/TooltipDialog",
	"dijit/form/Form",
	"dijit/form/CheckBox",
	"dijit/form/HorizontalSlider",
	"dojo/_base/lang",
	"dojo/dom-attr",
	"dojo/dom-style",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/_base/array",
	"dojo/fx",
	"dojo/on",
	"dojo/_base/declare",
	"dijit/_Widget",
	"dijit/_Templated",
	"dojox/gfx",
	"dojo/fx/Toggler",
	"dijit/form/Slider",
	
], function (
	MapImageLayer,
	TileLayer,
	FeatureLayer,
	GraphicsLayer,
	ImageryLayer,
	WMSLayer,
	KMLLayer,
	watchUtils,
	Legend,
	esriRequest,
	sliderItem,
	DemogFilter,
	TooltipDialog,
	dijitForm,
	CheckBox,
	horizontalSlider,
	lang,
	domAttr,
	domStyle,
	domClass,
	domContruct,
	array,
	coreFx,
	on,
	declare,
	_Widget,
	_Templated,
	gfx,
	Toggler
) {
	/**
	 * _TOCNode is a node, with 3 possible types: root layer|serviceLayer|legend
	 * @private
	 */
	var d = dojo.create("link", {
		type: "text/css",
		rel: "stylesheet",
		href: "mapdijit/css/TOC.css",
	});
	dojo.doc.getElementsByTagName("head")[0].appendChild(d);

	var _TOCNode = declare([_Widget, _Templated], {
		templateString:
			'<div class="agsTOCNode">' +
			'<div data-dojo-attach-point="rowNode" data-dojo-attach-event="onclick:_onClick">' +
			'<span data-dojo-attach-point="contentNode" class="agsTOCContent">' +
			'<img src="${_blankGif}" alt="" data-dojo-attach-point="iconNode" />' +
			'<span data-dojo-attach-point="checkContainerNode" class="checkContainerNode"></span>' +
			'<span data-dojo-attach-point="metaNode" data-dojo-attach-event="onclick:_showmetainfo"><img src="images/infoButton2.png" alt="more info on this layer"  title="more info on this layer" /></span>' +
			'<span data-dojo-attach-point="labelNode"></span>' +
			'<span style="float: right;"><span data-dojo-attach-point="filterNode"  data-dojo-attach-event="onclick:_filterService" style="display: none;"><img src="images/filter.png" title="Set Data Range" alt="Set Data Range" /></span>' +
			'<span data-dojo-attach-point="sliderNode"  data-dojo-attach-event="onclick:_changeTrans"></span>' +
			'<span data-dojo-attach-point="delNode"  data-dojo-attach-event="onclick:_removeService"></span></span>' +
			"</span></div>" +
			'<div data-dojo-attach-point="filterContentNode" style="padding-left: 20px; font-size:8pt; font-family: Tahoma;"></div>' +
			// '<div data-dojo-attach-point="containerNode" style="display: none; background-color:transparent;"> </div>',
			'<div id="parentContainer" data-dojo-attach-point="parentContainer"><div data-dojo-attach-point="containerNode" style="display: none; background-color:white;color:black;font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif, Helvetica;"></div> '+
			// '<a class="infoNode"  style="display:none" data-dojo-attach-event="onclick:_onInfoClick">What does this mean?</a>'+
		  	 //'<span data-dojo-attach-point="infoNode" class="infoNode" id="infoNode"  data-dojo-attach-event="onclick:_onInfoClick"><u>What does this mean?</u></span>
			 '</div>' +
			'</div>',
		// each node contains reference to rootLayer, servierLayer(layer within service), legend
		// the reason not to use a "type" property is because in the case of legend, it is necessary
		// to access meta data of the serviceLayer and rootLayer as well.
		rootLayer: null,
		serviceLayer: null,
		groupLayer: null,
		legend: null,
		wmslegend: null,
		rootLayerTOC: null,
		data: null, // could be one of rootLayer, serviceLayer, or legend
		
		_childTOCNodes: [],
		constructor: function (params, srcNodeRef) {
			dojo.mixin(this, params);
		},
		// extension point. called automatically after widget DOM ready.
		postCreate: function () {
			this.own(on(this.domNode, 'click', lang.hitch(this, '_handleClick')));
			this.data =
				this.legend || this.serviceLayer || this.groupLayer || this.rootLayer;
			if (
				this.data.layers &&
				this.data.layers.items.filter(function (value) {
					return value.type === "graphics";
				}).length === this.data.layers.items.length
			) {
				this.rowNode.remove();
				//dojo.byId("legendPan").style.display = "none";
				//if($('#searchdiv').length){
				// $('#searchdiv').attr('style','position: absolute;  top: 18px;  right: 3px;');
				// }
				return;
			}

			//  dojo.byId("legendPan").style.display = "block";
			//  $('#searchdiv').attr('style','position: absolute;  top: 18px;  right: 268px;')
			domStyle.set(
				this.rowNode,
				"paddingLeft",
				"" +
					this.rootLayerTOC.tocWidget.indentSize *
						this.rootLayerTOC._currentIndent +
					"px"
			);
			// using the availability of certain property to decide what kind of node to create.
			// priority is legend/serviceLayer/rootLayer
		
			this.blank = this.iconNode.src;
			if (this.legend) {
				this._createLegendNode(this.legend);
			} else if (this.wmslegend) {
				this._createWMSLegendNode(this.wmslegend);
			} else if (this.serviceLayer) {
				this._createServiceLayerNode(this.serviceLayer);
			} else if (this.groupLayer) {
				this._createGroupLayerNode(this.groupLayer);
			} else if (this.rootLayer) {
				//alert("root");
				this._createRootLayerNode(this.rootLayer);
			}
			if (this.containerNode && Toggler) {
				// dojo.fx.
				// if containerNode was not removed, it means this is some sort of group.
				this.toggler = new Toggler({
					node: this.containerNode,
					showFunc: coreFx.wipeIn,
					hideFunc: coreFx.wipeOut,
				});
			}
		
			if (!this._noCheckNode) {
				// typically _noCheckNode means it is a tiledlayer, or legend item that should not have a checkbox
				var chk;
				if (dijitForm && CheckBox) {
					chk = new CheckBox({
						// looks a bug in dijit. image not renderered until mouse over. bug was closed but still exist.
						// use attr('checked', true) not working either.
						checked: this.data.visible,
					});
					chk.placeAt(this.checkContainerNode);
					chk.startup();
				} else {
					chk = domContruct.create(
						"input",
						{
							type: "checkbox",
							checked: this.data.visible,
						},
						this.checkContainerNode
					);
				}
				this.checkNode = chk;
			}
			var showChildren = this.data.visible;
			// if it is a group layer and no child layer is visible, then collapse
			if (this.data.sublayers) {
				var noneVisible = true;
				array.every(this.data.sublayers.items, function (info) {
					if (info.visible) {
						noneVisible = false;
						return false;
					}
					return true;
				});
				showChildren = true;
				//if (noneVisible) showChildren = false;
			} else if (this.data.layers) {
				var noneVisible = true;
				this.data.layers.map(function (info) {
					if (info.visible) {
						noneVisible = false;
						return false;
					}
					return true;
				});

				if (noneVisible) showChildren = false;
			}
			if (this.data.collapsed) showChildren = false;
			if (this.iconNode && this.iconNode.src == this.blank) {
				domClass.add(this.iconNode, "dijitTreeExpando");
				domClass.add(
					this.iconNode,
					showChildren ? "dijitTreeExpandoOpened" : "dijitTreeExpandoClosed"
				);
			}
			if (this.iconNode) {
				domClass.add(this.iconNode, "agsjsTOCIcon");
			}
			if (this.containerNode) {
				domStyle.set(
					this.containerNode,
					"display",
					showChildren ? "block" : "none"
				);
			}
			this.domNode.id =
				"TOCNode_" +
				this.rootLayer.id +
				(this.groupLayer ? "_" + this.groupLayer.id : "") +
				(this.serviceLayer ? "_" + this.serviceLayer.id : "") +
				(this.legend ? "_" + this.legend.id : "");
		},
		// root level node, layers directly under esri.Map
		_createRootLayerNode: function (rootLayer) {
			//domClass.add(this.rowNode, 'agsjsTOCRootLayer');
			if (rootLayer.type == "group") {
				rootLayer.url =
					"https://www.arcgis.com/home/item.html?id=" + rootLayer.id;
			}
			domClass.add(this.labelNode, "agsTOCServiceLabel");
			this.sliderNode.innerHTML =
				"<img src='images/contextbnt.png' title='change transparency'  alt='change transparency' />";
			this.delNode.innerHTML =
				"<img src='images/close.gif' title='remove layer from map' alt='remove layer from map' />";
			//check for demog_more as well as 'demog' to show filter button in new widget
			if (
				rootLayer.maptype &&
				(rootLayer.maptype == "demog_more" || rootLayer.maptype == "demog")
			)
				this.filterNode.style.display = "inline-block";
			if (!rootLayer.url) domContruct.destroy(this.metaNode);
			var title = this.rootLayerTOC.config.title;
			// if it is '' then it means we do not title to be shown, i.e. not indent.
			if (title === "") {
				// we do not want to show the first level, typically in the case of a single map service
				domStyle.set(this.rowNode, "display", "none");
				rootLayer.visible = true;
				this.rootLayerTOC._currentIndent--;
			} else if (title === undefined) {
				// no title is set, try to find default
				if (rootLayer.name) {
					// this is a featureLayer
					title = rootLayer.name;
					
				} else {
					var start = rootLayer.url.toLowerCase().indexOf("/rest/services/");
					var end = rootLayer.url.toLowerCase().indexOf("/mapserver", start);
					title = rootLayer.url.substring(start + 15, end);
					console.log(title);
				}
			}
			rootLayer.collapsed = this.rootLayerTOC.config.collapsed;
			console.log("rootlayer")
			console.log(rootLayer)
			if (!this.rootLayerTOC.config.noLegend) {
				if (rootLayer._tocInfos) {
					this._createChildrenNodes(rootLayer._tocInfos, "serviceLayer");
				} else if (rootLayer.isDynamic) {
					if (rootLayer.renderobj) {
						var actlyr = rootLayer.renderobj.actlayer;
						var mapid = rootLayer.renderobj.mid;
						if (
							rootLayer.renderobj["ranges"] &&
							rootLayer.renderobj["ranges"][actlyr] &&
							rootLayer.renderobj["ranges"][actlyr]["whereclause"]
						) {
							var minvalue = rootLayer.renderobj["ranges"][actlyr].min;
							var maxvalue = rootLayer.renderobj["ranges"][actlyr].max;
							this.filterContentNode.innerHTML =
								"(Filter range: " + minvalue + " - " + maxvalue + ")";
						}
					}
					this._createChildrenNodes(rootLayer, "featurelegend");
				} else if (rootLayer.renderer) {
					// for feature layers
					var r = rootLayer.renderer;
					console.log(r)
					if (r.infos) {
						//UniqueValueRenderer |ClassBreaksRenderer
						var legs = r.infos;
						if (
							r.defaultSymbol &&
							legs.length > 0 &&
							legs[0].label != "[all other values]"
						) {
							// insert at top
							legs.unshift({
								label: "[all other values]",
								symbol: r.defaultSymbol,
							});
						}
						var af =
							r.attributeField +
							(r.normalizationField ? "/" + r.normalizationField : "");
						af +=
							(r.attributeField2 ? "/" + r.attributeField2 : "") +
							(r.attributeField3 ? "/" + r.attributeField3 : "");
						var anode = domContruct.create("div", {}, this.containerNode);
						domStyle.set(
							anode,
							"paddingLeft",
							"" +
								this.rootLayerTOC.tocWidget.indentSize *
									(this.rootLayerTOC._currentIndent + 2) +
								"px"
						);
						anode.innerHTML = af;
						this._createChildrenNodes(legs, "legend");
					} else {
						this._createChildrenNodes(rootLayer, "featurelegend");
						/* this._setIconNode(rootLayer.renderer, this.iconNode, this);
                            domContruct.destroy(this.containerNode);
                            this.containerNode = null; */
					}
				} else if (rootLayer.type == "map-image") {
					this._createChildrenNodes(rootLayer.sublayers.items, "serviceLayer");
				} else if (rootLayer.type == "group") {
					this._createChildrenNodes(rootLayer.layers, "group");
				} else if (rootLayer instanceof WMSLayer) {
					this._createChildrenNodes(rootLayer.sublayers.items, "serviceLayer");
				} else if (rootLayer instanceof KMLLayer) {
					this._createChildrenNodes(rootLayer, "featurelegend");
				} else if (rootLayer instanceof ImageryLayer) {
					this._createChildrenNodes(rootLayer, "featurelegend");
				} else {
					domStyle.set(this.iconNode, "visibility", "hidden");
				}
			} else {
				// no legend means no need for plus/minus sign
				console.log("no legend?")
				domStyle.set(this.iconNode, "visibility", "hidden");
			}
			this.labelNode.innerHTML = title;
			domAttr.set(this.rowNode, "title", title);
			var containerNode = this.containerNode; // Assuming "this" refers to the appropriate scope

		    $(this.containerNode).css('opacity',this.rootLayer.opacity);  
            if(this.rootLayerTOC.config.layer.cat === 'P_EJ2' ||
			      this.rootLayerTOC.config.layer.cat === 'P_EJ5' ||
				   this.rootLayerTOC.config.layer.cat === 'P_ENV' ||
				    this.rootLayerTOC.config.layer.cat === 'P_DEM'){
				//this.containerNode.innerHTML += '<u>What does this mean?</u>';
				//this.infoNode = true;
				//this.infoNode.style.display = "inline-block";
				 // Create a new span element
    var spanElement = document.createElement("span");
	spanElement.classList.add("infoNode"); 
    spanElement.setAttribute("data-dojo-attach-point", "infoNode");
    spanElement.setAttribute("class", "infoNode");
    spanElement.setAttribute("data-dojo-attach-event", "onclick:_onInfoClick");
    
    // Create a u element
    //var uElement = document.createElement("u");
    //uElement.textContent = "What does this mean?";
      spanElement.textContent = "What does this mean?";
    // Append the u element to the span
    //spanElement.appendChild(uElement);
    
    // Find the parent container div
   // this.parentContainer = document.getElementById("parentContainer");
    
    // Append the span to the parent container
	
    this.parentContainer.appendChild(spanElement);
			}else{
				//this.infoNode.style.display = "none";
				//this.infoNode = false;
				// Find the div element to remove
			var divToRemove = document.getElementById("infoNode"); // Assuming you have an id for the div to remove

			if (divToRemove) {
				// Remove the div from the parent container
				parentContainer.removeChild(divToRemove);
			} 
		 }
		},
		_createGroupLayerNode: function (groupLayer) {
			//domClass.add(this.rowNode, 'agsjsTOCRootLayer');
			domClass.add(this.labelNode, "agsTOCServiceLabel");
			this.sliderNode.innerHTML =
				"<img src='images/contextbnt.png' title='change transparency'  alt='change transparency' />";
			this.delNode.innerHTML =
				"<img src='images/close.gif' title='remove layer from map' alt='remove layer from map' />";
			if (!groupLayer.url) domContruct.destroy(this.metaNode);
			var title = this.groupLayer.title;
			// if it is '' then it means we do not title to be shown, i.e. not indent.
			if (title === "") {
				// we do not want to show the first level, typically in the case of a single map service
				domStyle.set(this.rowNode, "display", "none");
				groupLayer.visible = true;
				this.rootLayerTOC._currentIndent--;
			} else if (title === undefined) {
				// no title is set, try to find default
				if (groupLayer.name) {
					// this is a featureLayer
					title = groupLayer.name;
				} else {
					var start = groupLayer.url.toLowerCase().indexOf("/rest/services/");
					var end = groupLayer.url.toLowerCase().indexOf("/mapserver", start);
					title = groupLayer.url.substring(start + 15, end);
				}
			}

			console.log(groupLayer);
			if (groupLayer._tocInfos) {
				this._createChildrenNodes(groupLayer._tocInfos, "serviceLayer");
			} else if (groupLayer.type == "feature") {
				this._createChildrenNodes(groupLayer, "featurelegend");
			} else if (groupLayer.isDynamic) {
				this._createChildrenNodes(groupLayer, "featurelegend");
			} else if (groupLayer.renderer) {
				// for feature layers
				var r = groupLayer.renderer;
				if (r.infos) {
					//UniqueValueRenderer |ClassBreaksRenderer
					var legs = r.infos;
					if (
						r.defaultSymbol &&
						legs.length > 0 &&
						legs[0].label != "[all other values]"
					) {
						// insert at top
						legs.unshift({
							label: "[all other values]",
							symbol: r.defaultSymbol,
						});
					}
					var af =
						r.attributeField +
						(r.normalizationField ? "/" + r.normalizationField : "");
					af +=
						(r.attributeField2 ? "/" + r.attributeField2 : "") +
						(r.attributeField3 ? "/" + r.attributeField3 : "");
					var anode = domContruct.create("div", {}, this.containerNode);
					domStyle.set(
						anode,
						"paddingLeft",
						"" +
							this.rootLayerTOC.tocWidget.indentSize *
								(this.rootLayerTOC._currentIndent + 2) +
							"px"
					);
					anode.innerHTML = af;
					this._createChildrenNodes(legs, "legend");
				} else {
					this._createChildrenNodes(groupLayer, "featurelegend");
				}
			} else if (groupLayer instanceof ImageryLayer) {
				this._createChildrenNodes(groupLayer, "featurelegend");
			} else if (groupLayer instanceof WMSLayer) {
				this._createChildrenNodes(groupLayer.sublayers.items, "serviceLayer");
			} else if (groupLayer instanceof KMLLayer) {
				this._createChildrenNodes(groupLayer, "featurelegend");
			} else {
				domStyle.set(this.iconNode, "visibility", "hidden");
			}

			this.labelNode.innerHTML = title;
			domAttr.set(this.rowNode, "title", title);
		},
		_returnLegendInfo: function (response, layer) {
			var json = response.data;

			if (layer instanceof FeatureLayer) {
				var tocInfos = [];
				var lid = layer.layerId;
				if (layer.legend) {
					layer._legend = layer.legend;
				} else if (json.layers) {
					var legInfo;
					if (json.layers[lid]) legInfo = json.layers[lid];
					else legInfo = json.layers[0];
					if (legInfo.legend) {
						layer._legends = legInfo.legend;
					}
				}
				tocInfos.push(layer);
				layer._tocInfos = tocInfos;
			} else {
				/* if (layer instanceof TileLayer) {
                        layer.allSublayers = {
                            items: [layer]
                        }
                    } */

				var visibleLayers = [];

				for (let i = 0; i < layer.allSublayers.items.length; i++) {
					if (layer.allSublayers.items[i].visible)
						visibleLayers.push(layer.allSublayers.items[i].id);
				}

				if (!layer._tocInfos) {
					// create a lookup map, key=layerId, value=LayerInfo
					// generally id = index, this is to assure we find the right layer by ID
					// note: not all layers have an entry in legend response.
					var layerLookup = {};
					array.forEach(layer.allSublayers.items, function (layerInfo) {
						layerLookup["" + layerInfo.id] = layerInfo;
						// used for later reference.

						if (
							layer instanceof FeatureLayer ||
							layer instanceof TileLayer ||
							layer instanceof ImageryLayer
						) {
							//layerInfo.visible = true;
							//console.log("is feature layer")
						} else {
							if (visibleLayers && !layerInfo.sublayers) {
								if (array.indexOf(visibleLayers, layerInfo.id) == -1) {
									layerInfo.visible = false;
								} else {
									layerInfo.visible = true;
								}
							}
						}
					});
					// attached legend Info to layer info
					if (json.layers) {
						array.forEach(json.layers, function (legInfo) {
							var layerInfo = layerLookup["" + legInfo.layerId];
							if (layerInfo && legInfo.legend) {
								layerInfo._legends = legInfo.legend;
							} else if (
								layer instanceof FeatureLayer ||
								layer instanceof TileLayer
							) {
								layer._legends = legInfo.legend;
							}
						});
					}
					// nest layer Infos
					array.forEach(layer.allSublayers.items, function (layerInfo) {
						if (layerInfo.sublayers) {
							var subLayerInfos = [];
							array.forEach(layerInfo.sublayers.items, function (lyr, i) {
								subLayerInfos[i] = layerLookup[lyr.id];
								subLayerInfos[i]._parentLayerInfo = layerInfo;
							});
							layerInfo._subLayerInfos = subLayerInfos;
						}
					});

					//finalize the tree structure in _tocInfos, skipping all sublayers because they were nested already.
					var tocInfos = [];
					array.forEach(layer.allSublayers.items, function (layerInfo) {
						layerInfo._parentLayerInfo = layer;
						if (
							layerInfo instanceof FeatureLayer ||
							layerInfo instanceof TileLayer
						) {
							tocInfos.push(layerInfo);
						} else {
							if (layerInfo.sublayers == null) {
								tocInfos.push(layerInfo);
							}
						}
					});
					layer._tocInfos = tocInfos;
				}
			}
			var params = {
				rootLayerTOC: this.rootLayerTOC,
				rootLayer: this.rootLayer,
				groupLayer: layer,

				mapView: this.mapView,
			};
			layer._parentLayerInfo = this.rootLayer;
			params.data = layer;

			var node = new _TOCNode(params);
			node.placeAt(this.containerNode);
			this._childTOCNodes.push(node);
		},
		// a layer inside a map service.
		_createServiceLayerNode: function (serviceLayer) {
			// layer: layerInfo with nested subLayerInfos
			this.labelNode.innerHTML = serviceLayer.title;
			if (serviceLayer.sublayers) {
				// group layer
				//console.log(serviceLayer.sublayers)
				if (this.rootLayer.tileInfo) {
					// can not check on/off for tiled
					this._noCheckNode = true;
				}
				domClass.add(this.rowNode, "agsTOCService");
				domClass.add(this.labelNode, "agsTOCServiceLabel");
				this._createChildrenNodes(serviceLayer.sublayers.items, "serviceLayer");
			} else {
				domClass.add(this.rowNode, "agsTOCService");
				domClass.add(this.labelNode, "agsTOCLayerLabel");
				if (this.rootLayer.tileInfo) {
					// can not check on/off for tiled
					this._noCheckNode = true;
				}
				if (serviceLayer._legends && !this.rootLayerTOC.config.noLegend) {
					/* if (serviceLayer._legends.length == 1) {
                            this.iconNode.src = this._getLegendIconUrl(serviceLayer._legends[0]);
                            domContruct.destroy(this.containerNode);
                            this.containerNode = null;
                        } else { */
					this._createChildrenNodes(serviceLayer._legends, "legend");
					//}
				} else if (
					serviceLayer instanceof FeatureLayer ||
					serviceLayer instanceof TileLayer ||
					serviceLayer instanceof ImageryLayer
				) {
					if (serviceLayer._legends) {
						this.iconNode.src =
							"data:image/png;base64," +
							serviceLayer._legends["0"].legend["0"].imageData;
						domContruct.destroy(this.containerNode);
						this.containerNode = null;
					} else {
						this._createChildrenNodes(serviceLayer, "featurelegend");
					}
				} else if (serviceLayer.layer instanceof WMSLayer) {
					//console.log("WMS legend: " + serviceLayer.legendUrl)
					//this.containerNode.innerHTML = "<img src='" + serviceLayer.legendUrl + "'>";
					this._createChildrenNodes(serviceLayer.legendUrl, "wmslegend");
				} else {
					domContruct.destroy(this.iconNode);
					this.iconNode = null;
					domContruct.destroy(this.containerNode);
					this.containerNode = null;
				}
			}
		},
		/*
        legend data normally have: {description,label,symbol,value}
		NB: as far as I can tell as of the release of v4.2024.0, there
		are no active code paths to this function. But I'm reluctant
		to simply delete it.
		Meantime, note that despite its name, it is not involved in generating
		the Map Contents legend boxes for the UI. That work is done down
		in _createChildrenNodes.   
		~ ag     
		*/
		_createLegendNode: function (rendLeg) {
			this._noCheckNode = true;
			domContruct.destroy(this.containerNode);
			domContruct.destroy(this.metaNode);
			domClass.add(this.labelNode, "agsTOCLegendLabel");
			this._setIconNode(rendLeg, this.iconNode, this);
			var label = rendLeg.label;
			if (rendLeg.label === undefined) {
				if (rendLeg.value !== undefined) {
					label = rendLeg.value;
				}
				if (rendLeg.maxValue !== undefined) {
					label = "" + rendLeg.minValue + " - " + rendLeg.maxValue;
				}
			}
			this.labelNode.appendChild(document.createTextNode(label));
		},
		_createWMSLegendNode: function (aurl) {
			this._noCheckNode = true;
			domContruct.destroy(this.containerNode);
			domContruct.destroy(this.metaNode);
			domClass.add(this.labelNode, "agsTOCLegendLabel");
			this.iconNode.src = aurl;
		},
		// set url or replace node
		_setIconNode: function (rendLeg, iconNode, tocNode) {
			var src = this._getLegendIconUrl(rendLeg);
			if (!src) {
				if (rendLeg.symbol) {
					var w = this.rootLayerTOC.tocWidget.swatchSize[0];
					var h = this.rootLayerTOC.tocWidget.swatchSize[1];
					if (rendLeg.symbol.width && rendLeg.symbol.height) {
						w = rendLeg.symbol.width;
						h = rendLeg.symbol.height;
					}
					var node = domContruct.create("span", {});
					domStyle.set(node, {
						width: w + "px",
						height: h + "px",
						display: "inline-block",
					});
					domContruct.place(node, iconNode, "replace");
					tocNode.iconNode = node;
					/* var descriptors = esri.symbol.getShapeDescriptors(rendLeg.symbol);
                        var mySurface = gfx.createSurface(node, w, h);//dojox.
                        if (descriptors) {
                            if (dojo.isIE) {
                                // 2013076: see	http://mail.dojotoolkit.org/pipermail/dojo-interest/2009-December/041404.html
                                window.setTimeout(dojo.hitch(this, '_createSymbol', mySurface, descriptors, w, h), 500);
                            } else {
                                this._createSymbol(mySurface, descriptors, w, h);
                            }
                        } */
				} else {
					if (console) console.log("no symbol in renderer");
				}
			} else {
				iconNode.src = src;
				if (rendLeg.symbol && rendLeg.symbol.width && rendLeg.symbol.height) {
					iconNode.style.width = rendLeg.symbol.width;
					iconNode.style.height = rendLeg.symbol.height;
				}
			}
		},
		_createSymbol: function (mySurface, descriptors, w, h) {
			var shape = mySurface.createShape(descriptors.defaultShape);
			if (descriptors.fill) {
				shape.setFill(descriptors.fill);
			}
			if (descriptors.stroke) {
				shape.setStroke(descriptors.stroke);
			}
			shape.applyTransform({
				dx: w / 2,
				dy: h / 2,
			});
		},
		_getLegendIconUrl: function (legend) {
			var src = legend.url;
			// in some cases NULL value may cause #legend != #of renderer entry.
			if (src != null && src.indexOf("data") == -1) {
				if (!dojo.isIE && legend.imageData && legend.imageData.length > 0) {
					src = "data:image/png;base64," + legend.imageData;
				} else {
					if (src.indexOf("http") !== 0) {
						// resolve relative url
						src =
							this.rootLayer.url +
							"/" +
							this.serviceLayer.id +
							"/images/" +
							src;
					}
				}
			} else if (legend.imageData && legend.imageData.length > 0) {
				src = "data:image/png;base64," + legend.imageData;
			}

			return src;
		},
		/**
		 * Create children nodes, for serviceLayers, subLayers of a group layer, or legends within a serviceLayer.
		 * @param {Object} chdn children nodes data
		 * @param {Object} type rootLayer|serviceLayer|legend. It's name will be passed in constructor of _TOCNode.
		 */
		_createChildrenNodes: function (chdn, type) {
			this.rootLayerTOC._currentIndent++;
			console.log("In _createChildrenNodes for type", type)
			if (type == "featurelegend") {
				// As of v4.2024.0, we've lost the ability to insert good labels
				// for our Map Contents legend boxes
				// into our geodatabase. But we may get that ability back someday
				// and, if so, we would want to use those labels.
				// All the code here is fallback for when geodatabase 
				// labels are not available, the expected case for now.
				// This should resolve the secondary problem reported in
				// https://github.com/Public-Environmental-Data-Partners/EJScreen/issues/91
				if (chdn && chdn.fields && typeof dynamicJSON !== 'undefined') {
					var lyType = chdn.maptype || chdn.layerType;
					// Inject footerfields aliases into layer's field definitions
					// so the ArcGIS Legend widget will display our custom labels	
					//console.log("  Attempting to inject footerfields for layer type:", lyType);			
					if (lyType && dynamicJSON[lyType] && dynamicJSON[lyType].footerfields && dynamicJSON[lyType].usefooteralias == true) {
						//console.log("  Found footerfields for", lyType, "- injecting labels...");
						chdn.fields.forEach(function(field) {
							// Only inject if geodatabase alias is not set, which, by observation means
							// if the alias is the same as the field name.
							//console.log("  geodatabase alias for", field.name, ": |", field.alias, "|");
							if (field.alias === field.name || field.alias === undefined || field.alias === "" || field.alias === null) {
								var configJsAlias = dynamicJSON[lyType].footerfields[field.name];
								if (configJsAlias) {
									//console.log("    Setting field", field.name, "alias to:", configJsAlias);
									field.alias = configJsAlias;
								} 
								else {
									console.log("***Warning: no config.js alias found for", field.name);
								}
								// else, if we don't have a better name, do nothing here, which
								// should keep the alias the same as the field name
							}
						});
					}
					// else, if we don't have footerfields, leave the alias values as is
					// these have been observed to be same as field name, which is the best we can do here

				}
			
				//var lgnstr = "<img src='images/ejlegend_new.png' alt='EJ legend' />";
				var legend = new Legend({
					view: this.mapView,
					container: this.containerNode,
					layerInfos: [
						{
							layer: chdn,
							title: "",
						},
					],
				});
				//this.mapView.on("click", function(event) {
				//if (chdn.layerType == "ejscreen"){
				//alert("ejtype");
				//domStyle.set("esri-legend__symbol svg", 'height', '15px!important');
				//domStyle.set("esri-legend__symbol svg", 'width', '15px!important');
				//domClass.add(legend.container, "esri-legend__symbol svg ejscreen");
				//}
				//});

				chdn.on("layerview-destroy", function (event) {
					legend.destroy();
				});
			} else if (type == "wmslegend") {
				domStyle.set(
					this.containerNode,
					"paddingLeft",
					"" +
						this.rootLayerTOC.tocWidget.indentSize *
							this.rootLayerTOC._currentIndent +
						"px"
				);
				if (chdn == null) {
					this.containerNode.innerHTML = "No Legend";
				} else {
					this.containerNode.innerHTML = "<img src='" + chdn + "' />";
				}
				this.rootLayerTOC._currentIndent--;
			} else if (type == "group") {
				var _self = this;
				var c = [];
				chdn.map(function (lyr) {
					if (
						lyr.type == "map-image" ||
						lyr.type == "feature" ||
						lyr.type == "tile"
					) {
						if (lyr.url) {
							var featreg = /\/featureserver/i;
							if (featreg.test(lyr.url)) {
								var params = {
									rootLayerTOC: _self.rootLayerTOC,
									rootLayer: _self.rootLayer,
									groupLayer: lyr,
									mapView: _self.mapView,
								};
								lyr._parentLayerInfo = _self.rootLayer;
								params.data = lyr;

								var node = new _TOCNode(params);
								node.placeAt(_self.containerNode);
								c.push(node);

								_self.rootLayerTOC._currentIndent--;
							} else {
								var legendurl = lyr.url + "/legend";
								var content = { f: "json" };
								esriRequest(legendurl, {
									query: content,
									responseType: "json",
									callbackParamName: "callback",
								})
									.then(function (r) {
										_self._returnLegendInfo(r, lyr);
										//console.log(lyr._tocInfos);
									})
									.catch(function (err) {
										console.log("error occurred: " + err);
									});
							}
						} else {
							var params = {
								rootLayerTOC: _self.rootLayerTOC,
								rootLayer: _self.rootLayer,
								groupLayer: lyr,
								mapView: _self.mapView,
							};
							lyr._parentLayerInfo = _self.rootLayer;
							params.data = lyr;

							var node = new _TOCNode(params);
							node.placeAt(_self.containerNode);
							c.push(node);

							_self.rootLayerTOC._currentIndent--;
						}
					} else {
						console.log("no url");
						var params = {
							rootLayerTOC: _self.rootLayerTOC,
							rootLayer: _self.rootLayer,
							groupLayer: lyr,
							mapView: _self.mapView,
						};
						lyr._parentLayerInfo = _self.rootLayer;
						params.data = lyr;

						var node = new _TOCNode(params);
						
						node.placeAt(_self.containerNode);
						c.push(node);

						_self.rootLayerTOC._currentIndent--;
					}
				});
				this._childTOCNodes = c;
				//this.rootLayerTOC._currentIndent--;
			} else {
				var c = [];
				for (var i = chdn.length - 1, n = -1; i > n; i--) {
					// Credits to Matt Price for fixing reversed layer order
					var chd = chdn[i];
					var params = {
						rootLayerTOC: this.rootLayerTOC,
						rootLayer: this.rootLayer,
						serviceLayer: this.serviceLayer,
						legend: this.legend,
						mapView: this.mapView,
					};
					if (this.groupLayer) {
						params.groupLayer = this.groupLayer;
					}
					params[type] = chd;
					params.data = chd;
					//var node = new agsjs.dijit._TOCNode(params);
					if (type == "legend") {
						chd.id = "legend" + i;
					}
					var node = new _TOCNode(params);
					
					node.placeAt(this.containerNode);
					if (type != "legend") c.push(node);
				}
				this._childTOCNodes = c; // for refreshTOC use recursively.
				this.rootLayerTOC._currentIndent--;
			}
		},
		_toggleContainer: function (on) {
			if (
				domClass.contains(this.iconNode, "dijitTreeExpandoClosed") ||
				domClass.contains(this.iconNode, "dijitTreeExpandoOpened")
			) {
				// make sure its not clicked on legend swatch
				if (on) {
					domClass.remove(this.iconNode, "dijitTreeExpandoClosed");
					domClass.add(this.iconNode, "dijitTreeExpandoOpened");
				} else if (on === false) {
					domClass.remove(this.iconNode, "dijitTreeExpandoOpened");
					domClass.add(this.iconNode, "dijitTreeExpandoClosed");
				} else {
					domClass.toggle(this.iconNode, "dijitTreeExpandoClosed");
					domClass.toggle(this.iconNode, "dijitTreeExpandoOpened");
				}
				if (domClass.contains(this.iconNode, "dijitTreeExpandoOpened")) {
					if (this.toggler) {
						this.toggler.show();
					} else {
						domStyle.set(this.containerNode, "display", "block");
						
					}
				} else {
					if (this.toggler) {
						this.toggler.hide();
					} else {
						domStyle.set(this.containerNode, "display", "none");
					}
				}
				// remember it's state for refresh
				if (this.rootLayer && !this.serviceLayer && !this.legend) {
					this.rootLayerTOC.config.collapsed = domClass.contains(
						this.iconNode,
						"dijitTreeExpandoClosed"
					);
				}
			}
		},
		/**
		 * Expand the node's children if applicable
		 */
		expand: function () {
			this._toggleContainer(true);
		},
		/**
		 * collapse the node's children if applicable
		 */
		collapse: function () {
			this._toggleContainer(false);
		},
		/**
		 * Show the TOC Node
		 */
		show: function () {
			domStyle.set(this.containerNode, "display", "block");
		},
		/** Hide TOC node
		 *
		 */
		hide: function () {
			domStyle.set(this.containerNode, "display", "none");
		},
		// change UI according to the state of map layers.
		_adjustToState: function () {
			if (this.checkNode) {
				var checked = this.legend
					? this.legend.visible
					: this.serviceLayer
					? this.serviceLayer.visible
					: this.groupLayer
					? this.groupLayer.visible
					: this.rootLayer
					? this.rootLayer.visible
					: false;

				if (this.checkNode.set) {
					//checkNode is a dojo.forms.CheckBox
					this.checkNode.set("checked", checked);
				} else {
					// checkNode is a simple HTML element.
					this.checkNode.checked = checked;
				}
			}
			if (this.serviceLayer) {
				var scale = this.mapView.scale;
				var outScale =
					(this.serviceLayer.maxScale != 0 &&
						scale < this.serviceLayer.maxScale) ||
					(this.serviceLayer.minScale != 0 &&
						scale > this.serviceLayer.minScale);
				if (outScale) {
					domClass.add(this.domNode, "agsTOCOutOfScale");
				} else {
					domClass.remove(this.domNode, "agsTOCOutOfScale");
				}
				if (this.checkNode) {
					if (this.checkNode.set) {
						this.checkNode.set("disabled", outScale);
					} else {
						this.checkNode.disabled = outScale;
					}
				}
			} else if (
				this.rootLayer &&
				(this.rootLayer.minScale || this.rootLayer.maxScale)
			) {
				var scale = this.mapView.scale;
				var outScale =
					(this.rootLayer.maxScale != 0 && scale < this.rootLayer.maxScale) ||
					(this.rootLayer.minScale != 0 && scale > this.rootLayer.minScale);
				//console.log(this.rootLayer.id + "--scale: " + scale + "; minscale: " + this.rootLayer.minScale + "; maxscale: " + this.rootLayer.maxScale + "; outscale: " + outScale)
				if (outScale) {
					domClass.add(this.domNode, "agsTOCOutOfScale");
				} else {
					domClass.remove(this.domNode, "agsTOCOutOfScale");
				}
				if (this.checkNode) {
					if (this.checkNode.set) {
						this.checkNode.set("disabled", outScale);
					} else {
						this.checkNode.disabled = outScale;
					}
				}
			} else if (
				this.groupLayer &&
				(this.groupLayer.minScale || this.groupLayer.maxScale)
			) {
				var scale = this.mapView.scale;
				var outScale =
					(this.groupLayer.maxScale != 0 && scale < this.groupLayer.maxScale) ||
					(this.groupLayer.minScale != 0 && scale > this.groupLayer.minScale);
				//console.log(this.rootLayer.id + "--scale: " + scale + "; minscale: " + this.rootLayer.minScale + "; maxscale: " + this.rootLayer.maxScale + "; outscale: " + outScale)
				if (outScale) {
					domClass.add(this.domNode, "agsTOCOutOfScale");
				} else {
					domClass.remove(this.domNode, "agsTOCOutOfScale");
				}
				if (this.checkNode) {
					if (this.checkNode.set) {
						this.checkNode.set("disabled", outScale);
					} else {
						this.checkNode.disabled = outScale;
					}
				}
			}
			if (this._childTOCNodes.length > 0) {
				array.forEach(this._childTOCNodes, function (child) {
					child._adjustToState();
				});
			}
		},
		_showmetainfo: function () {
			if (this.serviceLayer) {
				//get parent id and look for in meta config
				var newid = this.serviceLayer.parent.id.replace("_map", "");
				if (newid === "eparegionalfacilities") {
					switch (this.serviceLayer.id) {
						case 0: //superfund
							window.open(metanchors["ejnpl"].metalink);
							break;
						default:
							window.open(metanchors[newid].metalink);
					}
				} else if (metanchors[newid] && newid != "eparegionalfacilities") {
					window.open(metanchors[newid].metalink);
				} else if (this.serviceLayer.maptype) {
					if (this.serviceLayer.maptype == "demog") {
						window.open(
							"https://www.epa.gov/ejscreen/ejscreen-map-descriptions#category-demographics"
						);
					} else if (this.serviceLayer.maptype == "demog_more") {
						window.open(
							"https://www.epa.gov/ejscreen/ejscreen-map-descriptions#addi"
						);
					} else if (this.serviceLayer.maptype == "ejscreen") {			
						var ejmetaurl = ejlayoutJSON["Primary"].items[this.serviceLayer.cat].metalink;
						window.open(ejmetaurl);
					}
				} else {
					alert("No metadata available");
				}
			} else if (this.groupLayer) {
				if (this.groupLayer.url) {
					var metaurl = this.groupLayer.url;
					window.open(metaurl);
				}
			} else if (this.rootLayer) {
				//get id, not parent id
				var newid = this.rootLayer.id.replace("_map", "");
				if (metanchors[newid]) {
					window.open(metanchors[newid].metalink);
				} else if (this.rootLayer.maptype) {
					if (this.rootLayer.maptype == "demog") {
						window.open(
							"https://www.epa.gov/ejscreen/ejscreen-map-descriptions#category-demographics"
						);
					} else if (this.rootLayer.maptype == "demog_more") {
						window.open(
							"https://www.epa.gov/ejscreen/ejscreen-map-descriptions#addi"
						);
					} else if (this.rootLayer.maptype == "ejscreen") {
						//if Supplemental get the anchor for supp, else use primary ej config
						//append SUPP to the cat to match config
						if (this.rootLayer.layerType == "ejscreen_supp"){
							var ejmetaurl = ejlayoutJSON["Supplementary"].items[this.rootLayer.cat].metalink;
						} else { //e.g. layerType = ejscreen
							var ejmetaurl = ejlayoutJSON["Primary"].items[this.rootLayer.cat].metalink;
						}						
						window.open(ejmetaurl);
					}
				} else {
					alert("No metadata available");
				}
			}
		},
		_getTextFromGlossary : function(ejmetaurl){
			// ejmetaurl="http://localhost:4922/ejscreen-map-descriptions.html#ejin-pm25";
			var arrmeta = ejmetaurl.split("#");
			var pname = location.pathname;
			var pos = pname.lastIndexOf("/");
			pname = pname.substr(0, pos);
			var rooturl = location.protocol + "//" + location.host + pname + "/";
		 
			//uncomment this as ejmetaurl should be called with a proxy
			//fetch(ejmetaurl)
			fetch(rooturl+'proxy.ashx?'+ejmetaurl)		
            .then(response => response.text()) // Convert the response to text
            .then(data => {
             
            //  const resultText = this._getHtmlFromH2ToNextH2(data, arrmeta[1]);
              var parser = new DOMParser();
              //const resultText = this._getHtmlFromH2ToNextH2(data, arrmeta[1]);
			  var doc = parser.parseFromString(data, 'text/html');

			  // Find the <li> element with an anchor tag child with id ejdesc
			 

			 // var descLi = doc.querySelector('li > strong > a#'+arrmeta[1]).parentNode.parentNode;
			  var descLi =doc.querySelector('li > p >strong#'+arrmeta[1]).parentNode.parentNode;

			//   var anchorTag = descLi.querySelector('p > strong');
			
	
			 // Get the HTML content from descLi
			var descHtml = descLi.innerHTML.trim();

			// Create a temporary div element to manipulate the HTML
			var tempDiv = document.createElement('div');
			tempDiv.innerHTML = descHtml;

			// Find all <a> tags within the temporary div
			var anchorTags = tempDiv.querySelectorAll('a');

			// Loop through each <a> tag and prepend 'https://www.epa.gov' to the href attribute
		
			anchorTags.forEach(function(anchor) {
				var href = anchor.getAttribute('href');

				// Check if href exists and is a relative path
				if (href && !href.startsWith('http://') && !href.startsWith('https://')) {
					// Prepend 'https://www.epa.gov' to href attribute
					anchor.setAttribute('href', 'https://www.epa.gov' + href);
				}
				anchor.setAttribute('title', 'This link opens a new webpage.');
				// Check if target="_blank" is already present or not
				var targetAttr = anchor.getAttribute('target');
				if (!targetAttr || targetAttr.trim() !== '_blank') {
					// Add target="_blank" attribute if not already present
					anchor.setAttribute('target', '_blank');
					anchor.setAttribute('rel', 'external');
				}
			});

			// Update descLi innerHTML with modified HTML from the temporary div
			descLi.innerHTML = tempDiv.innerHTML;
			tempDiv = null;
			var resultText = descLi.innerHTML.trim();
		
			 $('#scrollableDiv').html('');
			  // Get the height of the first div
			var firstDivHeight = document.getElementById('legendPan').clientHeight;
			// Calculate the desired height for the second div (subtracting some number)
			var secondDivHeight = firstDivHeight - 34; 
			// Apply the calculated height to the second div
			document.getElementById('scrollableDiv').style.height = secondDivHeight + 'px';

			 $('scrollableDiv').height(secondDivHeight);
			 $('#scrollableDiv').prepend("<span id='removeInfo'><img src='images/close.gif' title='remove information' alt='remove information'></span>");
			 $('#scrollableDiv').append(resultText);
			 $('#informationDiv').show();

            })
            .catch(error => console.error('Error fetching data:', error));

		},
		_getHtmlFromH2ToNextH2 : function(html, startId){
			const parser = new DOMParser();
			const doc = parser.parseFromString(html, "text/html");
		
			let startElement = doc.getElementById(startId);
			let currentNode = startElement;
			let htmlContent = "";
		
			// Traverse sibling nodes until the next h2 or end of siblings
			while (currentNode) {
				// Move to the next sibling
				currentNode = currentNode.nextSibling;
		
				// Break if we hit another h2 element
				if (currentNode && currentNode.tagName === "H2") {
					break;
				}
		
				// Accumulate HTML content if the current node is an element
				if (currentNode && currentNode.nodeType === Node.ELEMENT_NODE) {
					htmlContent += currentNode.outerHTML + "\n";
				}
			}
		
			return htmlContent.trim();
		},
		_removeService: function (evt) {
			if (this.groupLayer) {
				var glayer = this.groupLayer;
				this.rootLayer.remove(glayer);
				dojo.empty(this.domNode);
			} else if (this.rootLayer) {
				var tlayer = this.rootLayer;
				this.mapView.map.remove(tlayer);
				if (this.data.renderField) {
					$("#" + this.data.renderField).removeClass("highlight");
					if (this.domNode.id.indexOf("supp")) {
						$("#supp" + this.data.renderField).removeClass("highlight");
					}
				}
				var idField = this.domNode.id.split("_");
				if (idField.length > 0) {
					//   var idFVal = ((this.domNode.id.split("_")[1]).includes("|") ? (this.domNode.id.split("_")[1]).split("|")[1] : this.domNode.id.split("_")[1]);
					var fieldId = this.domNode.id.split("_")[1].includes("|")
						? this.domNode.id.split("_")[1].split("|")[1]
						: this.domNode.id.split("_")[1];
					//   $("#"+((this.domNode.id.split("_")[1]).includes("|") ? (this.domNode.id.split("_")[1]).split("|")[1] : this.domNode.id.split("_")[1])).removeClass("highlight");
					if ($("#" + fieldId).hasClass("highlight")) {
						$("#" + fieldId).removeClass("highlight");
						var srcAttr = $("#" + fieldId)
							.find("img")
							.attr("src");
						if (srcAttr) {
							var srcImgInput = srcAttr.substring(
								srcAttr.lastIndexOf("/") + 1,
								srcAttr.length
							);
							var srcImg =
								srcImgInput.split(/_(.+)/)[0] + srcImgInput.split(/_(.+)/)[1];
							srcImg = srcImg.replace("white", "");
							$("#" + fieldId)
								.find("img")
								.attr("src", "mapdijit/templates/images/" + srcImg);
						}
					}
					
					//unselection of layergroup when removing service for eparegional facilities and Justice40 IRA
					var newLayers = ["epafacs", "trifacs","cdrfacs"];
					if(fieldId ==='epafacs'|| fieldId ==="trifacs"||fieldId ==="cdrfacs"){
					  this._unselectBtnForLayergroup(fieldId,newLayers,"eparegionalfacilities");
					}
					var newLayersIRA = ["epairadisadvantagedcomm","justice40ira","emeftribal"];
					if(fieldId ==='epairadisadvantagedcomm'||
						fieldId ==="justice40ira"||
						fieldId ==="justice40"||
						fieldId ==="emeftribal"
						){
							this._unselectBtnForLayergroup(fieldId,newLayersIRA,"iradisadvantaged");
					}
				}
			}
		},
			_unselectBtnForLayergroup: function(fieldId, newLayers,parentId){
			//if(fieldId ==='epafacs'|| fieldId ==="trifacs"){
				//cview.map.findLayerById(mapids[j])
				//newLayers.pop(fieldId);
				var index = newLayers.indexOf(fieldId);
				if (index > -1) { // only splice array when item is found
					newLayers.splice(index, 1); // 2nd parameter means remove one item only
				  }
				 var findLayer=false;
				for (var j = 0; j < newLayers.length; j++) {
				  if(this.mapView.map.findLayerById(newLayers[j])){
					 
					 findLayer = true;
					 break;
				  }
				}
				if(!findLayer){
				//var parentId = "eparegionalfacilities";
				$("#" + parentId).removeClass("highlight");
				var srcAttr = $("#" + parentId)
					.find("img")
					.attr("src");
				if (srcAttr) {
					var srcImgInput = srcAttr.substring(
						srcAttr.lastIndexOf("/") + 1,
						srcAttr.length
					);
					var srcImg =
						srcImgInput.split(/_(.+)/)[0] + srcImgInput.split(/_(.+)/)[1];
					srcImg = srcImg.replace("white", "");
					$("#" + parentId)
						.find("img")
						.attr("src", "mapdijit/templates/images/" + srcImg);
				}
			}
		   //}

		 },
		_filterService: function (node) {
			if (this.rootLayer) {
				var tlayer = this.rootLayer;
				var robj = tlayer.renderobj;

				var tooltipDialog = dijit.byId("filterDialog");
				if (!tooltipDialog) {
					tooltipDialog = new TooltipDialog({
						id: "filterDialog",
						content: "",
						autofocus: !dojo.isIE, // NOTE: turning focus ON in IE causes errors when reopening the dialog
						refocus: !dojo.isIE,
						style:
							"position: absolute; left:0px; top: 10px; border-width: 0;  font-size: 8pt; font-family: Tahoma; width: 200px; height: 100px; z-index:100",
					});

					var swidget = new DemogFilter({
						tocrow: this,
						mapView: this.mapView,
						dialog: tooltipDialog,
					});

					//alert(widget.domNode.innerHTML);
					swidget.placeAt(tooltipDialog.containerNode);

					// DISPLAY TOOLTIP DIALOG AROUND THE CLICKED ELEMENT
					dijit.popup.open({ popup: tooltipDialog, around: node.target });
					tooltipDialog.opened_ = true;
					tooltipDialog.filterid = tlayer.id;
				} else {
					if (tooltipDialog.opened_ && tooltipDialog.filterid == tlayer.id) {
						dijit.popup.close(tooltipDialog);
						tooltipDialog.opened_ = false;
					} else {
						var swidget = new DemogFilter({
							tocrow: this,
							mapView: this.mapView,
							dialog: tooltipDialog,
						});
						dojo.empty(tooltipDialog.containerNode);

						swidget.placeAt(tooltipDialog.containerNode);

						dijit.popup.open({ popup: tooltipDialog, around: node.target });
						tooltipDialog.opened_ = true;
						tooltipDialog.filterid = tlayer.id;
					}
				}
			}
		},
		_changeTrans: function (node) {
			if (this.rootLayer) {
				var tlayer = this.rootLayer;
				var tvalue = 1 - tlayer.opacity;
				var htmlFragment = "";

				var tooltipDialog = dijit.byId("transDialog");
				if (!tooltipDialog) {
					tooltipDialog = new TooltipDialog({
						id: "transDialog",
						content: htmlFragment,
						autofocus: !dojo.isIE, // NOTE: turning focus ON in IE causes errors when reopening the dialog
						refocus: !dojo.isIE,
						style:
							"position: absolute; left:0px; top: 10px; border-width: 0;  font-size: 8pt; font-family: Tahoma; width: 200px; height: 100px; z-index:100",
					});

					var swidget = new sliderItem({
						servicelayer: tlayer,
						opcvalue: tvalue,
						dialog: tooltipDialog,
						tocdiv: this.containerNode,
					});

					//alert(widget.domNode.innerHTML);
					swidget.placeAt(tooltipDialog.containerNode);

					// DISPLAY TOOLTIP DIALOG AROUND THE CLICKED ELEMENT
					dijit.popup.open({ popup: tooltipDialog, around: node.target });
					tooltipDialog.opened_ = true;
					tooltipDialog.sliderid = tlayer.id;
				} else {
					if (tooltipDialog.opened_ && tooltipDialog.sliderid == tlayer.id) {
						dijit.popup.close(tooltipDialog);
						tooltipDialog.opened_ = false;
						//node.innerHTML = "Show slider below me";
					} else {
						//tooltipDialog.setContent(htmlFragment);
						var swidget = new sliderItem({
							servicelayer: tlayer,
							opcvalue: tvalue,
							dialog: tooltipDialog,
							tocdiv: this.containerNode,
						});
						dojo.empty(tooltipDialog.containerNode);

						swidget.placeAt(tooltipDialog.containerNode);

						dijit.popup.open({ popup: tooltipDialog, around: node.target });
						tooltipDialog.opened_ = true;
						tooltipDialog.sliderid = tlayer.id;
					}
				}
				//this.rootLayer.redraw();
				//this.mapView.map.refreshLayer(this.rootLayer);
			}
		},
		 _handleClick: function(event) {
            // Handle click event here
            var targetElement = event.target;
            if (targetElement.classList.contains("infoNode")) {
                this._onInfoClick(); // Call the _onInfoClick function
            }
        },
		_onInfoClick: function (evt) {
			//alert('here');
			if (this.rootLayer.layerType == "ejscreen_supp"){
				//var ejmetaurl = ejlayoutJSON["Supplementary"].items[this.rootLayer.cat].metalink;
				var ejmetaurl =layerJson[this.rootLayer.renderField].metalink;
				this._getTextFromGlossary(ejmetaurl);
			} else { //e.g. layerType = ejscreen
				//var ejmetaurl = ejlayoutJSON["Primary"].items[this.rootLayer.cat].metalink;
				var ejmetaurl =layerJson[this.rootLayer.renderField].metalink;
				this._getTextFromGlossary(ejmetaurl);
			}	
		},
		_onClick: function (evt) {
			var t = evt.target;
			var lay;
			if (
				t == this.checkNode ||
				dijit.getEnclosingWidget(t) == this.checkNode
			) {
				// 2013-07-23: remove this most complex checkable legend functionality to simplify the widget
				if (this.serviceLayer) {
					this.serviceLayer.visible = this.checkNode.checked;
					// if a sublayer is checked on, force it's group layer to be on.
					// 2013-08-01 handler multiple level of groups
					if (this.serviceLayer.visible) {
						lay = this.serviceLayer;
						while (lay._parentLayerInfo) {
							if (!lay._parentLayerInfo.visible) {
								lay._parentLayerInfo.visible = true;
							}
							lay = lay._parentLayerInfo;
						}
					}
					// if a layer is on, it's service must be on.
					if (this.serviceLayer.visible && !this.rootLayer.visible) {
						this.rootLayer.visible = true;
					}
					if (this.serviceLayer._subLayerInfos) {
						this._setSubLayerVisibilitiesFromGroup(this.serviceLayer);
					}
				} else if (this.groupLayer && this.rootLayer) {
					this.groupLayer.visible = this.checkNode.checked;
				} else if (this.rootLayer) {
					this.rootLayer.visible = this.checkNode.checked;
				}
				// automatically expand/collapse?
				if (this.rootLayerTOC.config.autoToggle !== false) {
					this._toggleContainer(this.checkNode.checked);
				}
				this.rootLayerTOC._adjustToState();
			} else if (t == this.iconNode) {
				this._toggleContainer();
			}
		},

		_setSubLayerVisibilitiesFromGroup: function (lay) {
			if (lay._subLayerInfos && lay._subLayerInfos.length > 0) {
				array.forEach(
					lay._subLayerInfos,
					function (info) {
						info.visible = lay.visible;
						if (info._subLayerInfos && info._subLayerInfos.length > 0) {
							this._setSubLayerVisibilitiesFromGroup(info);
						}
					},
					this
				);
			}
		},
		_getVisibleLayers: function () {
			var vis = [];
			array.forEach(this.rootLayer.allSublayers.items, function (layerInfo) {
				if (layerInfo.subLayerIds) {
					// if a group layer is set to vis, all sub layer will be drawn regardless it's sublayer status
					return;
				} else if (layerInfo.visible) {
					vis.push(layerInfo.id);
				}
			});
			if (vis.length === 0) {
				vis.push(-1);
			} else if (!this.rootLayer.visible) {
				this.rootLayer.visible = true;
			}
			return vis;
		},
		_findTOCNode: function (layerId) {
			if (this.serviceLayer && this.serviceLayer.id == layerId) {
				return this;
			}
			if (this._childTOCNodes.length > 0) {
				var n = null;
				for (var i = 0, c = this._childTOCNodes.length; i < c; i++) {
					n = this._childTOCNodes[i]._findTOCNode(layerId);
					if (n) return n;
				}
			}
			return null;
		},
	});

	var _RootLayerTOC = declare([_Widget], {
		_currentIndent: 0,
		rootLayer: null,
		tocWidget: null,
		/**
		 *
		 * @param {Object} params: noLegend: true|false, collapsed: true|false, slider: true|false
		 * @param {Object} srcNodeRef
		 */
		constructor: function (params, srcNodeRef) {
			this.config = params.config || {};
			this.rootLayer = params.config.layer;
			this.tocWidget = params.tocWidget;
			this.mapView = params.mapView;
		},
		// extenstion point called by framework
		postCreate: function () {
			if (
				this.rootLayer instanceof MapImageLayer ||
				this.rootLayer instanceof TileLayer
			) {
				if (this._legendResponse || this.rootLayer.isDynamic) {
					this._createRootLayerTOC();
				} else {
					this._getLegendInfo();
				}
			} else if (this.rootLayer instanceof FeatureLayer) {
				if (
					this.rootLayer.url &&
					this.rootLayer.url.toLowerCase().indexOf("/mapserver/") > 0
				) {
					this._getLegendInfo();
				} else {
					this._createRootLayerTOC();
				}
				/* } else if (this.rootLayer instanceof (WMSLayer)) {
                        this._wmsLegendInfo();  */
			} else {
				this._createRootLayerTOC();
			}
		},

		_getLegendInfo: function () {
			var wobj = this;
			var legendurl = this.rootLayer.url + "/legend";
			var content = { f: "json" };
			esriRequest(legendurl, {
				query: content,
				responseType: "json",
				callbackParamName: "callback",
			})
				.then(lang.hitch(wobj, wobj._processLegendInfo))
				.catch(lang.hitch(wobj, wobj._createRootLayerTOC));
		},

		_processLegendError: function (err) {
			this._createRootLayerTOC();
		},

		_processLegendInfo: function (response) {
			var json = response.data;

			this._legendResponse = json;
			var layer = this.rootLayer;
			if (
				typeof this.config.layer.selectedlayers == "undefined" ||
				this.config.layer.selectedlayers.length == 0
			) {
				if (layer instanceof FeatureLayer) {
					var tocInfos = [];
					var lid = layer.layerId;
					if (layer.legend) {
						layer._legend = layer.legend;
					} else if (json.layers) {
						//console.log(json.layers)
						var legInfo;
						if (json.layers[lid]) legInfo = json.layers[lid];
						else legInfo = json.layers[0];
						if (legInfo.legend) {
							layer._legends = legInfo.legend;
						}
					}
					tocInfos.push(layer);
					layer._tocInfos = tocInfos;
				} else {
					/* if (layer instanceof TileLayer) {
                            layer.allSublayers = {
                                items: [layer]
                            }
                        } */

					var visibleLayers = [];

					for (let i = 0; i < layer.allSublayers.items.length; i++) {
						if (layer.allSublayers.items[i].visible)
							visibleLayers.push(layer.allSublayers.items[i].id);
					}

					if (!layer._tocInfos) {
						// create a lookup map, key=layerId, value=LayerInfo
						// generally id = index, this is to assure we find the right layer by ID
						// note: not all layers have an entry in legend response.
						var layerLookup = {};
						array.forEach(layer.allSublayers.items, function (layerInfo) {
							layerLookup["" + layerInfo.id] = layerInfo;
							// used for later reference.

							if (layer instanceof FeatureLayer || layer instanceof TileLayer) {
								//layerInfo.visible = true;
								//console.log("tile layer visibility")
							} else {
								//layerInfo.visible = newlayerInfo.defaultVisibility;

								if (visibleLayers && !layerInfo.sublayers) {
									if (array.indexOf(visibleLayers, layerInfo.id) == -1) {
										layerInfo.visible = false;
									} else {
										layerInfo.visible = true;
									}
								}
							}
						});
						// attached legend Info to layer info
						if (json.layers) {
							array.forEach(json.layers, function (legInfo) {
								var layerInfo = layerLookup["" + legInfo.layerId];
								if (layerInfo && legInfo.legend) {
									layerInfo._legends = legInfo.legend;
								} else if (
									layer instanceof FeatureLayer ||
									layer instanceof TileLayer
								) {
									layer._legends = legInfo.legend;
								}
							});
						}
						// nest layer Infos
						array.forEach(layer.allSublayers.items, function (layerInfo) {
							if (layerInfo.sublayers) {
								var subLayerInfos = [];
								array.forEach(layerInfo.sublayers.items, function (lyr, i) {
									subLayerInfos[i] = layerLookup[lyr.id];
									subLayerInfos[i]._parentLayerInfo = layerInfo;
								});
								layerInfo._subLayerInfos = subLayerInfos;
							}
						});

						//finalize the tree structure in _tocInfos, skipping all sublayers because they were nested already.
						var tocInfos = [];
						array.forEach(layer.allSublayers.items, function (layerInfo) {
							if (
								layerInfo instanceof FeatureLayer ||
								layerInfo instanceof TileLayer
							) {
								tocInfos.push(layerInfo);
							} else {
								if (layerInfo.sublayers == null) {
									tocInfos.push(layerInfo);
									if(layer.id === "ejgrants"){
									tocInfos[0]._legends.reverse();
									}
								}
							}
						});
						layer._tocInfos = tocInfos;
					}
				}
			} else {
				var visibleLayers = this.config.layer.selectedlayers;

				if (!layer._tocInfos) {
					// create a lookup map, key=layerId, value=LayerInfo
					// generally id = index, this is to assure we find the right layer by ID
					// note: not all layers have an entry in legend response.
					var layerLookup = {};
					array.forEach(layer.allSublayers.items, function (layerInfo) {
						// used for later reference.

						if (layer instanceof FeatureLayer || layer instanceof TileLayer) {
							//layerInfo.visible = true;
							//console.log("tile layer visibility")
						} else {
							if (visibleLayers && !layerInfo.sublayers) {
								for (var k = 0; k < visibleLayers.length; k++) {
									if (visibleLayers[k] == layerInfo.id) {
										//layerInfo.visible = true;
										layerLookup["" + layerInfo.id] = layerInfo;
									}
								}
							}
						}
					});
					// attached legend Info to layer info
					if (json.layers) {
						array.forEach(json.layers, function (legInfo) {
							//if (layerLookup['' + legInfo.id]) {
							var layerInfo = layerLookup["" + legInfo.layerId];
							if (layerInfo && legInfo.legend) {
								layerInfo._legends = legInfo.legend;
							} else if (
								layer instanceof FeatureLayer ||
								layer instanceof TileLayer
							) {
								layer._legends = legInfo.legend;
							}
							//}
						});
					}
					// nest layer Infos
					array.forEach(layer.allSublayers.items, function (layerInfo) {
						if (layerInfo.sublayers) {
							var subLayerInfos = [];
							array.forEach(layerInfo.sublayers.items, function (lyr, i) {
								subLayerInfos[i] = layerLookup[lyr.id];
								subLayerInfos[i]._parentLayerInfo = layerInfo;
							});
							layerInfo._subLayerInfos = subLayerInfos;
						}
					});

					//finalize the tree structure in _tocInfos, skipping all sublayers because they were nested already.
					var tocInfos = [];

					array.forEach(layer.allSublayers.items, function (layerInfo) {
						if (layerLookup["" + layerInfo.id]) {
							if (
								layerInfo instanceof FeatureLayer ||
								layerInfo instanceof TileLayer
							) {
								tocInfos.push(layerInfo);
							} else {
								if (layerInfo.sublayers == null) {
									tocInfos.push(layerInfo);
								}
							}
						}
					});

					layer._tocInfos = tocInfos;
				}
			}
			this._createRootLayerTOC();
		},
		_createRootLayerTOC: function () {
			// sometimes IE may fail next step

			this._rootLayerNode = new _TOCNode({
				rootLayerTOC: this,
				rootLayer: this.rootLayer,
				mapView: this.mapView,
			});
			this._rootLayerNode.placeAt(this.domNode);

			//this._visHandler = dojo.connect(this.rootLayer, "onVisibilityChange", this, "_adjustToState");
			// this will make sure all TOC linked to a Map synchronized.
			/* if (this.rootLayer instanceof (MapImageLayer)) {
                    this._visLayerHandler = dojo.connect(this.rootLayer, "setVisibleLayers", this, "_onSetVisibleLayers");
                } */
			this._adjustToState();
			this._loaded = true;
			this.onLoad();
		},
		/**
		 * @event
		 */
		onLoad: function () {},

		_adjustToState: function () {
			this._rootLayerNode._adjustToState();
		},
		destroy: function () {
			//dojo.disconnect(this._visHandler);
			/* if (this._visLayerHandler)
                    dojo.disconnect(this._visLayerHandler); */
		},
	});

	var TOC = declare([_Widget], {
		indentSize: 18,
		swatchSize: [30, 30],
		refreshDelay: 500,
		layerInfos: null,

		/**
		 * @name TOCLayerInfo
		 * @class This is an object literal that specify the options for each map rootLayer layer.
		 * @property {Layer} [layer] ArcGIS Server layer.
		 * @property {string} [title] title. optional. If not specified, rootLayer name is used.
		 * @property {Boolean} [slider] whether to show slider for each rootLayer to adjust transparency. default is false.
		 * @property {Boolean} [noLegend] whether to skip the legend, and only display layers. default is false.
		 * @property {Boolean} [collapsed] whether to collapsed the rootLayer layer at beginning. default is false, which means expand if visible, collapse if not.
		 *
		 */
		/**
		 * @name TOCOptions
		 * @class This is an object literal that specify the option to construct a {@link TOC}.
		 * @property {esri.Map} [map] the map instance. required.
		 * @property {Object[]} [layerInfos] a subset of layers in the map to show in TOC. each object is a {@link TOCLayerInfo}
		 * @property {Number} [indentSize] indent size of tree nodes. default to 18.
		 */
		/**
		 * Create a Table Of Contents (TOC)
		 * @name TOC
		 * @constructor
		 * @class This class is a Table Of Content widget.
		 * @param {ags.TOCOptions} opts
		 * @param {DOMNode|id} srcNodeRef
		 */
		constructor: function (params, srcNodeRef) {
			params = params || {};
			if (!params.map) {
				throw new Error("no map defined in params for TOC");
			}
			this.mapView = params.mapView;
			this.layerInfos = params.layerInfos;
			dojo.mixin(this, params);
		},
		// extension point
		postCreate: function () {
			this._createTOC();
		},
		/** @event the widget DOM is loaded
		 *
		 */
		onLoad: function () {},
		_createTOC: function () {
			domContruct.empty(this.container);
			this._rootLayerTOCs = [];
			for (var i = 0, c = this.layerInfos.length; i < c; i++) {
				// attach a title to rootLayer layer itself
				var info = this.layerInfos[i];
				if (info.layer instanceof GraphicsLayer) {
					//console.log("graphic layer is not added to TOC");
				} else if (
					info.layer.type == "feature" &&
					info.layer.layerType &&
					info.layer.layerType == "digitize"
				) {
				} else {
					this._Wait(info, 0);
				}
			}
			if (!this._zoomHandler) {
				var obj = this;
				this._zoomHandler = watchUtils.whenTrue(
					this.mapView,
					"stationary",
					function (evt) {
						obj._adjustToState();
					}
				);
				//dojo.connect(this.map, "onZoomEnd", this, "_adjustToState");
			}
		},

		_Wait: function (obj, counter) {
			var lyr = obj.layer;

			if (lyr.loaded) {
				if (!this.findTOCNode(lyr)) {
					var rootLayerTOC = new _RootLayerTOC({
						config: obj,
						tocWidget: this,
						mapView: this.mapView,
					});
					this._rootLayerTOCs.push(rootLayerTOC);

					rootLayerTOC.placeAt(this.container);
				}
			} else {
				var selfobj = this;
				counter = counter + 1;
				//}, 5000);
				if (counter < 10) {
					setTimeout(function () {
						selfobj._Wait(obj, counter);
					}, 1000);
				} else {
					alert("The service ''" + lyr.title + "' is currently not reachable.");
					this.mapView.map.remove(lyr);
				}
			}
		},

		_adjustToState: function () {
			array.forEach(this._rootLayerTOCs, function (widget) {
				widget._adjustToState();
			});
		},
		/**
		 * Refresh the TOC to reflect
		 */
		refresh: function () {
			this._createTOC();
		},
		destroy: function () {
			this._zoomHandler.remove();
		},
		/**
		 * Find the TOC Node based on root layer and optional serviceLayer ID.
		 * @param {Object} layer root Layer of a map
		 * @param {Object} serviceLayerId id of a ArcGIS Map Service Layer
		 * @return {TOCNode} TOC node, it has public methods: collapse, expand, show, hide
		 */
		findTOCNode: function (layer, serviceLayerId) {
			var w;
			array.every(this._rootLayerTOCs, function (widget) {
				if (widget.rootLayer == layer) {
					w = widget;
					return false;
				}
				return true;
			});
			if (
				serviceLayerId !== null &&
				serviceLayerId !== undefined &&
				w.rootLayer instanceof MapImageLayer
			) {
				return w._rootLayerNode._findTOCNode(serviceLayerId);
			} else if (w) {
				return w._rootLayerNode;
			}
			return null;
		},
	});
	return TOC;
});
