
/********************************************************************************************************
 
 Name:        EJScreenTool
 Purpose:     This files defines the version of EJScreen, initializes the global variables used throughout
              the application such as Urls and the JSON objects used for the graphic user interface. 
 
 Author:      SAIC, EPA OMS Contractor

 Created:     01/19/2024
 Updated:     01/22/2024
 
**********************************************************************************************************/ 


//There are constants used from config.js file too

var versionText = "Version 2.3"; //version text label for title etc.
var versionNumber = "2.3"; //numeric version used in code
var versionDetailed = "2.3.02"; //detailed version number for dev records, not exposed in app

//version history
//2.2.Beta0 - 6/21/23 - updated mobile map and added version detail to config
//2.2.0 - 6/26/23 - first release
//2.2.1 - 6/28/23 - fix for 0 pop on report, API changes. Updated EJ entry.html widget
//2.2.2 - 6/29/23 - fix entry.html and entry2.html. Update demog report and web.config for acs 2021.
//2.2.3 - 7/11/23 -added and updated IRA data. Fixed issue of showing same data on multiple demog widget popups.
//2.2.4 - 7/13/23 - added fixes for IRA transparency, report by city error, missing metadata links for IRA layers, IRA layers in sidebyside map. Deployed new ejscreenapi page that returns json data vs html. Removed end slash from homeappurl for home page link.
//2.2.5 - 7/13/23-2 - updated config and code to show IRA Data as 1 service vs 3 layers and not show J40 by default. Update new ejscreenapi1 that uses new report data and sends back json vs html.
//2.2.6 - 7/15/23 - added fix for IRA metadata links and updates to API2 pages
//2.2.7 - 7/24/23 - updated digest report and added json and pjson options to api format dropdowns
//2.2.8 - 7/27/23 - removed TRI from local hosted list in TOC, updated config for latest nces schools for side by side mapper, fixed Ozone hover text on TOC, added TSCA back to regulated facs,added NH .gov site to whitelist, GET call is validated for url length in API pages
//2.2.9 - 8/17/23 - updated TSCA label in EF Facilities
//2.2.10 - 8/18/23 - updated TSCA label for capitalization and updated field description
//2.2.11 - 12/14/23 - updated link for Subsidized Housing to correct index

//8.5.24 - updated to 2.3.01
//2.3.02 - 6/29/26 - EJAM API/app URLs set here (window.EJAM_API_BASE / window.EJAM_APP_URL); used by multisite tools, the Multisite Tool link, and the single-site report.

//end version history



//fire google tag manager
var enableGoogleTagManager = true;


// require(["https://js.arcgis.com/4.20/esri/config"], function (esriConfig) { 
require(["esri/config"], function (esriConfig) { 
//Timeout in milliseconds for all esriRequests. Used for call to EJ services for reports.
esriConfig.request.timeout = 120000; //2 minutes
});


var localRESTurl = "https://services2.arcgis.com/w4yiQqB14ZaAGzJq/arcgis/rest/services/";
//var localRESTurl = "https://ejscreen.epa.gov/arcgis/rest/services/";
var prodRESTurl = "https://geopub.epa.gov/arcgis/rest/services/";

//https://services.arcgis.com/EXyRv0dqed53BmG2/arcgis/rest/services/EJScreen/FeatureServer // EDN test
//main ej service for ej report section
var ejscreenservice = localRESTurl + "EJScreen_US_Percentiles_Block_Group_gdb_V_2.32_(Parent)_view/FeatureServer/";
//ej extra service for extra indicators in ej report section
var ejscreenextraservice = localRESTurl + "ejscreen/ejscreen_extra/MapServer";
//ej demog for demog section of ej report
var ejscreendemogservice = localRESTurl + "ejscreen/ejquery/MapServer";

var ejscreenservice_state =  localRESTurl + "EJScreenStatePercentilesBlockGroup/FeatureServer/";
var ejscreenApiPageUrl =
	localRESTurl + "ejscreen/ejscreen_v2024_with_as_cnmi_gu_vi/MapServer/exts/EJCensusReports/GetEJScreen";

// --- EJAM integration endpoints (single source of truth) -------------------
// Used by multisite.js (Multisite Report + "Send to EJAM" handoff), the
// "Multisite Tool" link in index.html, and the single-site report in
// mapdijit/EJinfoWindow.js. Set these per deployment; the inline defaults in
// those files are just fallbacks if these globals are ever unset.
window.EJAM_API_BASE = "https://ejamapi-84652557241.us-central1.run.app"; // EJAM REST API base (no trailing /report)
window.EJAM_APP_URL  = "https://ejam.publicenvirodata.org/";              // live EJAM web app


var ejscreenservice4SOE = ejscreenservice;
//to do: needed still?
var ejscreenservice4SOE_SUPP = localRESTurl + "ejscreen/ejscreen_v2024_with_as_cnmi_gu_vi/MapServer";

var ejscreenSOEurl = ejscreenservice4SOE + "/exts/EJCensusReports/GetEJScreen";

//to do: needed still?
//var ejcitySOEurl = ejscreenservice4SOE + "/exts/EJCensusReports/GetEJScreenByCity";
var ejcitySOEurl = ejscreenservice4SOE + "/exts/EJCensusReports/GetEJScreen";
//to do: needed still?
var ejscreenSOEurl_SUPP = ejscreenservice4SOE_SUPP + "/exts/EJScreen_EJReports/GetEJScreen";
//to do: needed still?
var ejcitySOEurl_SUPP = ejscreenservice4SOE_SUPP + "/exts/EJScreen_EJReports/GetEJScreenByCity";


//lookup table with ej and supplemental labels
//to do: needed still?
var lookuptable_supp_url="https://geopub.epa.gov/arcgis/rest/services/ejscreen/ejlookupfull_2020/MapServer/1";

var localGeometryService = localRESTurl + "Utilities/Geometry/GeometryServer";
//var localPrintService = localRESTurl + "Utilities/PrintingTools/GPServer/Export Web Map Task";
//var localPrintService = "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export Web Map Task";
//var localPrintService = "https://map23.epa.gov/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export Web Map Task";
//var localPrintService = "https://epamap36.epa.gov/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export Web Map Task";
var localPrintService = "https://geopub.epa.gov/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export Web Map Task";


//used by report digest
var ejscreenindexurl = localRESTurl + "ejscreen/ejscreen_v2024_with_as_cnmi_gu_vi/MapServer/33/query";
var ejscreenstateurl = localRESTurl + "ejscreen/ejscreen_v2024_with_as_cnmi_gu_vi/MapServer/35/query";
var ejscreenusaurl = localRESTurl + "ejscreen/ejscreen_v2024_with_as_cnmi_gu_vi/MapServer/36/query";

var ejscreenenvindexnationalurl = localRESTurl+"ejscreen/ejscreen_v2024_with_as_cnmi_gu_vi/MapServer/33";
var ejscreenenvindexstateurl = localRESTurl+"ejscreen/ejscreen_v2024_with_as_cnmi_gu_vi/MapServer/34";


var helpfileurl = "https://web.archive.org/web/20250000000000*/https://ejscreen.epa.gov/mapper/help/ejscreen_help.pdf";
var glossaryurlEJIndexes = "https://web.archive.org/web/20250121194855/https://www.epa.gov/ejscreen/ej-index-descriptions";
var glossaryurlSuppIndexes = "https://web.archive.org/web/20241202134502/https://www.epa.gov/ejscreen/supplemental-index-descriptions";
//var glossaryurl = "https://www.epa.gov/ejscreen/glossary-ejscreen-terms";
//var glossaryurl = "https://ejscreen.epa.gov/ejscreen23/ejscreen-map-descriptions3.html";
var glossaryurl ="https://web.archive.org/web/20250123161322/https://www.epa.gov/ejscreen/ejscreen-map-descriptions";
// var homeappurl = "http://localhost:8000"; --SH--What is this used for?
var v1appurl = "ejscreen_v1/index.html";
var countybndurl =
	"//geopub.epa.gov/arcgis/rest/services/EMEF/Boundaries/MapServer/5/query";
//var homeappurl = "http://ww2.epa.gov/ejscreen"; //(this is for internet production)
var bingMapsKey =
	"Ahjoir6USRWLNnqRrFbMoGSbm2Ea-vz30l5-84Ulbji_0HMf9g954NvJJIzeda94";
var geocoderurl =
	location.protocol +
	"//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";

var lookuptableindex = 0
var ejmapindex = 0; //index of main ej layer in service
var ejmapindex_state = 0; //index of state ej layer in service
var ejmapindexsupp = 0;
var ejmapindexsupp_state = 0;
var bgIDfieldname = "ID";
var recordlimit = 1000;
var arealimit = 500; //set estimated area limit to 500 sq miles
var proxyurl = "proxy.ashx";
var bufferunits = {
	miles: { esricode: "9035", label: "mi" },
	mile: { esricode: "9035", label: "mi" },
	yard: { esricode: "9037", label: "yd" },
	foot: { esricode: "9002", label: "ft" },
	kilometers: { esricode: "9036", label: "km" },
	kilometer: { esricode: "9036", label: "km" },
	meter: { esricode: "9001", label: "m" },
};
var unitlookup = {
	miles: "mile",
	kilometers: "kilometer",
	meters: "meter",
};
var drawlayerobj = {};
var view;
var basemapGallery;


//// EJ2020 add suggestservices for pop up

var slrMouseOverTxt =
	"Land at risk of permanent flooding when sea level rises. Over the next 30 years, scientists estimate a 1-3 foot rise along most of the U.S. coastline";
var metaroot = "https://web.archive.org/web/20250121194843/https://www.epa.gov/ejscreen/ejscreen-map-descriptions";
var metanchors = {
	//note: ej index anchors are in different section of config below, 
    //additional demog anchors are in TOC.js
	//this section is for all others
	//health
	lifeexpentancy: { metalink: metaroot + "#heal" },
	heartdisease: { metalink: metaroot + "#heal" },
	asthma: { metalink: metaroot + "#heal" },
	cancer: { metalink: metaroot + "#heal" },
	personswithdisabilities: { metalink: metaroot + "#heal" },
	//climate
	drought: { metalink: metaroot + "#drought" },
	coastalflood: { metalink: metaroot + "#clim" },
	floodplain: { metalink: metaroot + "#clim" },
	heatindex: { metalink: metaroot + "#clim" },
	"noaa|usslr1": { metalink: metaroot + "#clim" },
	"noaa|usslr2": { metalink: metaroot + "#clim" },
	"noaa|usslr3": { metalink: metaroot + "#clim" },
	"noaa|usslr4": { metalink: metaroot + "#clim" },
	"noaa|usslr5": { metalink: metaroot + "#clim" },	
	"noaa|usslr6": { metalink: metaroot + "#clim" },
	firerisk: { metalink: metaroot + "#clim" },
	floodrisk: { metalink: metaroot + "#clim" },
	//critical service gaps
	broadband: { metalink: metaroot + "#crit" },
	nohealthinsurance: { metalink: metaroot + "#crit" },
	housingburden: { metalink: metaroot + "#crit" },
	transportationdisadv: { metalink: metaroot + "#crit" },	
	foodaccess: { metalink: metaroot + "#crit" },
	//medicallyunderserved: { metalink: metaroot + "#crit" },
	
	//threshold
	threshold: { metalink: metaroot + "#thre" },
	//places
	epafacs: { metalink: metaroot + "#sites-reporting-to-epa" },
	trifacs: { metalink: metaroot + "#sites-reporting-to-epa" },
	cdrfacs: { metalink: metaroot + "#sites-reporting-to-epa" },
	pfacilities: { metalink: metaroot + "#echo" },	
	pschool: { metalink: metaroot + "#schools" },
	pworship: { metalink: metaroot + "#places-of-worship" },
	phospital: { metalink: metaroot + "#hospitals" },
	padusowner: { metalink: metaroot + "#parks" },
	//other env
	ejrsei: { metalink: metaroot + "#other-environmental-data" },
	ejnonatt: { metalink: metaroot + "#nonattainment-areas" },
	ejwater: { metalink: metaroot + "#water-features" },
	ejairtoxics: { metalink: metaroot + "#other-environmental-data" },
    waterwells: { metalink: metaroot + "#other-environmental-data" },
    dwatersvcareas: { metalink: metaroot + "#other-environmental-data" },
    ejgrants: { metalink: metaroot + "#other-environmental-data" },
	//tribal
	tribe: { metalink: metaroot + "#tribal-lands-and-indigenous-areas" },
	cession: { metalink: metaroot + "#tribal-lands-and-indigenous-areas" },
	indig: { metalink: metaroot + "#tribal-lands-and-indigenous-areas" },
	
	//indiv layers
	prison: { metalink: metaroot + "#prisons" },
	phouse: { metalink: metaroot + "#public-housing" },
	shouse: { metalink: metaroot + "#subsidized-public-housing" },
	//colonias
	coloniashud: { metalink: metaroot + "#colonias" },
	coloniastx: { metalink: metaroot + "#colonias" },
	coloniasnm: { metalink: metaroot + "#colonias" },
	//j40 and IRA and associated group layers
	justice40: { metalink: metaroot + "#justice40" },	
	epairamerged: { metalink: metaroot + "#epaira" },
	epairadisadvantagedcomm: { metalink: metaroot + "#epaira" },	
	iradisadvantaged: { metalink: metaroot + "#epaira" },
	iradisadvantaged2: { metalink: metaroot + "#epaira" },
	
	ussupplgreater90: { metalink: metaroot + "#epaira" },
	statesupplgreater90: { metalink: metaroot + "#epaira" },
	indianamericanres: { metalink: metaroot + "#tribal-lands-and-indigenous-areas" },
	justice40ira: { metalink: metaroot + "#justice40" },
	emeftribal: { metalink: metaroot + "#tribal-lands-and-indigenous-areas" },
	hawaiianhomelands: { metalink: metaroot + "#tribal-lands-and-indigenous-areas" },	
	
	//boundaries
	ejbnd: { metalink: metaroot + "#boun" }	
};

//RENDERING SUPPORT
function pctrend (fieldname) {
	rend = {
		type: "class-breaks", // autocasts as new ClassBreaksRenderer()
		field: fieldname,
		//normalizationField: "EDUCBASECY",
		legendOptions: {
		title: "Percentile"
		},
		defaultSymbol: {
		type: "simple-fill", // autocasts as new SimpleFillSymbol()
		color: "black",
		style: "backward-diagonal",
		outline: {
			width: 0.2,
			color: [105, 105, 105, 0.5]
		}
		},
		defaultLabel: "Data Not Available",
		classBreakInfos: [
		{
			minValue: 0,
			maxValue: 20,
			symbol: {
				type: "simple-fill", // autocasts as new SimpleFillSymbol()
				color: "#fed976",
				style: "solid",
				outline: {
				width: 0.2,
				color: [105, 105, 105, 0.5]
				}
			},
			label: "< 20"
		},
		{
			minValue: 21,
			maxValue: 39,
			symbol: {
				type: "simple-fill", // autocasts as new SimpleFillSymbol()
				color: "#feb24c",
				style: "solid",
				outline: {
				width: 0.2,
				color: [105, 105, 105, 0.5]
				}
			},
			label: "> 20 - 40"
		},
		{
			minValue: 40,
			maxValue: 59,
			symbol: {
				type: "simple-fill", // autocasts as new SimpleFillSymbol()
				color: "#fd8d3c",
				style: "solid",
				outline: {
				width: 0.2,
				color: [105, 105, 105, 0.5]
				}
			},
			label: "> 40 - 60"
		},
		{
			minValue: 60,
			maxValue: 79,
			symbol: {
				type: "simple-fill", // autocasts as new SimpleFillSymbol()
				color: "#fc4e2a",
				style: "solid",
				outline: {
				width: 0.2,
				color: [105, 105, 105, 0.5]
				}
			},
			label: "> 60 - 80"
		},
		{
			minValue: 80,
			maxValue: 99,
			symbol: {
				type: "simple-fill", // autocasts as new SimpleFillSymbol()
				color: "#e31a1c",
				style: "solid",
				outline: {
				width: 0.2,
				color: [105, 105, 105, 0.5]
				}
			},
			label: "> 80 - 100"
		}
		]
	}
	return rend;
}

