var map;
initMap();

function initMap() {
    ///Hydroclim variables
    var hydroclim;
    var wmts_url = "http://maps.hydroclim.org/geoserver/gwc/service/wmts?";
    var wms_cache_url = "http://maps.hydroclim.org/geoserver/gwc/service/wms?";
    //var wms_url = "http://maps.hydroclim.org/geoserver/wms?";
    var wms_url = "https://www.hydroclim.org/geoserver/wms?";
    //var wms_local = "http://192.168.56.101:8080/geoserver/wms?";
    var wms_local = "http://maps.hydroclim.org/geoserver/wms?";
    //var wms_local = "http://localhost:8080/geoserver/hydroclim/wms?";

    var hydroclimFullLayer = "reach";

	//var api_url = "http://127.0.0.1:5000"
	//var api_url = "http://hydroclimtest.centralus.cloudapp.azure.com"
	var api_url = "http://129.81.224.186"
	var cql_filter = "INTERSECTS(geom, collectGeometries(queryCollection('hydroclim:states', 'the_geom', 'STATE_ABBR=''LA''')))"

    //var selectedStyle = 'hydroclim:temp_flow_5_degree';
    var selectedStyle = '';
    var defaultsChanged = false;
    var layerPanelHeight = "120px";
	 map = L.map('map', {
        //minZoom: 7,
		//maxZoom:10,
		 zoomControl: false,
        fullscreenControl: false,
    }).setView([30.791830, -91.329102], 7);

	 //var nhd = new L.TileLayer.WMS("https://basemap.nationalmap.gov:443/arcgis/services/USGSHydroCached/MapServer/WMSServer?", {
	  // // //var nhd = new L.TileLayer.WMS("https://basemap.nationalmap.gov:443/arcgis/services/USGSImageryTopo/MapServer/WMSServer?", {
	  // // var nhd = new L.TileLayer.WMS("https://hydro.nationalmap.gov:443/arcgis/services/nhd/MapServer/WmsServer?", {
		// layers: [0],
		// //request: 'GetFeatureInfo',
		// //service: 'WMS',
        // dpiMode: 10,
        // transparent: true,
        // format: "image/png32",
        // srs: "EPSG:4326",
		// version: '1.3.0',
		// //info_format: 'application/geojson',
		// //query_layers:[2]
     // })//.addTo(map);
	 
	  // $.ajax('https://hydro.nationalmap.gov:443/arcgis/services/nhd/MapServer/WmsServer?',{
		  // type: 'GET',
		  // data: {
			// layers: [2],
			// request: 'GetFeatureInfo',
			// service: 'WMS',
			// dpiMode: 10,
			// transparent: true,
			// format: "image/png32",
			// srs: "EPSG:4326",
			// version: '1.3.0',
			// info_format: 'application/geojson',
			// query_layers:[2]
			// },
		  // dataType: 'jsonp',
		  // jsonpCallback:'callback:handleJson',
		  // jsonp:'format_options'
		 // });}

		// // the ajax callback function
		// function handleJson(data) {
			// selectedArea = L.geoJson(data).addTo(map);
		  // map.fitBounds(selectedArea.getBounds());
	var water  = new L.TileLayer.WMS(wms_url,{
        layers: "hydroclim:LA_Hydropoly",
        format:'image/png',
        transparent: true,
        zIndex:50,
        tiled:true,
        srs:"EPSG:900913"

    }).addTo(map);

	var reaches = new L.TileLayer.WMS(wms_url,
        {
            //layers: "hydroclim:reach_hydroclim",
            //layers: "hydroclim:reach_newshape",
            //layers: "hydroclim:0804NHDFlowline",
            //layers: "hydroclim:LA_stream_shp_groups",
            layers: "hydroclim:LA_Water",
            format: 'image/png',
            transparent: true,
            zIndex: 49,
            tiled: true,
			srs: "EPSG:900913",
        }
    ).addTo(map)

    var parishes = new L.TileLayer.WMS(wms_url,
        {
            layers: "hydroclim:Parishes",
            format: 'image/png',
            transparent: true,
            zIndex: 48,
            tiled: true,
			srs: "EPSG:900913",
        }
    ).addTo(map);

    var legend = L.control({ position: "topright" });
    legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend");
         div.innerHTML += "<h7>Year</h7><br>";
        div.innerHTML += '<i style="background: #477AC2"></i><span> 1900 - 1929 </span><br>';
        div.innerHTML += '<i style="background: #448D40"></i><span> 1930 - 1969 </span><br>';
        div.innerHTML += '<i style="background: #e5e500"></i><span> 1970 - 1999 </span><br>';
        div.innerHTML += '<i style="background: #ec0a1e"></i><span> 2000 - 2021 </span><br>';

        return div;
    };
	
    legend.addTo(map);
	var legend2 = L.control({ position: "bottomleft" });
    legend2.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += "<h7>Temperature/℃</h7><br>";
        div.innerHTML += '<i style="background: #2b83ba"></i><span> 0 - 3 </span><br>';
        div.innerHTML += '<i style="background: #64abb0"></i><span> 3 - 7 </span><br>';
        div.innerHTML += '<i style="background: #9dd3a7"></i><span> 7 - 10 </span><br>';
        div.innerHTML += '<i style="background: #c7e9ad"></i><span> 10 - 13 </span><br>';
        div.innerHTML += '<i style="background: #edf8b9"></i><span> 13 - 16 </span><br>';
        div.innerHTML += '<i style="background: #ffedaa"></i><span> 16 - 19 </span><br>';
        div.innerHTML += '<i style="background: #fec980"></i><span> 19 - 22 </span><br>';
        div.innerHTML += '<i style="background: #f99e59"></i><span> 22 - 25 </span><br>';
        div.innerHTML += '<i style="background: #e85b3a"></i><span> 25 - 28 </span><br>';
        div.innerHTML += '<i style="background: #d7191c"></i><span> 28 - 31 </span><br>';
        div.innerHTML += '<i style="background: #cd0a0d"></i><span> > 31 </span><br>';

        return div;
    };

    //legend2.addTo(map);
	
	//  var osmLight = new L.TileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
    //     minZoom: 7,
    //
    //     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution"> CARTO</a>'
    // }).addTo(map);


}
var fishIcon_group_unknown = new L.icon({
    iconUrl: 'lib/leaflet/images/new_marker_unknown - Copy.png',
    iconSize:     [15, 15], // size of the icon
    iconAnchor:   [7.5, 15], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
});

