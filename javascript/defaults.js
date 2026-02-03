var defaults = {
  //The ID for the map from ArcGIS.com
  //webmap: "f5b13dbed07c46cdb783cf361833aa6b",
  webmap: "a174e2f6a6354455b5032d94525e9dbb",
  //webmap: "2321381de944459f958337b3cb4a3fe9",
  //Modify this to point to your sharing service URL if you are using the portal
  sharingurl: "https://www.arcgis.com", //for example: "http://www.arcgis.com",
  //The id for the web mapping application item that contains configuration info - in most
  ////When editing you need to specify a proxyurl (see below) if the service is on a different domain
  //Specify a proxy url if you will be editing, using the elevation profile or have secure services or web maps that are not shared with everyone.
  proxyurl: "proxy.ashx",
  //cases this will be null.
  appid: "",
  //set to true to display the title
  displaytitle: true,
  //Enter a title, if no title is specified, the webmap's title is used.
  title: "&nbsp;EJScreen<span style='font-size: 10pt;'>&nbsp;&nbsp; Environmental Justice Screening and Mapping Tool (" + versionText + ")</span>",
  //Enter a description for the application. This description will appear in the left pane
  //if no description is entered the webmap description will be used.
  description: "",
  //specify an owner for the app - used by the print option. The default value will be the web map's owner
  owner: '',
  //Specify a color theme for the app. Valid options are gray,blue,purple,green and orange
  theme: 'blue',
  //extent: '{"xmin":-122.46,"ymin":37.73,"xmax":-122.36,"ymax":37.77,"spatialReference":{"wkid":4326}}',
  //Optional tools - set to false to hide the tool
  //set to false to hide the zoom slider on the map
  displayslider: true,
  displaymeasure: true,
  displaybasemaps: true,
  displayoverviewmap: true,
  displayeditor: false,
  displaylegend: false,
  displaysearch: true,
  displaylayerlist: false,
  displaybookmarks: true,
  displaydetails: false,
  displaytimeslider: false,
  displayprint: false,
  displayprintlegend: false,
  displaysearchags: true,
  displayknownags: true,
  displaytoc: true,
  displaydemog: true,
  displayejmap: true,
  comparemap: true,
  displayejsite: true,
  displaysublayers: true,
  //i18n.viewer.main.scaleBarUnits,
  //The elevation tool uses the  measurement tool to draw the lines. So if this is set
  //to true then displaymeasure needs to be true too.
  displayelevation: false,
  //This option is used when the elevation chart is displayed to control what is displayed when users mouse over or touch the chart. When true, elevation gain/loss will be shown from the first location to the location under the cursor/finger.
  showelevationdifference: false,
  displayscalebar: true,
  displayshare: false,
  //Set to true to display the left panel on startup. The left panel can contain the legend, details and editor. Set to true to
  //hide left panel on initial startup. 2
  leftPanelVisibility: false,
  //If the webmap uses Bing Maps data, you will need to provide your Bing Maps Key
  bingmapskey: bingMapsKey,
  //Get the default map units
  //units: commonConfig.units, 
  //specify a group in ArcGIS.com that contains the basemaps to display in the basemap gallery
  //example: title:'ArcGIS Online Basemaps' , owner:esri
  basemapgroup: {
      title: "EPA Basemap",
      owner: "EPAGeoservices"
          //id: "472046c429254aa093dcb4953d09de0d"
  },
  //Enter the URL's to the geometry service, print task and geocode service. 
  //helperServices: commonConfig.helperServices,
  //Set the label in the nls file for your browsers language
  /*printlayouts: [{
    layout: 'Letter ANSI A Landscape',
    label: i18n.tools.print.layouts.label1,
    format: 'PDF'
  }, {
    layout: 'Letter ANSI A Portrait',
    label: i18n.tools.print.layouts.label2,
    format: 'PDF'
  }, {
    layout: 'Letter ANSI A Landscape',
    label: i18n.tools.print.layouts.label3,
    format: 'PNG32'
  }, {
    layout: 'Letter ANSI A Portrait',
    label: i18n.tools.print.layouts.label4,
    format: 'PNG32'
  }],
  printlayout: false,
  printformat: "PNG32",*/
  //Specify the geocoder options. By default uses the geocoder widget with the default locators. If you specify a url value then that locator will be used.
  placefinder: {
      "url": "",
      "countryCode": "",
      "currentExtent": false,
      "placeholder": "",
      "singlelinefieldname": ""
  },
  //when true locations searches use the current map extent. 
  searchextent: false,
  //Set link text and url parameters if you want to display clickable links in the upper right-corner
  //of the application.
  //ArcGIS.com. Enter link values for the link1 and link2 and text to add links. For example
  //url:'http://www.esri.com',text:'Esri'
  //    url: homeappurl,
  link1: {
      url: location.pathname.replace(/\/[^/]*$/, ''),
      text: 'EJScreen Home'
  },
  link2: {
      url: helpfileurl,
      text: 'Help'
  },
  //specify the width of the panel that holds the editor, legend, details
  leftpanewidth: 228,
  //Restrict the map's extent to the initial extent of the web map. When true users
  //will not be able to pan/zoom outside the initial extent.
  constrainmapextent: false,
  //Provide an image and url for a logo that will be displayed as a clickable image
  //in the lower right corner of the map. If nothing is specified then the esri logo will appear.
  customlogo: {
      image: 'images/em_logo.gif',
      link: ''
  },
  //embed = true means the margins will be collapsed to just include the map no title or links
  embed: false
};