function valrend(fieldname) {
	var rend = {
		type: "unique-value",
		valueExpression: `
		var val = $feature.`+fieldname+`;
		var newval = Replace(val, " %ile", "")
		var num = Number(newval);
		When(
              num > 80, "> 80-100",
              num > 60, "> 60-80",
              num > 40, "> 40-60",
			  num > 20, "> 20-40",
			  num >= 0, "> 0-20",
              "Data Not Available"
            );
		`,
		valueExpressionTitle: "Percentile",
		defaultSymbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: "black",
            style: "backward-diagonal",
            outline: {
              width: 0.2,
			  color: [105, 105, 105, 0.5]
            }
          },
        defaultLabel: "Data Not Available",
		uniqueValueInfos: [{
			value: "> 80-100",
			symbol: {
				type: "simple-fill",
				color: "#e31a1c",
				width: "6px",
				style: "solid",
				outline: {
				width: 0.2,
				color: [105, 105, 105, 0.5]
				}
			}
			}, {
			value:"> 60-80",
			symbol: {
				type: "simple-fill",
				color: "#fc4e2a",
				width: "3px",
				style: "solid",
				outline: {
				width: 0.2,
				color: [105, 105, 105, 0.5]
				}
			}
			}, {
			value: "> 40-60",
			symbol: {
				type: "simple-fill",
				color: "#fd8d3c",
				width: "1px",
				style: "solid",
				outline: {
				width: 0.2,
				color: [105, 105, 105, 0.5]
				}
			}
			}, {
			value: "> 20-40",
			symbol: {
				type: "simple-fill",
				color: "#feb24c",
				width: "1px",
				style: "solid",
				outline: {
				width: 0.2,
				color: [105, 105, 105, 0.5]
				}
			}
			}, {
			value: "> 0-20",
			symbol: {
				type: "simple-fill",
				color: "#fed976",
				width: "1px",
				style: "solid",
				outline: {
				width: 0.2,
				color: [105, 105, 105, 0.5]
				}
			}
			}
		]
	}
	return rend
  };

//round fields to specified decimals places. Key must match layer name in one of the other config sections below
//for featurelayer types, key is used and field name is used in NAMES object. For dynamiclayers, key is currently not used and fields are search in the ALIAS object
var suggestservicesFieldDecimalPlacesNAMES = {
	broadband: { LIMITEDBBPCT: 1},
};
var suggestservicesFieldDecimalPlacesALIASES = {
	"Percent with Limited Broadband": 1,
};

//if layer index is added for sublayers, title must currently be added in config as well for TOC.

var suggestservicesCLIMATE = {

	floodrisk: {
		title: "Flood Risk (National Percentile)",
		mouseover:"Model representing the risk of flooding",
		url: "https://services.arcgis.com/EXyRv0dqed53BmG2/arcgis/rest/services/EPA_EJScreen_Flood_Risk/FeatureServer/7",
		type: "featurelayer",
		removable: true,
		opacity: "1",
		//layers: [{ id: 0, title: "National Percentile",visible:true }], //{ id: 1, title: "State Percentile" ,visible:false},
	},

	firerisk: {
		title: "Wildfire Risk (National Percentile)",
		mouseover:"Model representing wildfire exposure",
		url: "https://services.arcgis.com/EXyRv0dqed53BmG2/arcgis/rest/services/Wildfire_Risk/FeatureServer/0",
		type: "featurelayer",
		removable: true,
		opacity: "1",
		//layers: [{ id: 3, title: "State Percentile",visible:false }]//,{ id: 2, title: "National Percentile",visible:true }],
	},

	/*heatnational: {
		title: "Extreme Heat Risk",
		mouseover:"Model representing extreme heat exposure",
		url: localRESTurl + "ejscreen/climate/MapServer",
		type: "agsdynamic",
		removable: true,
		opacity: "0.5",
		layers: [{ id: 5, title: "State Percentile",visible:false },{ id: 4, title: "National Percentile",visible:true  }],
	},*/
	floodplain: {
		title: "100 Year Floodplain",
		mouseover:"Estimated 100-year floodplains ",
		url: "https://enviroatlas.epa.gov/arcgis/rest/services/Supplemental/Estimated_floodplain_CONUS_WM/ImageServer",
		type: "agsimagery",
		removable: true,
		opacity: "1",
	},
	noaa: {
		title: "Sea Level Rise",
		mouseover:"Land at risk of permanent flooding when sea level rises between 1 - 6 feet",
		isfolder: true,
		
		services: {
			usslr1: {
				title: "1ft Sea Level Rise",
				url: "https://www.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_1ft/MapServer",
				type: "agstile",
				removable: true,
				opacity: "1",
				mouseover: slrMouseOverTxt,
			},
			usslr2: {
				title: "2ft Sea Level Rise",
				url: "https://www.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_2ft/MapServer",
				type: "agstile",
				removable: true,
				opacity: "1",
			},
			usslr3: {
				title: "3ft Sea Level Rise",
				url: "https://www.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_3ft/MapServer",
				type: "agstile",
				removable: true,
				opacity: "1",
			},
			usslr4: {
				title: "4ft Sea Level Rise",
				url: "https://www.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_4ft/MapServer",
				type: "agstile",
				removable: true,
				opacity: "1",
			},
			usslr5: {
				title: "5ft Sea Level Rise",
				url: "https://www.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_5ft/MapServer",
				type: "agstile",
				removable: true,
				opacity: "1",
			},
			usslr6: {
				title: "6ft Sea Level Rise",
				url: "https://www.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_6ft/MapServer",
				type: "agstile",
				removable: true,
				opacity: "1",
			},
		 },
		}, 
		heatindex: {
		title: "Extreme Heat",
		mouseover:"Extreme Heat",
		url: "https://services.arcgis.com/cJ9YHowT8TU7DUyn/arcgis/rest/services/EJScreen_Heat_Index/FeatureServer/1",
		type: "featurelayer",
		removable: true,
		opacity: "0.8",
		renderer: {
          type: "class-breaks", // autocasts as new ClassBreaksRenderer()
          field: "Max_Days_Above_90",
          //normalizationField: "EDUCBASECY",
          legendOptions: {
            title: "Max Days Above 90"
          },
          defaultSymbol: {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: "black",
            style: "backward-diagonal",
            outline: {
              width: 0.2,
			  color: [105, 105, 105, 0.5]
            }
          },
          defaultLabel: "Data Not Available",
          classBreakInfos: [
            {
              minValue: 0,
              maxValue: 20,
              symbol: {
				  type: "simple-fill", // autocasts as new SimpleFillSymbol()
				  color: "#fed976",
				  style: "solid",
				  outline: {
					width: 0.2,
					color: [105, 105, 105, 0.5]
				  }
				},
              label: "< 20"
            },
            {
              minValue: 21,
              maxValue: 39,
              symbol: {
				  type: "simple-fill", // autocasts as new SimpleFillSymbol()
				  color: "#feb24c",
				  style: "solid",
				  outline: {
					width: 0.2,
					 color: [105, 105, 105, 0.5]
				  }
				},
              label: "> 20 - 40"
            },
            {
              minValue: 40,
              maxValue: 59,
              symbol: {
				  type: "simple-fill", // autocasts as new SimpleFillSymbol()
				  color: "#fd8d3c",
				  style: "solid",
				  outline: {
					width: 0.2,
					 color: [105, 105, 105, 0.5]
				  }
				},
              label: "> 40 - 60"
            },
			{
              minValue: 60,
              maxValue: 79,
              symbol: {
				  type: "simple-fill", // autocasts as new SimpleFillSymbol()
				  color: "#fc4e2a",
				  style: "solid",
				  outline: {
					width: 0.2,
					color: [105, 105, 105, 0.5]
				  }
				},
              label: "> 60 - 80"
            },
			{
              minValue: 80,
              maxValue: 99,
              symbol: {
				  type: "simple-fill", // autocasts as new SimpleFillSymbol()
				  color: "#e31a1c",
				  style: "solid",
				  outline: {
					width: 0.2,
					 color: [105, 105, 105, 0.5]
				  }
				},
              label: "> 80 - 100"
            },
            {
              minValue: 100,
              maxValue: 207,
              symbol: {
				  type: "simple-fill", // autocasts as new SimpleFillSymbol()
				  color: "#b10026",
				  style: "solid",
				  outline: {
					width: 0.2,
					 color: [105, 105, 105, 0.5]
				  }
				},
              label: "> 100 - 207"
            }
          ]
        }
		
	  
	}

}

var suggestservicesCRITSVCGAPS={
	broadband: {
		title: "Broadband Gaps",
		mouseover:"Areas with households without a broadband internet subscription",
		layerurl: "https://services.arcgis.com/EXyRv0dqed53BmG2/arcgis/rest/services/Broadband_Gaps/FeatureServer/0",
		type: "featurelayer",
		removable: true,
		opacity: "1",
		//layers: [{ id: 0, title: "Households with Limited Broadband" }],
		
	},
	nohealthinsurance: {
		title: "Lack of Health Insurance",
		mouseover:"People with limited health insurance",
		layerurl: "https://services.arcgis.com/EXyRv0dqed53BmG2/arcgis/rest/services/Lack_of_Health_Insurance/FeatureServer/1",
		type: "featurelayer",
		removable: true,
		opacity: "1",
		//layers: [{ id: 1, title: "Lack of Health Insurance" }],
	},
	housingburden: {
		title: "Housing Burden",
		mouseover:"Households that are both earning < 80% of HUD’s Area Median Family Income and spending > 30% of their income on housing costs",
		layerurl: "https://services.arcgis.com/EXyRv0dqed53BmG2/arcgis/rest/services/Housing_Burden/FeatureServer/0",
		type: "featurelayer",
		removable: true,
		opacity: "1",
		//layers: [{ id: 2, title: "Housing Burden" }],
	},
	transportationdisadv: {
		title: "Transportation Access Burden",
		mouseover:"Communities and places that spend more, and take longer, to get where they need to go",
		layerurl: "https://services.arcgis.com/EXyRv0dqed53BmG2/arcgis/rest/services/Transportation_Access_Burden/FeatureServer/1",
		type: "featurelayer",
		removable: true,
		opacity: "1",
		//layers: [{ id: 3, title: "Transportation Access Burden" }],
	},
	foodaccess: {
		title: "Food Desert",
		mouseover:"Low income areas with low access to grocery stores",
		layerurl: "https://services.arcgis.com/EXyRv0dqed53BmG2/arcgis/rest/services/Food_Desert/FeatureServer/0",
		type: "featurelayer",
		removable: true,
		opacity: "1",
		//layers: [{ id: 4, title: "Food Desert" }],
	},
}

var suggestservicesHEALTH = {
	lifeexpentancy: {
		title: "Low Life Expectancy",
		mouseover:"Average limited life expectancy ranked as percentiles",
		layerurl: "https://services2.arcgis.com/w4yiQqB14ZaAGzJq/arcgis/rest/services/HealthDisparitiesEJScreen/FeatureServer/0",
		type: "featurelayer",
		removable: true,
		opacity: "1",
		renderer: pctrend("P_LIFEEXP")
		//layers: [{ id: 0, title: "Low Life Expectancy" }],
	},
	heartdisease: {
		title: "Heart Disease",
		mouseover:"Heart disease prevalence among adults 18 or older",
		layerurl: "https://services2.arcgis.com/w4yiQqB14ZaAGzJq/arcgis/rest/services/HealthDisparitiesEJScreen/FeatureServer/1",
		type: "featurelayer",
		removable: true,
		opacity: "1",
		renderer: pctrend("P_HEARTDISEASE")
		//layers: [{ id: 1, title: "Coronary Heart Disease" }],
	},
	asthma: {
		title: "Asthma",
		mouseover:"Asthma prevalence among adults aged 18 or older",
		layerurl: "https://services2.arcgis.com/w4yiQqB14ZaAGzJq/arcgis/rest/services/HealthDisparitiesEJScreen/FeatureServer/3",
		type: "featurelayer",
		removable: true,
		opacity: "1",
		renderer: pctrend("P_ASTHMA")
		//layers: [{ id: 2, title: "Current Asthma" }],
	},
	cancer: {
		title: "Cancer",
		mouseover:"Cancer prevalence among adults aged 18 or older",
		layerurl: "https://services2.arcgis.com/w4yiQqB14ZaAGzJq/arcgis/rest/services/HealthDisparitiesEJScreen/FeatureServer/2",
		type: "featurelayer",
		removable: true,
		opacity: "1",
		renderer: valrend("T_CANCER")
		//layers: [{ id: 3, title: "Cancer" }],
	},
	personswithdisabilities: {
		title: "Persons with Disabililties",
		mouseover:"Percent of all persons with disabilities",
		layerurl: "https://services2.arcgis.com/w4yiQqB14ZaAGzJq/arcgis/rest/services/HealthDisparitiesEJScreen/FeatureServer/4",
		type: "featurelayer",
		removable: true,
		opacity: "1",
		renderer: valrend("T_DISABILITYPCT ")
		//layers: [{ id: 4, title: "Persons with Disabililties" }],
	}
};



var serviceJSON = {
	//omit Toxic Releases
	//"eparegionalfacilities": { "description": "EPA Regulated Facilities", "type": "agsdynamic", "visible": false, "dynamic": false, "layerurl": prodRESTurl, "service": "EMEF/efpoints", "transparency": "0.8", "identify": "yes", "removable": false, "listlayer": [0,2,3,4,5,6], "defaultlayer": [-1], "position": 1 ,"imageName":"regulated-facility_16x16.png"},
	eparegionalfacilities: {
		description: "EPA Regulated Facilities",
		mouseover:"Facilities subject to EPA's environmental regulations",
		type: "agsdynamic",
		visible: true,
		dynamic: false,
		layerurl: prodRESTurl,
		service: "EMEF/efpoints",
		transparency: "0.8",
		identify: "yes",
		removable: false,
		listlayer: [0, 2, 3, 4, 5, 6],
		defaultlayer: [-1],
		position: 1,
		imageName: "regulated-facility_16x16.png",
		//not using efpoints for mapper, use same fac layers in service for report.
		layergroup: {
			epafacs: {
				description: "EPA Regulated Facilities",
				mouseover:"Facilities subject to EPA's environmental regulations",
				type: "agsdynamic",
				visible: false,
				dynamic: false,
				layerurl: prodRESTurl,
				service: "EMEF/efpoints",
				transparency: "0.8",
				identify: "yes",
				removable: false,
				listlayer: [0, 2, 3, 4, 5],
				defaultlayer: [-1],
				position: 1,
				imageName: "regulated-facility_16x16.png",
			},
			trifacs: {
				description: "Toxics Release Inventory",
				type: "featurelayer",
				visible: false,
				dynamic: true,
				layerurl:
					"https://awsgispub.epa.gov/arcgis/rest/services/OCSPP/TRI_Reporting_Facilities/MapServer/0",
				service: "",
				transparency: "0.8",
				removable: false,
				defaultlayer: [-1],
				position: 5,
				imageName: "regulated-facility_16x16.png",
			},
			cdrfacs:{
				description: "Chemical Data Reporting (CDR)",
				type: "featurelayer",
				visible: false,
				dynamic: true,
				layerurl:
					"https://gispub.epa.gov/arcgis/rest/services/OCSPP/CDR_Sites/MapServer/0",
				service: "",
				transparency: "0.8",
				removable: false,
				defaultlayer: [-1],
				position: 5,
				imageName: "regulated-facility_16x16.png",
			}
		},
	},
	otherenv: {
		description: "Other Environmental Data",
		mouseover:"Additional environmental information",
		type: "agsdynamic",
		visible: false,
		dynamic: true,
		layerurl: localRESTurl,
		service: "",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 5,
		imageName: "environment_16x16.png",
	},
	communitylandmarks: {
		description: "Community Landmarks",
		mouseover:"Community Landmarks",
		type: "agsdynamic",
		visible: false,
		dynamic: true,
		layerurl: localRESTurl,
		service: "",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 5,
		imageName: "chapel_16x16.png",
	},
	
	tribalcat: {
		description: "Tribal Lands & Indigenous Areas",
		mouseover:"Tribal and indigenous related layers",
		type: "featurelayer",
		visible: false,
		dynamic: true,
		layerurl: "",
		service: "",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 3,
		imageName: "tribal-symbols_16x16.png",
	},
	

	colonias: {
		description: "Colonias",
		mouseover:"Unincorporated, low-income developments along the Mexico–United States border",
		type: "featurelayer",
		visible: true,
		dynamic: true,
		layerurl: "",
		service: "",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 5,
		imageName: "colonias_16x16.png",
	},
	justice40iracat: {
		description: "Designated Disadvantaged Communities",
		mouseover:"Justice40 & EPA IRA Disadvantaged communites",
		type: "featurelayer",
		visible: false,
		dynamic: true,
		layerurl: "",
		service: "",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 5,
		imageName: "crowd_16x16.png",
	},	
};