var fishIcon = new L.icon({
    iconUrl: 'lib/leaflet/images/new_marker - Copy.png',
    iconSize:     [15, 15], // size of the icon
    iconAnchor:   [7.5, 15], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
});

var fishIcon_group19001929 = new L.icon({
    iconUrl: 'lib/leaflet/images/new_marker - 1900_1929 - Copy.png',
    iconSize:     [15, 15], // size of the icon
    iconAnchor:   [7.5, 15], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
});
var fishIcon_group19301969 = new L.icon({
    iconUrl: 'lib/leaflet/images/new_marker - 1930_1969 - Copy.png',
    iconSize:     [15, 15], // size of the icon
    iconAnchor:   [7.5, 15], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
});
var fishIcon_group19701999 = new L.icon({
    iconUrl: 'lib/leaflet/images/new_marker - 1970_1999 - Copy.png',
    iconSize:     [15, 15], // size of the icon
    iconAnchor:   [7.5, 15], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -10] // point from which the popup should open relative to the iconAnchor
});


var pointsGroup;


function loadPoints(index){
	var layers=[];
	data = speciesList[index-1].records
	//data = speicesdata;
	for(var i = 0;i< data.length;i++){
	    var currentfishIcon = fishIcon_group_unknown
	    if(1900 <= data[i].YearCollected && data[i].YearCollected <=1929){
            currentfishIcon = fishIcon_group19001929
        }
	    else if(1930 <= data[i].YearCollected && data[i].YearCollected <= 1969){
            currentfishIcon = fishIcon_group19301969
        }
	    else if(1970 <= data[i].YearCollected && data[i].YearCollected <= 1999){
	        currentfishIcon = fishIcon_group19701999
        }
	    else {
	        currentfishIcon = fishIcon
        }
		var layer = new L.marker([ data[i].Latitude, data[i].Longitude ],{icon: currentfishIcon});
		layer.bindPopup(
			"<div><span class='popup-title'>Catalog Number : </span>" + data[i].CatalogNumber + "</div>" +
			"<div><span class='popup-title'>Scientific Name : </span>" + data[i].ScientificName + "</div>" +
			"<div><span class='popup-title'>Collection Code : </span>" + data[i].CollectionCode + "</div>" +
			"<div><span class='popup-title'>Collected Date : </span>" + data[i].YearCollected + "-" + data[i].MonthCollected + "-" + data[i].DayCollected + "</div>" +
			"<div><span class='popup-title'>Collector :</span>" + data[i].Collector + "</div>" +
			"<div><span class='popup-title'>Preparation Type :</span>" + data[i].PreparationType +"</div>" +
			"<div><span class='popup-title'>Longitude :</span>" + data[i].Longitude +"</div>" +
			"<div><span class='popup-title'>Longitude :</span>" + data[i].Latitude + "</div>"

		).openPopup();
		layers.push(layer);
	}
	pointsGroup=L.layerGroup(layers);
	map.addLayer(pointsGroup);
	

}

function removePoints(){
	if (pointsGroup === undefined) { return false;}
	map.removeLayer(pointsGroup);
}
//loadPoints(2)