//used for populating climate data in side by side maps
var climateServices_SBS={
	floodrisk:{
		description: "Flood Risk",
		mouseover:"Flood Risk",
		type: "agsdynamic",
		visible: false,
		dynamic: false,
		layerurl: "localRESTurl",
		service: "ejscreen/climate",
		transparency: "1",
		
		removable: false,
		defaultlayer: [-1],
		position: 5,
		listlayer: [0, 1],
		imageName: "chapel_16x16.png",
	},
	firerisk:{
		description: "Wildfire Risk",
		mouseover:"Wildfire Risk",
		type: "agsdynamic",
		visible: false,
		dynamic: false,
		layerurl: localRESTurl,
		service: "ejscreen/climate",
		transparency: "1",
		removable: false,
		defaultlayer: [-1],
		position: 5,
		listlayer: [2, 3],
		imageName: "chapel_16x16.png",
	},
	floodplain: {
		description: "100 Year Floodplain",
		title: "100 Year Floodplain",
		mouseover:"Estimated 100-year floodplains ",
		visible: false,
		dynamic: true,
		layerurl: "https://enviroatlas.epa.gov/arcgis/rest/services/",
		service: "Supplemental/Estimated_floodplain_CONUS_WM",
		type: "agsimagery",
		removable: true,
		opacity: "0.8",
		transparency: "1",
		removable: false,
		defaultlayer: [-1],
		position: 5,
		imageName: "chapel_16x16.png",
	},
	noaa:{
		description: "Sea Level Rise",
		mouseover:"Sea Level Rise",
		type: "agstile",
		visible: false,
		dynamic: true,
		layerurl: "https://www.coast.noaa.gov/arcgis/rest/services/dc_slr/",
		service: "",
		transparency: "1",
		removable: false,
		defaultlayer: [-1],
		position: 5,
		
	
	},
   heatindex: {
		description: "Extreme Heat",
		mouseover:"Extreme Heat",
		type: "featurelayer",
		visible: false,
		dynamic: true,
		layerurl: "https://services.arcgis.com/cJ9YHowT8TU7DUyn/arcgis/rest/services/EJScreen_Heat_Index/FeatureServer/1",		
		service: "",
		transparency: "1",
		removable: false,
		defaultlayer: [-1],
		position: 5,
		renderer: {
			type: "class-breaks", // autocasts as new ClassBreaksRenderer()
			field: "Max_Days_Above_90",
			//normalizationField: "EDUCBASECY",
			legendOptions: {
			  title: "Max Days Above 90"
			},
			defaultSymbol: {
			  type: "simple-fill", // autocasts as new SimpleFillSymbol()
			  color: "black",
			  style: "backward-diagonal",
			  outline: {
				width: 0.2,
				color: [105, 105, 105, 0.5]
			  }
			},
			defaultLabel: "Data Not Available",
			classBreakInfos: [
			  {
				minValue: 0,
				maxValue: 20,
				symbol: {
					type: "simple-fill", // autocasts as new SimpleFillSymbol()
					color: "#fed976",
					style: "solid",
					outline: {
					  width: 0.2,
					  color: [105, 105, 105, 0.5]
					}
				  },
				label: "< 20"
			  },
			  {
				minValue: 21,
				maxValue: 39,
				symbol: {
					type: "simple-fill", // autocasts as new SimpleFillSymbol()
					color: "#feb24c",
					style: "solid",
					outline: {
					  width: 0.2,
					   color: [105, 105, 105, 0.5]
					}
				  },
				label: "> 20 - 40"
			  },
			  {
				minValue: 40,
				maxValue: 59,
				symbol: {
					type: "simple-fill", // autocasts as new SimpleFillSymbol()
					color: "#fd8d3c",
					style: "solid",
					outline: {
					  width: 0.2,
					   color: [105, 105, 105, 0.5]
					}
				  },
				label: "> 40 - 60"
			  },
			  {
				minValue: 60,
				maxValue: 79,
				symbol: {
					type: "simple-fill", // autocasts as new SimpleFillSymbol()
					color: "#fc4e2a",
					style: "solid",
					outline: {
					  width: 0.2,
					  color: [105, 105, 105, 0.5]
					}
				  },
				label: "> 60 - 80"
			  },
			  {
				minValue: 80,
				maxValue: 99,
				symbol: {
					type: "simple-fill", // autocasts as new SimpleFillSymbol()
					color: "#e31a1c",
					style: "solid",
					outline: {
					  width: 0.2,
					   color: [105, 105, 105, 0.5]
					}
				  },
				label: "> 80 - 100"
			  },
			  {
				minValue: 100,
				maxValue: 207,
				symbol: {
					type: "simple-fill", // autocasts as new SimpleFillSymbol()
					color: "#b10026",
					style: "solid",
					outline: {
					  width: 0.2,
					   color: [105, 105, 105, 0.5]
					}
				  },
				label: "> 100 - 207"
			  }
			]
		  }
		
	}

}
//service json for Side By Side map used in MapMore widget
//similar to serviceJSON but reconfigured for different layer ordering and nesting
var serviceJSON_SBS = {
	//omit Toxic Releases
	//"eparegionalfacilities": { "description": "EPA Regulated Facilities", "type": "agsdynamic", "visible": false, "dynamic": false, "layerurl": prodRESTurl, "service": "EMEF/efpoints", "transparency": "0.8", "identify": "yes", "removable": false, "listlayer": [0,2,3,4,5,6], "defaultlayer": [-1], "position": 1 ,"imageName":"regulated-facility_16x16.png"},
	eparegionalfacilities: {
		description: "EPA Regulated Facilities",
		mouseover:"Facilities subject to EPA's environmental regulations",
		type: "agsdynamic",
		visible: false,
		dynamic: false,
		layerurl: prodRESTurl,
		service: "EMEF/efpoints",
		transparency: "0.8",
		identify: "yes",
		removable: false,
		listlayer: [0, 2, 3, 4, 5],
		defaultlayer: [-1],
		position: 1,
		imageName: "regulated-facility_16x16.png",
		// layergroup: {
		// 	epafacs: {
		// 		description: "EPA Regulated Facilities",
		// 		type: "agsdynamic",
		// 		visible: false,
		// 		dynamic: false,
		// 		layerurl: prodRESTurl,
		// 		service: "EMEF/efpoints",
		// 		transparency: "0.8",
		// 		identify: "yes",
		// 		removable: false,
		// 		listlayer: [0, 2, 3, 4, 5, 6],
		// 		defaultlayer: [-1],
		// 		position: 1,
		// 		imageName: "regulated-facility_16x16.png",
		// 	},
		// 	trifacs: {
		// 		description: "Toxics Release Inventory",
		// 		type: "featurelayer",
		// 		visible: false,
		// 		dynamic: true,
		// 		layerurl:
		// 			"https://awsgispub.epa.gov/arcgis/rest/services/OCSPP/TRI_Reporting_Facilities/MapServer/0",
		// 		service: "",
		// 		transparency: "0.8",
		// 		removable: false,
		// 		defaultlayer: [-1],
		// 		position: 5,
		// 		imageName: "regulated-facility_16x16.png",
		// 	},
		// },
	},
		trifacs: {
				description: "Toxics Release Inventory",
				type: "featurelayer",
				visible: false,
				dynamic: true,
				layerurl:
					"https://awsgispub.epa.gov/arcgis/rest/services/OCSPP/TRI_Reporting_Facilities/MapServer/0",
				service: "",
				transparency: "0.8",
				removable: false,
				defaultlayer: [-1],
				position: 5,
				imageName: "regulated-facility_16x16.png",
			},
				cdrfacs:{
				description: "Chemical Data Reporting (CDR)",
				type: "featurelayer",
				visible: false,
				dynamic: true,
				layerurl:
					"https://gispub.epa.gov/arcgis/rest/services/OCSPP/CDR_Sites/MapServer/0",
				service: "",
				transparency: "0.8",
				removable: false,
				defaultlayer: [-1],
				position: 5,
				imageName: "regulated-facility_16x16.png",
			},
	
	// pschool: {
	// 	description: "Schools",
	// 	mouseover:"Public, elementary and secondary schools",
	// 	type: "featurelayer",
	// 	visible: false,
	// 	dynamic: true,
	// 	layerurl:
	// 		"https://ejscreen.epa.gov/arcgis/rest/services/ejscreen/nces_schools/MapServer/0",
	// 	service: "",
	// 	transparency: "0.8",
	// 	removable: false,
	// 	defaultlayer: [-1],
	// 	position: 5,
	// 	imageName: "school-building _16x16.png",
	// },
	// pworship: {
	// 	description: "Places of Worship",
	// 	mouseover:"Buildings used for religious worship",
	// 	type: "featurelayer",
	// 	visible: false,
	// 	dynamic: true,
	// 	layerurl: prodRESTurl + "NEPAssist/Places/MapServer/2",
	// 	service: "",
	// 	transparency: "0.8",
	// 	removable: false,
	// 	defaultlayer: [-1],
	// 	position: 5,
	// 	imageName: "chapel_16x16.png",
	// },
	// phospital: {
	// 	description: "Hospitals",
	// 	mouseover:"Hospital buildings ",
	// 	type: "featurelayer",
	// 	visible: false,
	// 	dynamic: true,
	// 	layerurl: prodRESTurl + "NEPAssist/Places/MapServer/3",
	// 	service: "",
	// 	transparency: "0.8",
	// 	removable: false,
	// 	defaultlayer: [-1],
	// 	position: 5,
	// 	imageName: "hospital-3_16x16.png",
	// },
	// padusowner: {
	// 	description: "Parks",
	// 	mouseover:"Parks information broken down by managing agency",
	// 	type: "agsdynamic",
	// 	visible: false,
	// 	dynamic: true,
	// 	layerurl: "https://gis1.usgs.gov/arcgis/rest/services/",
	// 	service: "padus3/Manager_Name",
	// 	transparency: "0.8",
	// 	removable: false,
	// 	defaultlayer: [-1],
	// 	position: 6,
	// 	imageName: "nationalpark_16x16.png",
	// },
	otherenv: {
		description: "Other Environmental Data",
		mouseover:"Additional environmental information",
		type: "agsdynamic",
		visible: false,
		dynamic: true,
		layerurl: prodRESTurl,
		service: "",
		transparency: "1",
		removable: false,
		defaultlayer: [-1],
		position: 5,
		imageName: "environment_16x16.png",
	},
	/*
	communitylandmarks: {
		description: "Community Landmarks",
		mouseover:"Community Landmarks",
		type: "agsdynamic",
		visible: false,
		dynamic: true,
		layerurl: localRESTurl,
		service: "",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 5,
		imageName: "chapel_16x16.png",
	},
		criticalservices: {
		description: "Crtitical Service Gaps",
		mouseover:"Crtitical Service Gaps",
		type: "agsdynamic",
		visible: false,
		dynamic: true,
		layerurl: localRESTurl ,
		service: "ejscreen/critical_service",
		transparency: "1",
		removable: false,
		defaultlayer: [-1],
		listlayer: [0, 1, 2, 3, 4],
		position: 5,
		imageName: "chapel_16x16.png",
	},
	healthdisparities: {
		description: "Health Disparities",
		mouseover:"Health Disparities",
		type: "agsdynamic",
		visible: false,
		dynamic: true,
		layerurl: localRESTurl ,
		service: "ejscreen/health",
		transparency: "1",
		removable: false,
		defaultlayer: [-1],
		listlayer: [0, 1, 2, 3, 4],
		position: 5,
		imageName: "chapel_16x16.png",
	},
	climateservices:{
		description: "Climate Change",
		mouseover:"Climate Change",
		type: "agsdynamic",
		visible: false,
		dynamic: true,
		layerurl: prodRESTurl,
		service: "",
		transparency: "1",
		removable: false,
		defaultlayer: [-1],
		position: 6,	
		imageName: "chapel_16x16.png",
	}, */
	//"ejtribal": { "description": "Tribal Lands", "type": "agsdynamic", "visible": false, "dynamic": true, "layerurl": prodRESTurl, "service": "EMEF/tribal", "transparency": "0.8", "identify": "yes", "removable": false, "defaultlayer": [-1], "position": 3,"imageName":"tribal-symbols_16x16.png" },
	// tribalcat: {
	// 	description: "Tribal Lands & Indigenous Areas",
	// 	mouseover:"Tribal and indigenous related layers",
	// 	type: "featurelayer",
	// 	visible: false,
	// 	dynamic: true,
	// 	layerurl: "",
	// 	service: "",
	// 	transparency: "0.8",
	// 	removable: false,
	// 	defaultlayer: [-1],
	// 	position: 3,
	// 	imageName: "tribal-symbols_16x16.png",
	// },
	// prison: {
	// 	description: "Prisons",
	// 	mouseover:"Secure detention facilities",
	// 	type: "featurelayer",
	// 	visible: false,
	// 	dynamic: true,
	// 	layerurl:
	// 		"https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Prison_Boundaries/FeatureServer/0",
	// 	service: "",
	// 	transparency: "0.8",
	// 	removable: false,
	// 	defaultlayer: [-1],
	// 	position: 5,
	// 	imageName: "prison_16x16.png",
	// },
	// publichousing: {
	// 	description: "Public Housing",
	// 	mouseover:"HUD administered housing",
	// 	type: "featurelayer",
	// 	visible: false,
	// 	dynamic: true,
	// 	layerurl: "",
	// 	service: "",
	// 	transparency: "0.8",
	// 	removable: false,
	// 	defaultlayer: [-1],
	// 	position: 5,
	// 	imageName: "apartment_16x16.png",
	// },
	colonias: {
		description: "Colonias",
		mouseover:"Unincorporated, low-income developments along the Mexico–United States border",
		type: "featurelayer",
		visible: true,
		dynamic: true,
		layerurl: "",
		service: "",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 5,
		imageName: "colonias_16x16.png",
	},
	
	justice40:{
		description: "Justice40 (CEJST)",
		mouseover:"Communities identified as disadvantaged by CEQ for purposes of Justice40",
		type: "featurelayer",
		visible: false,
		//dynamic: true,
		layerurl: "https://services.arcgis.com/EXyRv0dqed53BmG2/arcgis/rest/services/CEJST_2/FeatureServer/1",
		//service: "",
		transparency: "0.8",
		removable: false,
		//defaultlayer: [-1],
		position: 5,
		imageName: "justice40_16x16.png"
		},
	tribe: {
		description: "Tribal Lands",
		mouseover:"American Indian Tribal lands in the lower 48 states and Alaska",
		type: "agsdynamic",
		visible: true,
		dynamic: true,
		layerurl: prodRESTurl,
		service: "EMEF/Tribal",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		listlayer: [0, 1, 2, 3, 4],
		position: 1,
	},
	//"cession": { "description": "Tribal Cession Boundaries", "type": "agsdynamic", "visible": false, "dynamic": true, "layerurl": "https://apps.fs.usda.gov/arcx/rest/services/", "service": "EDW/EDW_TribalCessionLands_01", "transparency": "0.8", "removable": false, "layers":cessionLayers, "defaultlayer": [-1], "position": 2 },
	cession: {
		description: "Tribal Cession Boundaries",
		mouseover:"Lands tribes have ceded to the federal government",
		type: "featurelayer",
		visible: true,
		dynamic: true,
		layerurl:
			"https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_TribalCessionLands_01/MapServer/0",
		service: "",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 2,
	},
	//"indig": { "description": "Other Indigenous Lands", "type": "agsdynamic", "visible": false, "dynamic": false, "layerurl": "https://tigerweb.geo.census.gov/arcgis/rest/services/", "service": "TIGERweb/AIANNHA", "transparency": "0.8", "removable": false, "listlayer": [0, 4, 5, 8], "defaultlayer": [-1], "position": 2 }
	indig: {
		description: "Other Indigenous Areas",
		mouseover:"Indigenous areas and related layers",
		type: "agsdynamic",
		visible: true,
		dynamic: true,
		layerurl: "https://tigerweb.geo.census.gov/arcgis/rest/services/",
		service: "TIGERweb/AIANNHA",
		transparency: "0.8",
		removable: false,
		layers: indigSubLayers,
		///use listlayer for limiting list, dynamic layers object not implemented in Side by Side
		//list of id's to show, match what's in indigSubLayers object
		listlayer: [0, 4, 5, 8],
		defaultlayer: [-1],
		position: 2,
	},
   
		/* 6/22/23 temp disable IRA layer-->	
		/* 7/12/23 RW - add back -->	
			epairadisadvantagedcomm: {
		description: "EPA IRA Disadvantaged Communities",
		mouseover:"EPA IRA Disadvantaged Communities",
		type: "agsdynamic",
		visible: false,
		dynamic: true,
		layerurl: localRESTurl,
		service: "ejscreen/ejscreen_disadvantaged",
		transparency: "0.8",
		removable: false,
		//layers: indigSubLayers,
		///use listlayer for limiting list, dynamic layers object not implemented in Side by Side
		//list of id's to show, match what's in indigSubLayers object
		listlayer: [0, 1, 2, 3],
		defaultlayer: [-1],
		position: 6,
	},*/
			epairadisadvantaged: { //side by side entry
				description: "EPA IRA Disadvantaged Communities 1.0",
				type: "featurelayer",
				visible: false,
				//dynamic: true,
				layerurl: "https://services.arcgis.com/EXyRv0dqed53BmG2/arcgis/rest/services/EPA_IRA_Disadvantaged_Communities_1/FeatureServer/2",
					//localRESTurl + "ejscreen/EPA_IRA_Disadvantaged_Communities/MapServer/0",
					//localRESTurl + "ejscreen/ejscreen_disadvantaged_1/MapServer/0",
				//service: "",
				transparency: "0.5",
				removable: false,
				defaultlayer: [-1],
				position: 6,
				
			},
			epairadisadvantaged2: { //side by side entry
				description: "EPA IRA Disadvantaged Communities 2.0",
				type: "featurelayer",
				visible: false,
				//dynamic: true,
				layerurl: "https://services.arcgis.com/EXyRv0dqed53BmG2/arcgis/rest/services/EPA_IRA_Disadvantaged_Communities_2/FeatureServer/0",
				//service: "",
				transparency: "0.5",
				removable: false,
				defaultlayer: [-1],
				position: 7,
				
			},
			epairamerged: { //side by side entry
				description: "EPA Disadvantaged Community Environmental and Climate Justice Program",
				type: "featurelayer",
				visible: false,
				//dynamic: true,
				layerurl: "https://services.arcgis.com/EXyRv0dqed53BmG2/arcgis/rest/services/EPA_Environmental_and_Climate_Justice_Program/FeatureServer/0",
				//service: "",
				transparency: "0.5",
				removable: false,
				defaultlayer: [-1],
				position: 6,
				
			},
			/*ussupplgreater90: {
				description: "US Supplemental Indexes >= 90",
				type: "featurelayer",
				visible: false,
				dynamic: false,
				layerurl: localRESTurl + "ejscreen/ejscreen_disadvantaged/MapServer/1",					
				service: "",
				transparency: "0.5",
				// identify: "yes",
				removable: false,
				defaultlayer: [-1],
				position: 6,
			},
			
			statesupplgreater90: {
				description: "State Supplemental Indexes >= 90",
				type: "featurelayer",
				visible: false,
				dynamic: false,
				layerurl: localRESTurl + "ejscreen/ejscreen_disadvantaged/MapServer/2",					
				service: "",
				transparency: "0.5",
				// identify: "yes",
				removable: false,
				defaultlayer: [-1],
				position: 6,
			},*/
		/* indianamericanres: {
				description: "State American Indian Reservations",
				type: "featurelayer",
				visible: false,
				dynamic: true,
				layerurl:
					"https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/AIANNHA/MapServer/4",
				service: "",
				transparency: "0.8",
				removable: false,
				defaultlayer: [-1],
				position: 6,
				
			}, */
			/*hawaiianhomelands: {
				description: "Hawaiian Homelands",
				type: "featurelayer",
				visible: false,
				dynamic: true,
				layerurl:localRESTurl+"ejscreen/ejscreen_disadvantaged/MapServer/4",
				service: "",
				transparency: "0.8",
				removable: false,
				defaultlayer: [-1],
				position: 8,
				
			}*/

};


var noaaJSONData = {
	"noaa": {
            "title": "Sea Level Rise",
            "mouseover": "Land at risk of permanent flooding when sea level rises between 1 - 6 feet",
            "isfolder": true,
            "services": {
                "usslr1": {
                    "title": "1ft Sea Level Rise",
                    "layerurl": "https://www.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_1ft/MapServer",
                    "type": "agstile",
                    "removable": true,
                    "opacity": "0.8",
                    "mouseover": "slrMouseOverTxt"
                },
                "usslr2": {
                    "title": "2ft Sea Level Rise",
                    "layerurl": "https://www.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_2ft/MapServer",
                    "type": "agstile",
                    "removable": true,
                    "opacity": "0.8"
                },
                "usslr3": {
                    "title": "3ft Sea Level Rise",
                    "layerurl": "https://www.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_3ft/MapServer",
                    "type": "agstile",
                    "removable": true,
                    "opacity": "0.8"
                },
                "usslr4": {
                    "title": "4ft Sea Level Rise",
                    "layerurl": "https://www.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_4ft/MapServer",
                    "type": "agstile",
                    "removable": true,
                    "opacity": "0.8"
                },
                "usslr5": {
                    "title": "5ft Sea Level Rise",
                    "layerurl": "https://www.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_5ft/MapServer",
                    "type": "agstile",
                    "removable": true,
                    "opacity": "0.8"
                },
                "usslr6": {
                    "title": "6ft Sea Level Rise",
                    "layerurl": "https://www.coast.noaa.gov/arcgis/rest/services/dc_slr/slr_6ft/MapServer",
                    "type": "agstile",
                    "removable": true,
                    "opacity": "0.8"
                }
            }
        }
	
}

//END ServiceJSON_SBS


//for sublayers, dynamic=false uses listlayers and array syntax ([1,2,3]), dynamic=true uses layers and json syntax for layer index ([{"id": 0,"title":"Title for TOC"}])
var otherEnvironmentalDataJSON = {
	pfacilities: {
		description: "Facilities Compliance Status",
		mouseover:"Facilities Compliance Status",
		type: "agsdynamic",
		visible: true,
		dynamic: true,
		layerurl:"https://echogeo.epa.gov/arcgis/rest/services/",
		service: "ECHO/Facilities",
		transparency: "1",
		removable: false,
		defaultlayer: [-1],
		listlayer: [0, 1, 2, 3],
		position: 2,
		imageName: "ncfaclilities_16x16.png",
	},
	  ejairtoxics:{
		description: "Air Toxics Cancer Risk",
		mouseover:"Air Toxics Cancer Risk",
		type: "featurelayer",
		visible: true,
		dynamic: true,
		layerurl: "https://services.arcgis.com/cJ9YHowT8TU7DUyn/arcgis/rest/services/Cancer_Risk_2020/FeatureServer/0",
		service: "",
		transparency: "1",
		removable: false,
		defaultlayer: [-1],
		position: 3,
		imageName: "ncfaclilities_16x16.png",
       
	},
	
	ejnonatt: {
		description: "Nonattainment Areas",
		mouseover:"Areas that don't meet NAAQS standards",
		type: "agsdynamic",
		visible: true,
		dynamic: true,
		layerurl: "https://gispub.epa.gov/arcgis/rest/services/",
		service: "OAR_OAQPS/NonattainmentAreas",
		transparency: "1",
		removable: false,
		defaultlayer: [-1],
		position: 3,		
		layers: [{ id: 11, title: "NO2 (1971 Standard)" }, { id: 10, title: "Ozone 1-hr (1979 standard-revoked)" }, { id: 9, title: "CO (1971 Standard)" }, { id: 8, title: "PM10 (1987 standard)" }, { id: 7, title: "PM2.5 Annual (2012 standard)" }, { id: 6, title: "PM2.5 Annual (1997 standard)" }, { id: 5, title: "PM2.5 24hr (2006 standard)" }, { id: 4, title: "SO2 1-hr (2010 standard)" }, { id: 3, title: "Lead (2008 standard)" }, { id: 2, title: "Ozone 8-hr (2015 Standard)" },{ id: 1, title: "Ozone 8-hr (2008 standard)" },{ id: 0, title: "Ozone 8-hr (1997 standard)" }]
	},
	
   
	ejrsei: {
		description: "RSEI Score",
		mouseover:"Risk-Screening Environmental Indicators model",
		type: "agsdynamic",
		visible: true,
		dynamic: true,				
		layerurl: prodRESTurl,
		service: "EMEF/RSEI_Score_2021",
		transparency: "1",
		removable: true,
		defaultlayer: [-1],
		position: 4,
		layers: [{ id: 0, title: "RSEI Score" }],
	},
	
	ejwater: {
		description: "Water Features",
		mouseover:"Water related layers",
		type: "agsdynamic",
		visible: true,
		dynamic: true,
		layerurl: prodRESTurl,
		service: "NEPAssist/Water",
		transparency: "1",
		identify: "yes",
		removable: false,
		//listlayer: [0, 1, 2, 3, 4, 5, 6, 7],
		defaultlayer: [3],
		position: 5,
		layers: [{ id: 9, title: "Wild and Scenic Rivers" ,visible: false,},
		            { id: 8, title: "Watersheds (HUC8)",visible: false, },
					{ id: 7, title: "Watersheds (HUC12)",visible: false, },
					{ id: 5, title: "Water Bodies" ,visible: false,},
					{ id: 4, title: "Streams" ,visible: false,},
					{ id: 6, title: "Sole Source Aquifers",visible: false, },
					{ id: 2, title: "Impaired Waterbodies",visible: false, },
					{ id: 0, title: "Impaired Water Points",visible: false, },
					{ id: 1, title: "Impaired Streams",visible: false, },
					{ id: 3, title: "Catchments (ATTAINS)",visible: true, },
	              ]
	},

	/*waterwells: {
		description: "Private Drinking Water Wells",
		mouseover:"Water related layers",
		type: "agsdynamic",
		visible: true,
		dynamic: true,			
		layerurl: "https://geodata.epa.gov/arcgis/rest/services/",
		service: "ORD/PrivateDomesticWells2020",
		transparency: "0.8",
		identify: "yes",
		removable: false,
		//  listlayer: [1,2,3,4,5,6,7,8,9,10,11,12],
		transparency: "0.8",
		
		defaultlayer: [-1],
		position: 6,
		 layers: [
		  //{ id: 10, visible:false ,title: "Change in Housing Units on Wells 1990-2020"},
	       { id: 7,  visible:true ,title: "% Population Served" },
	      //{ id: 4,  visible:false ,title: "Wells per Sq. Km."},
		  //{ id: 1,  visible:true ,title: "Wells" }
	     ],
	},*/
	// waterwells: {
		// description: "Private Drinking Water Wells",
		// mouseover:"Water related layers",
		// type: "featurelayer",
		// visible: true,
		// dynamic: true,			
		// layerurl: "https://geodata.epa.gov/arcgis/rest/services/ORD/PrivateDomesticWells2020/MapServer/8",
		// service: "",
		// transparency: "0.8",
		// identify: "yes",
		// removable: false,
		// //  listlayer: [1,2,3,4,5,6,7,8,9,10,11,12],
		// transparency: "0.8",
		
		// defaultlayer: [-1],
		// position: 6,
	
	// },
	waterwells: {
		description: "Private Drinking Water Wells",
		mouseover:"Private Drinking Water Wells",
		type: "agsdynamic",
		visible: true,
		dynamic: true,			
		layerurl: "https://geodata.epa.gov/arcgis/rest/services/",
		service: "ORD/PrivateDomesticWells2020",
		transparency: "1",
		identify: "yes",
		removable: false,
		//  listlayer: [1,2,3,4,5,6,7,8,9,10,11,12],
		transparency: "0.8",
		
		defaultlayer: [-1],
		position: 6,
	    layers: [
		  //{ id: 10, visible:false ,title: "Change in Housing Units on Wells 1990-2020"},
	       { id: 8,  visible:true ,title: "% Well Use - 2020" },
	      //{ id: 4,  visible:false ,title: "Wells per Sq. Km."},
		  //{ id: 1,  visible:true ,title: "Wells" }
	     ],
	},
	
	dwatersvcareas: {
		description: "Drinking Water Service Areas",
		mouseover:"Drinking Water Service Areas",
		type: "featurelayer",
		visible: true,
		dynamic: true,			
		layerurl: "https://services.arcgis.com/EXyRv0dqed53BmG2/arcgis/rest/services/Drinking_Water_Service_Areas/FeatureServer/0",
		service: "",
		transparency: "1",
		identify: "yes",
		removable: false,
		defaultlayer: [-1],
		position: 6,
	  
	},
	
	

	
	ejgrants: {
		description: "EJ Grants",
		mouseover:"EJ Grants",
		type: "agsdynamic",
		visible: true,
		dynamic: true,
		layerurl: prodRESTurl,
		service: "EMEF/EJgrants",
		transparency: "1",
		identify: "yes",
		removable: false,
		defaultlayer: [-1],
		position: 7,
		layers: [
			{ id: 0,  visible:true ,title: "EJ Grants" }
			]
	},
	
};

var communityLandmarksJSON = {
	
	pschool: {
		description: "Schools",
		mouseover:"Public, elementary and secondary schools",
		type: "featurelayer",
		visible: true,
		dynamic: true,
		layerurl:
			"https://services.arcgis.com/EXyRv0dqed53BmG2/arcgis/rest/services/US_Schools/FeatureServer/0",
		service: "",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 5,
		imageName: "school-building _16x16.png",
	},
	phospital: {
		description: "Hospitals",
		mouseover:"Hospital buildings ",
		type: "featurelayer",
		visible: true,
		dynamic: true,
		layerurl: prodRESTurl + "NEPAssist/Places/MapServer/3",
		service: "",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 5,
		imageName: "hospital-3_16x16.png",
	},
	pworship: {
		description: "Places of Worship",
		mouseover:"Buildings used for religious worship",
		type: "featurelayer",
		visible: true,
		dynamic: true,
		layerurl: prodRESTurl + "NEPAssist/Places/MapServer/2",
		service: "",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 5,
		imageName: "chapel_16x16.png",
	},
	padusowner: {
		description: "Parks",
		mouseover:"Parks information broken down by managing agency",
		type: "featurelayer",
		visible: true,
		dynamic: true,
		//layerurl: "https://gis1.usgs.gov/arcgis/rest/services/padus3/Manager_Name/MapServer/0",
		//layerurl: "https://gis1.usgs.gov/arcgis/rest/services/",
		//service: "padus3/Manager_Name",
		layerurl: "https://services.arcgis.com/v01gqwM5QqNysAAi/ArcGIS/rest/services/Manager_Name_PADUS/FeatureServer/0",
		service: "",																										   			  
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 6,
		imageName: "nationalpark_16x16.png",
		//layers: [{ id: 0, visible:true ,title: "Protected Areas Database of the United States (PAD-US) v3.0"}]
	},
	prison: {
		description: "Prisons",
		mouseover:"Secure detention facilities",
		type: "featurelayer",
		visible: true,
		dynamic: true,
		layerurl:
			"https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Prison_Boundaries/FeatureServer/0",
		service: "",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 5,
		imageName: "prison_16x16.png",
	},
	phouse: {
		description: "Public Housing",
		mouseover:"HUD public housing development buildings",
		type: "featurelayer",
		visible: true,
		dynamic: true,
		layerurl:"https://services.arcgis.com/VTyQ9soqVukalItT/ArcGIS/rest/services/Public_Housing_Buildings/FeatureServer/0",
			//"https://services.arcgis.com/VTyQ9soqVukalItT/arcgis/rest/services/Public_Housing_Buildings/FeatureServer/10",
			
		service: "",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 1,
	},
	shouse: {
		description: "Subsidized Housing",
		mouseover:"HUD Multifamily Housing",
		type: "featurelayer",
		visible: true,
		dynamic: true,
		layerurl:"https://services.arcgis.com/VTyQ9soqVukalItT/ArcGIS/rest/services/MULTIFAMILY_PROPERTIES_ASSISTED/FeatureServer/0",
			//"https://services.arcgis.com/VTyQ9soqVukalItT/arcgis/rest/services/Multifamily_Properties_Assisted/FeatureServer/13",
		service: "",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 2,
	},
	// publichousing: {
	// 	description: "Public Housing",
	// 	mouseover:"HUD administered housing",
	// 	type: "featurelayer",
	// 	visible: true,
	// 	dynamic: true,
	// 	layerurl: "",
	// 	service: "",
	// 	transparency: "0.8",
	// 	removable: false,
	// 	defaultlayer: [-1],
	// 	position: 5,
	// 	imageName: "apartment_16x16.png",
	// }
};
var boundariesJSON = {
	ejbnd: {
		description: "Boundaries",
		mouseover:"Overlay boundaries",
		type: "agsdynamic",
		visible: false,
		dynamic: true,
		layerurl: prodRESTurl,
		service: "NEPAssist/Boundaries",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 1,
		imageName: "apartment_16x16.png",
	},
};

var publicHousingJSON = {
	phouse: {
		description: "Public Housing",
		mouseover:"HUD public housing development buildings",
		type: "featurelayer",
		visible: true,
		dynamic: true,
		layerurl:"https://services.arcgis.com/VTyQ9soqVukalItT/ArcGIS/rest/services/Public_Housing_Buildings/FeatureServer/0",
			//"https://services.arcgis.com/VTyQ9soqVukalItT/arcgis/rest/services/Public_Housing_Buildings/FeatureServer/10",
			
		service: "",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 1,
	},
	shouse: {
		description: "Subsidized Housing",
		mouseover:"HUD Multifamily Housing",
		type: "featurelayer",
		visible: true,
		dynamic: true,
		layerurl: "https://services.arcgis.com/VTyQ9soqVukalItT/ArcGIS/rest/services/MULTIFAMILY_PROPERTIES_ASSISTED/FeatureServer/0",
			//"https://services.arcgis.com/VTyQ9soqVukalItT/arcgis/rest/services/Multifamily_Properties_Assisted/FeatureServer/13",
		service: "",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 2,
	},
};

var coloniasJSON = {
	coloniashud: {
		description: "Colonias Communities (HUD)",
		mouseover:"HUD defined colonias",
		type: "featurelayer",
		visible: true,
		dynamic: true,
		layerurl:
			"https://services.arcgis.com/VTyQ9soqVukalItT/arcgis/rest/services/COLONIAS_COMMUNITIES/FeatureServer/2",
		service: "",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 2,
	},
	coloniastx: {
		description: "TX State Colonias",
		mouseover:"Texas identified colonias",
		type: "featurelayer",
		visible: true,
		dynamic: true,
		layerurl:
			"https://services6.arcgis.com/7G1motYN1Sr4Rh2E/arcgis/rest/services/Colonias_OAG_TX_2020/FeatureServer/0",
		service: "",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 2,
	},
	coloniasnm: {
		description: "NM State Colonias",
		mouseover:"New Mexico identified colonias",
		type: "featurelayer",
		visible: true,
		dynamic: true,
		layerurl:
			"https://services.arcgis.com/EXyRv0dqed53BmG2/arcgis/rest/services/New_Mexico_Colonias/FeatureServer/0",
		service: "",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 2,
	},
};

//config layer and labels for indig lands subset
var indigSubLayers = [
	{ id: 8, visible: false, title: "State-designated Tribal Statistical Areas" },
	{ id: 5, visible: false, title: "Hawaiian Native Home Lands" },
	{ id: 4, visible: false, title: "State-recognized Reservations" },
	{ id: 0, visible: false, title: "Alaska Native Regional Corporations" },
];

var cessionLayers = [{ id: 0, visible: false, title: "Cession Boundaries" }];
var justice40iraJSON ={
	justice40:{
	description: "Justice40 (CEJST)",
	mouseover:"Communities identified as disadvantaged by CEQ for purposes of Justice40",
	type: "featurelayer",
	visible: false,
	//dynamic: true,
	//for portallayer use id vs url, assumes arcgis portal for now
	layerurl: "https://services.arcgis.com/EXyRv0dqed53BmG2/arcgis/rest/services/CEJST_2/FeatureServer/1",
	//service: "",
	transparency: "0.8",
	removable: false,
	//defaultlayer: [-1],
	position: 5,
	imageName: "justice40_16x16.png"
	},
	/* 6/22/23 temp disable IRA Layer--> */
	/* 7/10/23 add back IRA Layer RW--> */
	iradisadvantaged: {
		description: "EPA IRA Disadvantaged Communities",
		mouseover:"EPA IRA Disadvantaged Communities",
		type: "featurelayer",
		visible: true,
		dynamic: true,
		layerurl:"",
		service: "",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		position: 6,
		imageName: "crowd_16x16.png",
        layergroup: {
			
			iradisadvantaged2: {
		description: "EPA IRA Data 2.0",
		mouseover:"EPA IRA Data 2.0",
		type: "featurelayer",
		visible: true,
		//dynamic: true,
		layerurl: "https://services.arcgis.com/EXyRv0dqed53BmG2/arcgis/rest/services/EPA_IRA_Disadvantaged_Communities_2/FeatureServer/0",		
		//service: "ejscreen/ejscreen_disadvantaged",
		transparency: "0.8",
		removable: false,
		//layers: indigSubLayers,
		///use listlayer for limiting list, dynamic layers object not implemented in Side by Side
		//list of id's to show, match what's in indigSubLayers object
		//listlayer: [0],
		//defaultlayer: [-1],
		position: 6,
		//layers: [{ id: 0, visible:true, title:'EPA IRA Disadvantaged Communities 2.0' }]
	},

			/* epairadisadvantaged: {
				description: "EPA IRA Disadvantaged Communities",
				type: "featurelayer",
				visible: false,
				dynamic: true,
				layerurl:
					//localRESTurl + "ejscreen/EPA_IRA_Disadvantaged_Communities/MapServer/0",
					localRESTurl + "ejscreen/ejscreen_disadvantaged/MapServer/0",
				service: "",
				transparency: "0.25",
				removable: false,
				defaultlayer: [-1],
				position: 6,
				
			}, */
			//DT - 07/31/2024 removed it from EPA IRA Disadvantaged			
			/*ussupplgreater90: {
				//description: "US Supplemental Indexes >= 90",
				description: "US Supp Index >= 90", //change to match layer name in service
				type: "featurelayer",
				visible: false,
				dynamic: false,
				layerurl: localRESTurl + "ejscreen/ejscreen_disadvantaged/MapServer/1",					
				service: "",
				transparency: "0.8",
				// identify: "yes",
				removable: false,
				defaultlayer: [-1],
				position: 6,
			},
			
			statesupplgreater90: {
				//description: "State Supplemental Indexes >= 90",
				description: "State Supp Index >= 90",
				type: "featurelayer",
				visible: false,
				dynamic: false,
				layerurl: localRESTurl + "ejscreen/ejscreen_disadvantaged/MapServer/2",					
				service: "",
				transparency: "0.8",
				// identify: "yes",
				removable: false,
				defaultlayer: [-1],
				position: 6,
			},*/


			/* indianamericanres: {
				description: "State American Indian Reservations",
				type: "featurelayer",
				visible: false,
				dynamic: true,
				layerurl:
					"https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/AIANNHA/MapServer/4",
				service: "",
				transparency: "0.8",
				removable: false,
				defaultlayer: [-1],
				position: 6,
				
			}, */
			/*justice40ira: {
				description: "Justice40 (CEJST)",
				mouseover:"Communities identified as disadvantaged by CEQ for purposes of Justice40",
				type: "portallayer",
				visible: false, //does not work, add new below
				dynamic: true,
				//for portallayer use id vs url, assumes arcgis portal for now
				//"f95344889cab44bd84207052f44cb940" //public
				layerurl:
					"f95344889cab44bd84207052f44cb940",
				service: "",
				transparency: "0.8",
				removable: false,
				defaultlayer: [-1],
				position: 6,
				definitionExpression : "SN_C = 1", //NOTE RW 7/13/23 - added to remove all but Disadvantaged from IRA,
				visiblebydefault:false 
				//imageName: "justice40_16x16.png"
				
		
			},*/
			//DT - 07/31/2024 removed it from EPA IRA Disadvantaged									  
			/*emeftribal: { //RW - dded back to IRA 7/15/24
				description: "Tribal Lands",
				type: "agsdynamic",
				visible: false,
				dynamic: true,
				layerurl: localRESTurl,					
				service: "EMEF/Tribal",
				//service:"ejscreen/Tribal_2023",
				transparency: "0.8",
				identify: "yes",
				removable: false,
				//listlayer: [0, 1, 2, 3, 4], //note 7/11/23 RW - removed VA tribes when show IRA layer
				defaultlayer: [-1],
				position: 7,
				layers: [{ id: 4, title: "Oklahoma Tribal Statistical Areas" ,visible:false},
				{ id: 3, title: "Off-reservation Trust Lands",visible:false },
				{ id: 2, title: "American Indian Reservations" ,visible:false},
				{ id: 1, title: "Alaska Native Villages" ,visible:false},
				{ id: 0, title: "Alaska Native Allotments" ,visible:false},
			  ],
				//layers: [{ id: 0, visible:false },{ id: 1, visible:false },{ id: 2, visible:false },{ id: 3, visible:false },{ id: 4, visible:false },{ id: 5, visible:false }]
			},*/
			epairadisadvantagedcomm: {
		description: "EPA IRA Data 1.0",
		mouseover:"EPA IRA Data 1.0",
		type: "featurelayer",
		visible: false,
		//dynamic: true,
		layerurl: "https://services.arcgis.com/EXyRv0dqed53BmG2/arcgis/rest/services/EPA_IRA_Disadvantaged_Communities_1/FeatureServer/2",
		//service: "ejscreen/ejscreen_disadvantaged_1",
		//service: "ejscreen/ejscreen_disadvantaged",
		transparency: "0.8",
		removable: false,
		//layers: indigSubLayers,
		///use listlayer for limiting list, dynamic layers object not implemented in Side by Side
		//list of id's to show, match what's in indigSubLayers object
		//listlayer: [0],
		//defaultlayer: [-1],
		position: 6,
		//layers: [{ id: 0, visible:true, title:'EPA IRA Disadvantaged Communities 1.0' }]
	},
	epairamerged: {
				description: "EPA Disadvantaged Community Environmental and Climate Justice Program",
				//description: "EPA Disadvantaged Community Environmental and Climate Justice Program
				mouseover:"EPA Disadvantaged Community Environmental and Climate Justice Program",
				type: "featurelayer",
				visible: false,
				//dynamic: true,
				layerurl: "https://services.arcgis.com/EXyRv0dqed53BmG2/arcgis/rest/services/EPA_Environmental_and_Climate_Justice_Program/FeatureServer/0",
				transparency: "0.8",
				removable: false,
				
				//defaultlayer: [-1],
				position: 6,
				//layers: [{ id: 0, visible:true, title:'EPA Disadvantaged Community Environmental and Climate Justice Program' }]
						
		
			},																					 
			
			/* hawaiianhomelands: {
				description: "Hawaiian Homelands",
				type: "featurelayer",
				visible: false,
				dynamic: true,
				layerurl:localRESTurl+"ejscreen/ejscreen_disadvantaged/MapServer/3",
				service: "",
				transparency: "0.8",
				removable: false,
				defaultlayer: [-1],
				position: 8,
				
			} */
				
		},
	}
};


var tribalJSON = {
	//"tribe": { "description": "Tribal Lands", "type": "agsdynamic", "visible": false, "dynamic": true, "layerurl": prodRESTurl, "service": "EMEF/tribal", "transparency": "0.8", "removable": false, "defaultlayer": [-1], "position": 1 },
	tribe: {
		description: "Tribal Lands",
		mouseover:"American Indian Tribal lands in the lower 48 states and Alaska",
		type: "agsdynamic",
		visible: true,
		dynamic: true,
		layerurl: prodRESTurl,
		service: "EMEF/Tribal",
		transparency: "0.8",
		removable: false,
		defaultlayer: [-1],
		layers: [{ id: 4, title: "Oklahoma Tribal Statistical Areas" ,visible:true},
		          { id: 3, title: "Off-reservation Trust Lands",visible:true },
				  { id: 2, title: "American Indian Reservations" ,visible:true},
				  { id: 1, title: "Alaska Native Villages" ,visible:true},
				  { id: 0, title: "Alaska Native Allotments" ,visible:true},
				],
		position: 1,
	},
	//"cession": { "description": "Tribal Cession Boundaries", "type": "agsdynamic", "visible": false, "dynamic": true, "layerurl": "https://apps.fs.usda.gov/arcx/rest/services/", "service": "EDW/EDW_TribalCessionLands_01", "transparency": "0.8", "removable": false, "layers":cessionLayers, "defaultlayer": [-1], "position": 2 },
	cession: {
		description: "Tribal Cession Boundaries",
		mouseover:"Lands tribes have ceded to the federal government",
		type: "featurelayer",
		visible: true,
		dynamic: true,
		layerurl:
			"https://apps.fs.usda.gov/arcx/rest/services/EDW/EDW_TribalCessionLands_01/MapServer/0",
		service: "",
		transparency: "0.8",
		removable: true,
		defaultlayer: [-1],
		position: 2,
	},
	//"indig": { "description": "Other Indigenous Lands", "type": "agsdynamic", "visible": false, "dynamic": false, "layerurl": "https://tigerweb.geo.census.gov/arcgis/rest/services/", "service": "TIGERweb/AIANNHA", "transparency": "0.8", "removable": false, "listlayer": [0, 4, 5, 8], "defaultlayer": [-1], "position": 2 }
	indig: {
		description: "Other Indigenous Areas",
		mouseover:"Indigenous areas and related layers",
		type: "agsdynamic",
		visible: false,
		dynamic: true,
		layerurl: "https://tigerweb.geo.census.gov/arcgis/rest/services/",
		service: "TIGERweb/AIANNHA",
		transparency: "0.8",
		removable: false,
		layers: indigSubLayers,
		defaultlayer: [-1],
		position: 2,
	},
};
//var dwmapurl = localRESTurl + "ejscreen/census2020acs/MapServer";
//var dwmapurl = localRESTurl + "ejscreen/census2021acs/MapServer";
var dwmapurl = "https://services.arcgis.com/EXyRv0dqed53BmG2/arcgis/rest/services/EJScreen_Census/FeatureServer";

// FOR API
var typelookup = {
	blockgroup: {
		description: "Blockgroup",
		note: "Please enter a 12-digit census block group ID (example: 060750229021) or click on the map to select a census block group",
		url: dwmapurl,
		layer: "1",
		idfield: "STCNTRBG",
		namefield: "STCNTRBG",
		displayfield: ["STCNTRBG"],
		regstr: /^(\d{12}, {0,}){0,}\d{12}$/,
		placeholder: "Enter a census block group ID",
	},
	tract: {
		description: "Tract",
		note: "Please enter a 11-digit census tract ID (example: 06075022902) or click on the map to select a census tract",
		url: dwmapurl,
		layer: "5",
		idfield: "STCNTR",
		namefield: "STCNTR",
		displayfield: ["STCNTR"],
		regstr: /^(\d{11}, {0,}){0,}\d{11}$/,
		placeholder: "Enter a census tract ID",
	},
	/* city: {
		description: "City",
		note: "Please enter a 7-digit Place code (example: 5168000) or click on the map to select a city",
		url: ejscreenservice,
		layer: "31",
		idfield: "PLFIPS",
		namefield: "NAME",
		displayfield: ["PLFIPS", "NAME"],
		regstr: /^(\d{7}, {0,}){0,}\d{7}$/,
		placeholder: "Enter a city name or place code",
	}, */
	county: {
		description: "County",
		note: "Please enter a county name and state abbreviation and select a desired entry from the suggestion list (example: Arlington County, VA)",
		url: dwmapurl,
		layer: "0",
		idfield: "STCN",
		namefield: "CNTYNAME",
		displayfield: ["STCN", "CNTYNAME"],
		regstr: /^(\d{5}, {0,}){0,}\d{5}$/,
		placeholder: "Enter County name or FIPS",
	},
};

//JSON template that gets filled by lookup table call. ID fields come from lookup table.
//Header and footer fields can be added to add common fields before or after the unique set of fields for each variable
//If footer fields are added, the name in this config is used instead of the field Alias on ID popup
//TBD the alias fix has not been added to header fields only footer fields which are used by ejscreen variables
//8-30-22, added usefooteralias, if true uses alias set in footfields object, else uses alias from service.

//if footer fields are configured they will be used in EJ popups, add fields to skip footers here.
//RW 4/24/24 - moved to config and added disability. 

var footerSkipAryConfig = ["T_PEOPCOLORPCT","T_OVER64PCT","T_UNDER5PCT","T_LESSHSPCT","T_LINGISOPCT","T_LOWINCPCT","T_DEMOGIDX_2","T_DEMOGIDX_5","T_UNEMPPCT","T_DISABILITYPCT"];


var dynamicJSON = {
	ejscreen: {
		description: "EJ Indexes",
		headerfields: {},
		footerfields: { "T_LOWINCPCT": "Low Income","T_PEOPCOLORPCT": "People of Color" },
		usefooteralias: false,
		titlefields: { "ID": "FIPS", "CNTY_NAME": "County", "ST_ABBREV": "State", "STATE_NAME":"State Name","ACSTOTPOP": "Population" }
	},
	ejscreen_supp: {
		description: "EJ Indexes Supplementary",
		headerfields: {},
		usefooteralias: true,
		footerfields: { "T_LOWINCPCT": "Low Income","T_LIFEEXPPCT": "Low Life Expectancy","T_DISABILITYPCT": "Persons with Disabilities","T_LESSHSPCT": "Less Than High School Education","T_LINGISOPCT": "Limited English Speaking" },		
		titlefields: { "ID": "FIPS", "CNTY_NAME": "County", "ST_ABBREV": "State", "STATE_NAME":"State Name", "ACSTOTPOP": "Population" }
	},
	//"ejscreen_multi": { "description": "EJ Indexes Multi", "headerfields": { "EXCEED_COUNT": "EXCEED_COUNT"} },
	ejscreen_multi: {
		description: "EJ Indexes Multi",
		headerfields: {},
		footerfields: {},
		usefooteralias: true,
		titlefields: {}
	},
	ejdemog_1: {
		description: "2014-2018 ACS demographics by Blockgroup", //should be 2018-2022???
		headerfields: {
			STCNTRBG: "Blockgroup ID",
			STUSAB: "State",
			TOTALPOP: "Total Population",
		},
		footerfields: {},
		usefooteralias: true,
		titlefields: {}
	},
	ejdemog_5: {
		description: "2014-2018 ACS demographics by Tract",
		headerfields: {
			STCNTR: "Tract ID",
			STUSAB: "State",
			TOTALPOP: "Total Population",
		},
		footerfields: {},
		usefooteralias: true,
		titlefields: {}
	},
	ejdemog_0: {
		description: "2014-2018 ACS demographics by County",
		headerfields: {
			CNTYNAME: "County Name",
			STUSAB: "State",
			STCN: "County FIPS",
			TOTALPOP: "Total Population",
		},
		footerfields: {},
		usefooteralias: true,
		titlefields: {}
	},
	ejdemog_2: {
		description: "2014-2018 ACS demographics by State",
		headerfields: { STATE_NAME: "State", TOTALPOP: "Total Population" },
		footerfields: {},
		usefooteralias: true,
		titlefields: {}
	},
	census2010_0: {
		description: "2010 demographics by Block",
		headerfields: {
			STCNTRBLK: "Block ID",
			STATE: "State",
			TOTALPOP: "Total Population",
		},
		footerfields: {},
		usefooteralias: true,
		titlefields: {}
	},
	census2010_1: {
		description: "2010 demographics by Blockgroup",
		headerfields: {
			GEOID10: "Blockgroup ID",
			STATE: "State",
			TOTALPOP: "Total Population",
		},
		footerfields: {},
		usefooteralias: true,
		titlefields: {}
	},
	census2010_2: {
		description: "2010 demographics by Tract",
		headerfields: {
			GEOID10: "Tract ID",
			STATE: "State",
			TOTALPOP: "Total Population",
		},
		footerfields: {},
		usefooteralias: true,
		titlefields: {}
	},
	census2010_3: {
		description: "2010 demographics by County",
		headerfields: {
			STCN: "County FIPS",
			STATE: "State",
			TOTALPOP: "Total Population",
		},
		footerfields: {},
		usefooteralias: true,
		titlefields: {}
	},
	census2010_4: {
		description: "2010 demographics by State",
		headerfields: { STATE: "State", TOTALPOP: "Total Population" },
		footerfields: {},
		usefooteralias: true,
		titlefields: {}
	},
	census2k_0: {
		description: "2000 demographics by Blockgroup",
		headerfields: {
			STCNTRBG: "Blockgroup ID",
			STATE: "State",
			TOTALPOP: "Total Population",
		},
		footerfields: {},
		usefooteralias: true,
		titlefields: {}
	},
	census2k_1: {
		description: "2000 demographics by Tract",
		headerfields: {
			STCNTR: "Tract ID",
			STATE: "State",
			TOTALPOP: "Total Population",
		},
		footerfields: {},
		usefooteralias: true,
		titlefields: {}
	},
	census2k_2: {
		description: "2000 demographics by County",
		headerfields: {
			STCN: "County FIPS",
			STUSAB: "State",
			TOTALPOP: "Total Population",
		},
		footerfields: {},
		usefooteralias: true,
		titlefields: {}
	},
	census2k_3: {
		description: "2000 demographics by State",
		headerfields: { STUSAB: "State", TOTALPOP: "Total Population" },
		footerfields: {},
		usefooteralias: true,
		titlefields: {}
	},
	threshold: {
		description: "Threshold Maps",
		headerfields: {},
		footerfields: {},
		usefooteralias: true,
		titlefields: {ID: "ID" , ST_ABBREV: "State"}
		//titlefields: {ID: "ID" , ST_ABBREV: "State", CNTY_NAME: "County"} //add this if county added to Exceedance layer
	},
	health: {
		description: "Health",
		headerfields: {},
		footerfields: {},
		usefooteralias: false,
		titlefields: {}

	}
};

var ejIdentifyJSON = {};
var ejlayoutJSON = {
	Primary: {
		services: {			
			"nation":{"url": ejscreenservice, "index" : 0, "titleSuffix" : "National Percentiles"}, 
			"state":{"url": ejscreenservice_state, "index" : 0, "titleSuffix" : "State Percentiles"}
		},		
		status: false,
		description: "Primary EJ Indexes",
		defaultfield: "B_D2_PM25",
		items: {
			P_ENV: {
				description: "Environmental Burden Indicators",
				tocLabel: "Environmental Burden Indicators",
				mouseover: "Environmental and pollution related maps",
				selected: false,
				metalink: glossaryurl + "#poll",
				columns: {},
			},
			P_DEM: {
				description: "Socioeconomic Indicators",
				tocLabel: "Socioeconomic Indicators",
				mouseover: "Maps of socioeconomic data",
				selected: false,
				metalink: glossaryurl + "#soci",
				columns: {},
			},
			P_EJ2: {
				description: "Environmental Justice Indexes",
				tocLabel: "EJ Indexes",
				mouseover:
					"Maps combining a single environmental indicator with the demographic index",
				selected: true,
				metalink: glossaryurl + "#ejin",
				columns: {},
			},
			
			
			P_MUL: {
				description: "Areas of Concern",
				tocLabel: "Areas of Concern",
				mouseover: "Areas of Concern",
				selected: false,
				metalink: glossaryurl + "#category-areas-of-concern",
				columns: {
					B_95: {
						description: "Over 95th Percentile",
						legendtitle: "Over 95th Percentile",
						txtname: "T_95",
						idfldname:
							"EXCEED_COUNT,T_D2_PM25,T_D2_OZONE,T_D2_DSLPM,T_D2_CANCER,T_D2_RESP,T_D2_RSEI_AIR,T_D2_LDPNT,T_D2_PTRAF,T_D2_PNPL,T_D2_PRMP,T_D2_PTSDF,T_D2_PWDIS,ID,ST_ABBREV",
						cat: "P_MUL",
						hovertext:
							"Areas where at least one EJ index is at or above the 95th percentile",
						category: "P_MUL",
					},
					B_90: {
						description: "Over 90th Percentile",
						legendtitle: "Over 90th Percentile",
						txtname: "T_90",
						idfldname:
						"EXCEED_COUNT,T_D2_PM25,T_D2_OZONE,T_D2_DSLPM,T_D2_CANCER,T_D2_RESP,T_D2_RSEI_AIR,T_D2_LDPNT,T_D2_PTRAF,T_D2_PNPL,T_D2_PRMP,T_D2_PTSDF,T_D2_PWDIS,ID,ST_ABBREV",
						cat: "P_MUL",
						hovertext:
							"Areas where at least one EJ index is at or above the 90th percentile",
						category: "P_MUL",
					},
					B_80: {
						description: "Over 80th Percentile",
						legendtitle: "Over 80th Percentile",
						txtname: "T_95",
						idfldname:
						"EXCEED_COUNT,T_D2_PM25,T_D2_OZONE,T_D2_DSLPM,T_D2_CANCER,T_D2_RESP,T_D2_LDPNT,T_D2_RSEI_AIR,T_D2_PTRAF,T_D2_PNPL,T_D2_PRMP,T_D2_PTSDF,T_D2_PWDIS,ID,ST_ABBREV",
						cat: "P_MUL",
						hovertext:
							"Areas where at least one EJ index is at or above the 80th percentile",
						category: "P_MUL",
					},
					B_75: {
						description: "Over 75th Percentile",
						legendtitle: "Over 75th Percentile",
						txtname: "T_95",
						idfldname:
						"EXCEED_COUNT,T_D2_PM25,T_D2_OZONE,T_D2_DSLPM,T_D2_CANCER,T_D2_RESP,T_D2_LDPNT,T_D2_PTRAF,T_D2_RSEI_AIR,T_D2_PNPL,T_D2_PRMP,T_D2_PTSDF,T_D2_PWDIS,ID,ST_ABBREV",
						cat: "P_MUL",
						hovertext:
							"Areas where at least one EJ index is at or above the 75th percentile",
						category: "P_MUL",
					},
				},
			},
		},
		accordionDiv: "primaryaccord",
	},
	Supplementary: {
		services: {
			"nation":{"url": ejscreenservice, "index" : 0, "titleSuffix" : "National Percentiles"},
			"state":{"url": ejscreenservice_state, "index" : 0, "titleSuffix" : "State Percentiles"}
		},		
		status: false,
		description: "Supplemental Indexes",
		defaultfield: "B_D5_PM25",
		items: {
			P_EJ5: {
				description: "Supplemental Indexes",
				tocLabel: "Supplemental Indexes",
				mouseover:
					"Maps combining a single environmental indictor with the supplemental demographic index",
				selected: true,
				metalink: glossaryurl + "#supp",
				columns: {},
			}			
		},
		accordionDiv: "primaryaccord",
	},
	Alternatives: {
		status: false,
		description: "Supplementary EJ Indexes",
		defaultfield: "B_PM25_D6",
		items: {
			A_PEJ6: {
				description: "EJ Index with supplementary demographic index",
				metalink: glossaryurl + "#category-alt",
				columns: {},
			},
			A1_2: {
				description: "Supplementary EJ Index 1 with demographic index",
				metalink: glossaryurl + "#category-alt1",
				columns: {},
			},
			A1_6: {
				description:
					"Supplementary EJ Index 1 with supplementary demographic index",
				metalink: glossaryurl + "#category-alt2",
				columns: {},
			},
			A2_2: {
				description: "Supplementary EJ Index 2 with demographic index",
				metalink: glossaryurl + "#category-alt3",
				columns: {},
			},
			A2_6: {
				description:
					"Supplementary EJ Index 2 with supplementary demographic index",
				metalink: glossaryurl + "#category-alt4",
				columns: {},
			},
		},
		accordionDiv: "altaccord",
	},
};

//Used for: order of fields in Explore Reports. Entry must be here for field to show and FIELD_NAME must match item key.
var dataobj = {	
	
	ID: {
		description: "Blockgroup ID",
		rawdata: "no",
		contenttype: "header",
	},
	ST_ABBREV: {
		description: "State Abbreviation",
		rawdata: "no",
		contenttype: "header",
	},
	STATE_NAME: {
		description: "State Name",
		rawdata: "no",
		contenttype: "header",
	},
	REGION: {
		description: "EPA Region number",
		rawdata: "no",
		contenttype: "header",
	},
	ACSTOTPOP: {
		description: "Total Population 2010",
		rawdata: "no",
		formatter: "2",
		contenttype: "header",
	},
	D2_PM25: {
		description: "Particulate Matter 2.5",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "PM25",
		rptname: "Particulate Matter 2.5 EJ Index",
		csvname: "Particulate Matter 2.5 EJ Index",
		isnata: false,
	},
	D2_OZONE: {
		description: "Ozone",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "O3",
		rptname: "Ozone EJ Index",
		csvname: "Ozone EJ Index",
		isnata: false,
	},
	D2_NO2: {
		description: "Nitrogen Dioxide",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "NO2",
		rptname: "Nitrogen Dioxide  (NO<sub>2</sub>) EJ Index*",
		csvname: "Nitrogen Dioxide EJ Index",
		isnata: false,
	},
	D2_DSLPM: {
		description: "Diesel Particulate Matter",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "DIESEL",
		rptname: "Diesel Particulate Matter EJ Index*",
		csvname: "Diesel Particulate Matter EJ Index",
		isnata: false,
	},
	// D2_CANCER: {
	// 	description: "Air Toxics Cancer Risk",
	// 	rawdata: "no",
	// 	contenttype: "P_EJ2",
	// 	pdfname: "CANCER",
	// 	rptname: "Air Toxics Cancer Risk EJ Index*",
	// 	csvname: "Air Toxics Cancer Risk EJ Index",
	// 	isnata: false,
	// },
	// D2_RESP: {
	// 	description: "Air Toxics Respiratory HI",
	// 	rawdata: "no",
	// 	contenttype: "P_EJ2",
	// 	pdfname: "RESP",
	// 	rptname: "Air Toxics Respiratory HI EJ Index*",
	// 	csvname: "Air Toxics Respiratory HI EJ Index",
	// 	isnata: false,
	// },
	D2_RSEI_AIR: {
		description: "Toxic Releases to Air",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "RSEI_AIR",
		rptname: "Toxic Releases to Air EJ Index",
		csvname: "Toxic Releases to Air EJ Index",
		isnata: false,
	},
	D2_PTRAF: {
		description: "Traffic Proximity",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "TRAFFIC",
		rptname: "Traffic Proximity EJ Index",
		csvname: "Traffic Proximity EJ Index",
		isnata: false,
	},
	D2_LDPNT: {
		description: "Lead Paint",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "LEAD",
		rptname: "Lead Paint EJ Index",
		csvname: "Lead Paint EJ Index",
		isnata: false,
	},
	D2_PNPL: {
		description: "Superfund Proximity",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "NPL",
		rptname: "Superfund Proximity EJ Index",
		csvname: "Superfund Proximity EJ Index",
		isnata: false,
	},
	D2_PRMP: {
		description: "RMP Facility Proximity",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "RMP",
		rptname: "RMP Facility Proximity EJ Index",
		csvname: "RMP Facility Proximity EJ Index",
		isnata: false,
	},
	D2_PTSDF: {
		description: "Hazardous Waste Proximity",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "TSDF",
		rptname: "Hazardous Waste Proximity EJ Index",
		csvname: "Hazardous Waste Proximity EJ Index",
		isnata: false,
	},
	D2_UST: {
		description: "Underground Storage Tanks",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "UST",
		rptname: "Underground Storage Tanks EJ Index",
		csvname: "Underground Storage Tanks EJ Index",
		isnata: false,
	},
	D2_PWDIS: {
		description: "Wastewater Discharge",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "NPDES",
		rptname: "Wastewater Discharge EJ Index",
		csvname: "Wastewater Discharge EJ Index",
		isnata: false,
	},
	D2_DWATER: {
			description: "Drinking Water Non-Compliance",
			rawdata: "no",
			contenttype: "P_EJ2",
			pdfname: "DWATER",
			rptname: "Drinking Water Non-Compliance EJ Index",
			csvname: "Drinking Water Non-Compliance EJ Index",
			isnata: false,
		},

	PM25: {
		description: "Particulate Matter 2.5",
		rawdata: "yes",
		formatter: "3",
		contenttype: "P_ENV",
		pdfname: "PM25",
		rptname:
			"Particulate Matter 2.5 (<span style='font-size:80%'>&#181;g/m<sup>3</sup></span>)",
		csvname: "Particulate Matter 2.5 (ug/m3)",
		isnata: false,
	},
	OZONE: {
		description: "Ozone",
		rawdata: "yes",
		formatter: "3",
		contenttype: "P_ENV",
		pdfname: "O3",
		rptname: "Ozone (<span style='font-size:80%'>ppb</span>)",
		csvname: "Ozone (ppb)",
		isnata: false,
	},
	NO2: {
		description: "Nitrogen Dioxide",
		rawdata: "yes",
		formatter: "3",
		contenttype: "P_ENV",
		pdfname: "NO2",
		rptname: "Nitrogen Dioxide (<span style='font-size:80%'>NO<sub>2</sub></span>) (<span style='font-size:80%'>ppbv</span>)",
		csvname: "Nitrogen Dioxide",
		isnata: false,
	},
	DSLPM: {
		description: "Diesel Particulate Matter",
		rawdata: "yes",
		formatter: "3",
		contenttype: "P_ENV",
		pdfname: "DIESEL",
		isnata: true,
		rptname:
			"Diesel Particulate Matter* (<span style='font-size:80%'>&#181;g/m<sup>3</sup></span>)",
		csvname: "Diesel Particulate Matter (ug/m3)",
	},
	// CANCER: {
	// 	description: "Cancer Risk",
	// 	rawdata: "yes",
	// 	formatter: "2",
	// 	contenttype: "P_ENV",
	// 	pdfname: "CANCER",
	// 	isnata: true,
	// 	rptname:
	// 		"Air Toxics Cancer Risk* (<span style='font-size:80%'>lifetime risk per million</span>)",
	// 	csvname: "Air Toxics Cancer Risk (risk per MM)",
	// },
	// RESP: {
	// 	description: "Respiratory Hazard Index",
	// 	rawdata: "yes",
	// 	formatter: "2",
	// 	contenttype: "P_ENV",
	// 	pdfname: "RESP",
	// 	isnata: true,
	// 	rptname: "Air Toxics Respiratory HI*",
	// 	csvname: "Air Toxics Respiratory HI",
	// },
	RSEI_AIR: {
		description: "Toxic Releases to Air",
		rawdata: "yes",
		formatter: "2",
		contenttype: "P_ENV",
		pdfname: "RSEI_AIR",
		isnata: true,
		rptname: "Toxic Releases to Air (<span style='font-size:80%'>toxicity-weighted concentration</span>)",
		csvname: "Toxic Releases to Air (toxicity-weighted concentration)",
	},
	PTRAF: {
		description: "Traffic Proximity",
		rawdata: "yes",
		formatter: "2",
		contenttype: "P_ENV",
		pdfname: "TRAFFIC",
		rptname:
			"Traffic Proximity (<span style='font-size:80%'>daily traffic count/distance to road</span>)",
		csvname: "Traffic Proximity (daily traffic count/distance to road)",
		isnata: false,
	},
	PRE1960PCT: {
		description: "Lead Paint",
		rawdata: "yes",
		formatter: "2",
		contenttype: "P_ENV",
		pdfname: "LEAD",
		rptname:
			"Lead Paint (<span style='font-size:80%'>% Pre-1960 Housing</span>)",
		csvname: "Lead Paint (% pre-1960s housing)",
		isnata: false,
	},
	PNPL: {
		description: "Superfund Proximity",
		rawdata: "yes",
		formatter: "2",
		contenttype: "P_ENV",
		pdfname: "NPL",
		rptname:
			"Superfund Proximity (<span style='font-size:80%'>site count/km distance</span>)",
		csvname: "Superfund Proximity (site count/km distance)",
		isnata: false,
	},
	PRMP: {
		description: "RMP Facility Proximity",
		rawdata: "yes",
		formatter: "2",
		contenttype: "P_ENV",
		pdfname: "RMP",
		rptname:
			"RMP Facility Proximity (<span style='font-size:80%'>facility count/km distance</span>)",
		csvname: "RMP Facility Proximity (facility count/km distance)",
		isnata: false,
	},
	PTSDF: {
		description: "Hazardous Waste Proximity",
		rawdata: "yes",
		formatter: "2",
		contenttype: "P_ENV",
		pdfname: "TSDF",
		rptname:
			"Hazardous Waste Proximity (<span style='font-size:80%'>facility count/km distance</span>)",
		csvname: "Hazardous Waste Proximity (facility count/km distance)",
		isnata: false,
	},
	UST: {
		description: "Underground Storage Tanks",
		rawdata: "yes",
		formatter: "2",
		contenttype: "P_ENV",
		pdfname: "UST",
		rptname:
			"Underground Storage Tanks (<span style='font-size:80%'>count/km<sup>2</sup></span>)",
		csvname: "Underground Storage Tanks",
		isnata: false,
	},
	PWDIS: {
		description: "Wastewater Discharge",
		rawdata: "yes",
		formatter: "2",
		contenttype: "P_ENV",
		pdfname: "NPDES",
		rptname:
			"Wastewater Discharge (<span style='font-size:80%'>toxicity-weighted concentration/m distance</span>)",
		csvname:
			"Wastewater Discharge (toxicity-weighted concentration/m distance)",
		isnata: false,
	},
	DWATER: {
		description: "Drinking Water Non-Compliance",
		rawdata: "yes",
		formatter: "2",
		contenttype: "P_ENV",
		pdfname: "DWATER",
		rptname:"Drinking Water Non-Compliance (<span style='font-size:80%'>points</span>)",
		csvname:"Drinking Water Non-Compliance (points)",
		isnata: false,
	},
	DEMOGIDX_2: {
		description: "Demographic Index USA",
		rawdata: "yes",
		formatter: "%",
		contenttype: "P_DEM",
		pdfname: "DEMOGIDX2",
		rptname: "Demographic Index USA",
		csvname: "Demographic Index USA",
		isnata: false,
	},
	DEMOGIDX_5: {
		description: "Supplemental Demographic Index USA",
		rawdata: "yes",
		formatter: "%",
		contenttype: "P_DEM",
		pdfname: "DEMOGIDX5",
		rptname: "Supplemental Demographic Index USA",
		csvname: "Supplemental Demographic Index USA",
		isnata: false
	
	},
	DEMOGIDX_2ST: {
		description: "Demographic Index State",
		rawdata: "yes",
		formatter: "%",
		contenttype: "P_DEM",
		pdfname: "DEMOGIDX2ST",
		rptname: "Demographic Index State",
		csvname: "Demographic Index State",
		isnata: false,
	},
	DEMOGIDX_5ST: {
		description: "Supplemental Demographic Index State",
		rawdata: "yes",
		formatter: "%",
		contenttype: "P_DEM",
		pdfname: "DEMOGIDX5ST",
		rptname: "Supplemental Demographic Index State",
		csvname: "Supplemental Demographic Index State",
		isnata: false
	
	},
	PEOPCOLORPCT: {
		description: "People of Color",
		rawdata: "yes",
		formatter: "%",
		contenttype: "P_DEM",
		pdfname: "PEOPCOLOR",
		rptname: "People of Color",
		csvname: "People of Color",
		isnata: false,
	},
	LOWINCPCT: {
		description: "Low Income",
		rawdata: "yes",
		formatter: "%",
		contenttype: "P_DEM",
		pdfname: "INCOME",
		rptname: "Low Income",
		csvname: "Low Income",
		isnata: false,
	},
	// DISABILITYPCT: {
		// description: "Persons with Disabilities",
		// rawdata: "yes",
		// formatter: "%",
		// contenttype: "P_DEM",
		// pdfname: "Persons with Disabilities",
		// rptname: "Persons with Disabilities",
		// csvname: "Persons with Disabilities",
		// isnata: false,
	// },
	UNEMPPCT: {
		description: "Unemployment Rate",
		rawdata: "yes",
		formatter: "%",
		contenttype: "P_DEM",
		pdfname: "UNEMPLOYED",
		rptname: "Unemployment Rate",
		csvname: "Unemployment Rate",
		isnata: false,
	},
	LINGISOPCT: {
		description: "Limited English Speaking",
		rawdata: "yes",
		formatter: "%",
		contenttype: "P_DEM",
		pdfname: "LING",
		rptname: "Limited English Speaking",
		csvname: "Limited English Speaking",
		isnata: false,
	},
	
	LESSHSPCT: {
		description: "Less Than High School Education",
		rawdata: "yes",
		formatter: "%",
		contenttype: "P_DEM",
		pdfname: "LESSHS",
		rptname: "Less Than High School Education",
		csvname: "Less Than High School Education",
		isnata: false,
	},
	UNDER5PCT: {
		description: "Under Age 5",
		rawdata: "yes",
		formatter: "%",
		contenttype: "P_DEM",
		pdfname: "UNDER5",
		rptname: "Under Age 5",
		csvname: "Under Age 5",
		isnata: false,
	},
	OVER64PCT: {
		description: "Over Age 64",
		rawdata: "yes",
		formatter: "%",
		contenttype: "P_DEM",
		pdfname: "OVER64",
		rptname: "Over Age 64",
		csvname: "Over Age 64",
		isnata: false,
	},
	// LIFEEXP: {
	// 	description: "Low Life Expectancy",
	// 	rawdata: "yes",
	// 	formatter: "%",
	// 	contenttype: "P_DEM",
	// 	pdfname: "LIFEEXP",
	// 	rptname: "Low Life Expectancy",
	// 	csvname: "Low Life Expectancy",
	// 	isnata: false
	
	// },
	D5_PM25: {
		description: "Particulate Matter 2.5",
		rawdata: "no",
		contenttype: "P_EJ5",
		pdfname: "PM25",
		rptname: "Particulate Matter 2.5 Supplemental Index",
		csvname: "Particulate Matter 2.5 Supplemental Index",
		isnata: false,
	},
	D5_OZONE: {
		description: "Ozone",
		rawdata: "no",
		contenttype: "P_EJ5",
		pdfname: "O3",
		rptname: "Ozone Supplemental Index",
		csvname: "Ozone Supplemental Index",
		isnata: false,
	},
	D5_NO2: {
		description: "Nitrogen Dioxide",
		rawdata: "no",
		contenttype: "P_EJ5",
		pdfname: "NO2",
		rptname: "Nitrogen Dioxide EJ Index*",
		csvname: "Nitrogen Dioxide EJ Index",
		isnata: false,
	},
	D5_DSLPM: {
		description: "Diesel Particulate Matter",
		rawdata: "no",
		contenttype: "P_EJ5",
		pdfname: "DIESEL",
		rptname: "Diesel Particulate Matter Supplemental Index*",
		csvname: "Diesel Particulate Matter Supplemental Index",
		isnata: false,
	},
	D5_CANCER: {
		description: "Air Toxics Cancer Risk",
		rawdata: "no",
		contenttype: "P_EJ5",
		pdfname: "CANCER",
		rptname: "Air Toxics Cancer Risk Supplemental Index*",
		csvname: "Air Toxics Cancer Risk Supplemental Index",
		isnata: false,
	},
	D5_RESP: {
		description: "Air Toxics Respiratory HI",
		rawdata: "no",
		contenttype: "P_EJ5",
		pdfname: "RESP",
		rptname: "Air Toxics Respiratory HI Supplemental Index*",
		csvname: "Air Toxics Respiratory HI Supplemental Index",
		isnata: false,
	},
	D5_RSEI_AIR : {
		description: "Toxic Releases to Air",
		rawdata: "no",
		contenttype: "P_EJ5",
		pdfname: "RSEI_AIR",
		rptname: "Supplemental Index for Toxic Releases to Air",
		csvname: "Supplemental Index for Toxic Releases to Air",
		isnata: false,
	},
	D5_PTRAF: {
		description: "Traffic Proximity",
		rawdata: "no",
		contenttype: "P_EJ5",
		pdfname: "TRAFFIC",
		rptname: "Traffic Proximity Supplemental Index",
		csvname: "Traffic Proximity Supplemental Index",
		isnata: false,
	},
	D5_LDPNT: {
		description: "Lead Paint",
		rawdata: "no",
		contenttype: "P_EJ5",
		pdfname: "LEAD",
		rptname: "Lead Paint Supplemental Index",
		csvname: "Lead Paint Supplemental Index",
		isnata: false,
	},
	D5_PNPL: {
		description: "Superfund Proximity",
		rawdata: "no",
		contenttype: "P_EJ5",
		pdfname: "NPL",
		rptname: "Superfund Proximity Supplemental Index",
		csvname: "Superfund Proximity Supplemental Index",
		isnata: false,
	},
	D5_PRMP: {
		description: "RMP Facility Proximity",
		rawdata: "no",
		contenttype: "P_EJ5",
		pdfname: "RMP",
		rptname: "RMP Facility Proximity Supplemental Index",
		csvname: "RMP Facility Proximity Supplemental Index",
		isnata: false,
	},
	D5_PTSDF: {
		description: "Hazardous Waste Proximity",
		rawdata: "no",
		contenttype: "P_EJ5",
		pdfname: "TSDF",
		rptname: "Hazardous Waste Proximity Supplemental Index",
		csvname: "Hazardous Waste Proximity Supplemental Index",
		isnata: false,
	},
	D5_UST: {
		description: "Underground Storage Tanks",
		rawdata: "no",
		contenttype: "P_EJ5",
		pdfname: "UST",
		rptname: "Underground Storage Tanks Supplemental Index",
		csvname: "Underground Storage Tanks Supplemental Index",
		isnata: false,
	},
	D5_PWDIS: {
		description: "Wastewater Discharge",
		rawdata: "no",
		contenttype: "P_EJ5",
		pdfname: "NPDES",
		rptname: "Wastewater Discharge Supplemental Index",
		csvname: "Wastewater Discharge Supplemental Index",
		isnata: false,
	},
	D5_DWATER: {
		description: "Drinking Water Non-Compliance",
		rawdata: "no",
		contenttype: "P_EJ5",
		pdfname: "WATER",
		rptname: "Drinking Water Supplemental Index",
		csvname: "Drinking Water Supplemental Index",
		isnata: false,
	},
};


//lookup data for SUPP indexes only

var dataobjSUPP = {		
	
	D_PM25_2: {
		description: "Particulate Matter 2.5",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "PM25",
		rptname: "Particulate Matter 2.5 Supplemental Index",
		csvname: "Particulate Matter 2.5 Supplemental Index",
		isnata: false,
	},
	D_OZONE_2: {
		description: "Ozone",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "O3",
		rptname: "Ozone Supplemental Index",
		csvname: "Ozone Supplemental Index",
		isnata: false,
	},
	D_DSLPM_2: {
		description: "Diesel Particulate Matter",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "DIESEL",
		rptname: "Diesel Particulate Matter Supplemental Index*",
		csvname: "Diesel Particulate Matter Supplemental Index",
		isnata: false,
	},
	D_CANCR_2: {
		description: "Air Toxics Cancer Risk",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "CANCER",
		rptname: "Air Toxics Cancer Risk Supplemental Index*",
		csvname: "Air Toxics Cancer Risk Supplemental Index",
		isnata: false,
	},
	D_RESP_2: {
		description: "Air Toxics Respiratory HI",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "RESP",
		rptname: "Air Toxics Respiratory HI Supplemental Index*",
		csvname: "Air Toxics Respiratory HI Supplemental Index",
		isnata: false,
	},
	D_PTRAF_2: {
		description: "Traffic Proximity",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "TRAFFIC",
		rptname: "Traffic Proximity Supplemental Index",
		csvname: "Traffic Proximity Supplemental Index",
		isnata: false,
	},
	D_LDPNT_2: {
		description: "Lead Paint",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "LEAD",
		rptname: "Lead Paint Supplemental Index",
		csvname: "Lead Paint Supplemental Index",
		isnata: false,
	},
	D_PNPL_2: {
		description: "Superfund Proximity",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "NPL",
		rptname: "Superfund Proximity Supplemental Index",
		csvname: "Superfund Proximity Supplemental Index",
		isnata: false,
	},
	D_PRMP_2: {
		description: "RMP Facility Proximity",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "RMP",
		rptname: "RMP Facility Proximity Supplemental Index",
		csvname: "RMP Facility Proximity Supplemental Index",
		isnata: false,
	},
	D_PTSDF_2: {
		description: "Hazardous Waste Proximity",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "TSDF",
		rptname: "Hazardous Waste Proximity Supplemental Index",
		csvname: "Hazardous Waste Proximity Supplemental Index",
		isnata: false,
	},
	D_UST_2: {
		description: "Underground Storage Tanks",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "UST",
		rptname: "Underground Storage Tanks Supplemental Index",
		csvname: "Underground Storage Tanks Supplemental Index",
		isnata: false,
	},
	D_PWDIS_2: {
		description: "Wastewater Discharge",
		rawdata: "no",
		contenttype: "P_EJ2",
		pdfname: "NPDES",
		rptname: "Wastewater Discharge Supplemental Index",
		csvname: "Wastewater Discharge Supplemental Index",
		isnata: false,
	}
};




//demog widget settings
var demogJSON = {
	ejdemog: {
		title: "2018-2022 ACS",
		tiptext: "2018-2022 ACS",
		dynamic: false,
		type: "agsdemog",
		"layerurl": "https://services.arcgis.com/EXyRv0dqed53BmG2/arcgis/rest/services/EJScreen_Census/",//replace with my feature service link
		service: "",
		lookupindex: 6,
		description:
			"2018-2022 ACS demographics are a set of variables derived based on a subset of 2018-2022 American Community Survey data.",
		process: false,
		transparency: "0.5",
		identify: "yes",
		filter: "yes",
		defaultCategory: "Population",
		defaultfield: "POP_DEN",
		baselayers: {
			bg: {
				minlevel: 10,
				maxlevel: 20,
				layeridx: 1,
				level: "2018-2022 ACS (Blockgroup)",
				headerfields: {
					STCNTRBG: "Blockgroup ID",
					STUSAB: "State",
					TOTALPOP: "Total Population",
				},
			},
			tr: {
				minlevel: 8,
				maxlevel: 10,
				layeridx: 5,
				level: "2018-2022 ACS (Tract)",
				headerfields: {
					STCNTR: "Tract ID",
					STUSAB: "State",
					TOTALPOP: "Total Population",
				},
			},
			cnty: {
				minlevel: 4,
				maxlevel: 8,
				layeridx: 0,
				level: "2018-2022 ACS (County)",
				headerfields: {
					CNTYNAME: "County Name",
					STUSAB: "State",
					STCN: "County FIPS",
					TOTALPOP: "Total Population",
				},
			},
			st: {
				minlevel: 0,
				maxlevel: 4,
				layeridx: 2,
				level: "2018-2022 ACS (State)",
				headerfields: { STATE_NAME: "State", TOTALPOP: "Total Population" },
			},
		},
		dynamiclayers: {},
	} //,
// RW 7/2/24 -removed 2010 from demog widget
/* 	census2010: {
		title: "2010 Census",
		tiptext: "2010 ACS",
		dynamic: false,
		type: "agsdemog",
		//layerurl: localRESTurl,
		layerurl: prodRESTurl,
		service: "ejscreen/census2010sf1",
		lookupindex: 5,
		description:
			"2010 Census contains a set of variables derived based on a subset of 2010 Census data.",
		process: false,
		transparency: "0.5",
		identify: "yes",
		filter: "yes",
		defaultCategory: "Population",
		defaultfield: "POP_DEN",
		baselayers: {
			blk: {
				minlevel: 16,
				maxlevel: 20,
				layeridx: 0,
				level: "2010 Census (Block)",
				headerfields: {
					STCNTRBLK: "Block ID",
					STATE: "State",
					TOTALPOP: "Total Population",
				},
			},
			bg: {
				minlevel: 10,
				maxlevel: 16,
				layeridx: 1,
				level: "2010 Census (Blockgroup)",
				headerfields: {
					GEOID10: "Blockgroup ID",
					STATE: "State",
					TOTALPOP: "Total Population",
				},
			},
			tr: {
				minlevel: 8,
				maxlevel: 10,
				layeridx: 2,
				level: "2010 Census (Tract)",
				headerfields: {
					GEOID10: "Tract ID",
					STATE: "State",
					TOTALPOP: "Total Population",
				},
			},
			cnty: {
				minlevel: 4,
				maxlevel: 8,
				layeridx: 3,
				level: "2010 Census (County)",
				headerfields: {
					STCN: "County FIPS",
					STATE: "State",
					TOTALPOP: "Total Population",
				},
			},
			st: {
				minlevel: 0,
				maxlevel: 4,
				layeridx: 4,
				level: "2010 Census (State)",
				headerfields: { STATE: "State", TOTALPOP: "Total Population" },
			},
		},
		dynamiclayers: {},
	}, */
};

//var sym0 = createSymbolHatch("#ffffff"); //hatch fill for no data
// var sym0 = createSymbol("#AAAAAA"); //hatch fill for no data
// var sym1 = createSymbol("#ffffb2");
// var sym2 = createSymbol("#fed976");
// var sym3 = createSymbol("#feb24c");
// var sym4 = createSymbol("#fd8d3c");
// var sym5 = createSymbol("#fc4e2a");
// var sym6 = createSymbol("#e31a1c");
// var sym7 = createSymbol("#b10026");

var sym0 = createSymbol("#AAAAAA"); //hatch fill for no data
var sym1 = createSymbol("#FFFFFF");
var sym2 = createSymbol("#FFF7BC");
var sym3 = createSymbol("#FED976");
var sym4 = createSymbol("#FD8D3C");
var sym5 = createSymbol("#BD0026");




// function createSymbol(color) {
	// return {
		// type: "simple-fill", // autocasts as new SimpleFillSymbol()
		// color: color,
		// outline: {
			// width: 0.0,
			// color: [255, 255, 255, 0.4],
		// },
		// style: "solid",	

		
	// };
// }

//RW new sym 5/23/24
function createSymbol(color) {
	
	var colorrgb = getRGBfromHex(color);
	
	var colorary = [];
	
	var r = parseInt(colorrgb.r);
	var g = parseInt(colorrgb.g);
	var b = parseInt(colorrgb.b);
	
	var colortrans = new Array;
	colortrans.push(r);
	colortrans.push(g);
	colortrans.push(b);
	//alert(color);
	if (color == '#FFFFFF'){
		colortrans.push(0.5);
	}else{
		colortrans.push(0.80);		
	}
	
	
	
	
	
	

	return {
		type: "simple-fill", // autocasts as new SimpleFillSymbol()
		//color: color,
		color: colortrans,
		outline: {
			width: 0.5,
			color: [0, 0, 0, 0.2],
		},
		style: "solid",	

		
	};
}

function getRGBfromHex (hex) {
	
	
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    // return {r, g, b} 
    return { r, g, b };

	
}

//title and default symbol for null values e.g. hash mark fill for no data. Overridden by classbreaks if has data
//Used in main map, side by side map, and mobile map.
var globalDefaultSymbol4PctilesLabel = "Data not available";
///hash fill for no data
// var globalDefaultSymbol4Pctiles = {
            // type: "simple-fill", // autocasts as new SimpleFillSymbol()
            // color: "black",
            // style: "backward-diagonal",
            // outline: {
              // width: 0.5,
              // color: [50, 50, 50, 0.6]
// }
// }

//RW  5/23/24 new sym
var globalDefaultSymbol4Pctiles = {
            type: "simple-fill", // autocasts as new SimpleFillSymbol()
            color: [0, 0, 0, 0.1],
            style: "backward-diagonal",
            outline: {
              width: 0.5,
              color: [0, 0, 0, 0.1]
}
}

//class breaks for EJ layers
// var globalClassBreaks4Pctiles = [
	// // {
	// // 	minValue: 0,
	// // 	maxValue: 0.5,
	// // 	symbol: sym0,
	// // 	label: "Data not available",
	// // },
	// // {
	// // 	minValue: 0.6,
	// // 	maxValue: 5.5,
	// // 	symbol: sym1,
	// // 	label: "Less than 50 percentile",
	// // },
	// {
		// minValue: 0,
		// maxValue: 5.5,
		// symbol: sym1,
		// label: "Less than 50 percentile",
	// },
	// {
		// minValue: 5.6,
		// maxValue: 6.5,
		// symbol: sym2,
		// label: "50 - 60 percentile",
	// },
	// {
		// minValue: 6.6,
		// maxValue: 7.5,
		// symbol: sym3,
		// label: "60 - 70 percentile",
	// },
	// {
		// minValue: 7.6,
		// maxValue: 8.5,
		// symbol: sym4,
		// label: "70 - 80 percentile",
	// },
	// {
		// minValue: 8.6,
		// maxValue: 9.5,
		// symbol: sym5,
		// label: "80 - 90 percentile",
	// },
	// {
		// minValue: 9.6,
		// maxValue: 10.5,
		// symbol: sym6,
		// label: "90 - 95 percentile",
	// },
	// {
		// minValue: 10.6,
		// maxValue: 11.5,
		// symbol: sym7,
		// label: "95 - 100 percentile",
	// },
// ];

var globalClassBreaks4Pctiles = [
	// {
	// 	minValue: 0,
	// 	maxValue: 0.5,
	// 	symbol: sym0,
	// 	label: "Data not available",
	// },
	// {
	// 	minValue: 0.6,
	// 	maxValue: 5.5,
	// 	symbol: sym1,
	// 	label: "Less than 50 percentile",
	// },
	{
		minValue: 0,
		maxValue: 5.5,
		symbol: sym1,
		label: "Less than 50 percentile",
	},
	{
		minValue: 5.6,
		maxValue: 8.5,
		symbol: sym2,
		label: "50 - 80 percentile",
	},
	// {
		// minValue: 6.6,
		// maxValue: 7.5,
		// symbol: sym3,
		// label: "60 - 70 percentile",
	// },
	// {
		// minValue: 7.6,
		// maxValue: 8.5,
		// symbol: sym4,
		// label: "70 - 80 percentile",
	// },
	{
		minValue: 8.6,
		maxValue: 9.5,
		symbol: sym3,
		label: "80 - 90 percentile",
	},
	{
		minValue: 9.6,
		maxValue: 10.5,
		symbol: sym4,
		label: "90 - 95 percentile",
	},
	{
		minValue: 10.6,
		maxValue: 11.5,
		symbol: sym5,
		label: "95 - 100 percentile",
	},
];


var toggledByButtons = [
	"measure",
	"saveSessions",
	"searchGeoPlatform",
	"printButtonDiv",
	"selectMultipleDiv",
	"moreDemographicMaps",
	"thresholdMaps",
	"addShapeFile",
	"addRemoteMaps",
	"envJusticeMaps",
	"envJusticeMapsSupp",
	"pollutionData",
	"demographicData",
	"healthDisparitiesData",
	"climateChangeData",
	"criticalData",
];

var subCategoryTabs = [
	"#ejIndexesSubCategories",
	"#ejIndexesSubCategoriesSupp",
	"#envIndicatorsSubCategories",
	"#demographicIndicatorsSubCategories",
	"#climateChangeDataCategories",
	"#criticalDataCategories",
	"#healthDisparitiesDataCategories",
];

//used by threshold widget, it can change every year
var divisorOfBlockGroup = 242335;