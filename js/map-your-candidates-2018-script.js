var layer = new L.StamenTileLayer('terrain');

var map = new L.Map('map').setView([29.854,-81.652],8);
map.addLayer(layer);

var geoJson;

var colorSet = false;
var colorNumber;

function getDistColor () {
	colors = ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9','#bc80bd','#ccebc5','#ffed6f'];
	if (colorSet == false) {
		colorNumber = Math.floor(Math.random() * 12);
		colorSet = true;
		return colors[colorNumber];	
	} else {
		colorNumber++;
		if (colorNumber > 11) {
			colorNumber = 0;
		}
		return colors[colorNumber];
	}
	
}


function setStyle(feature) {
	return {
		opacity: 1,
		weight: 2,
		color: "#FFF",
		fillColor: getDistColor(),
		fillOpacity: 0.6
	}
}

function highlightFeature(e) {
	var layer = e.target;
	distInfo.update(layer.feature.properties);
}

function resetHighlight(e) {
	// geojson.resetStyle(e.target);
	distInfo.update();
}

function onEachFeature(feature,layer) {
	layer.on({
		click: highlightFeature,
		// mouseout: resetHighlight
	});
}

var counties = L.geoJson(nefl_counties, {style: {opacity: 1, weight: 2, color: "#837c7c",fillColor: "#000",fillOpacity: 0}});
map.addLayer(counties);

var us_house = L.geoJson(us_house_nefl,{style: setStyle, onEachFeature: onEachFeature}),
	fl_senate = L.geoJson(fl_senate_nefl,{style: setStyle, onEachFeature: onEachFeature}),
	fl_house = L.geoJson(fl_house_nefl,{style: setStyle, onEachFeature: onEachFeature});

var district_layers = {
	"US House": us_house,
	"Florida Senate": fl_senate,
	"Florida House": fl_house
};

var counties_layer = {
	"Show/Hide County Borders":counties
};

L.control.layers(district_layers,counties_layer, {collapsed: false}).addTo(map);

var activeDistrict;
map.on("baselayerchange", function(e) {
	activeDistrict = e.name;
	resetHighlight(e);
});

var distInfo = L.control();

distInfo.onAdd = function (map) {
	this._div = L.DomUtil.create('div','distInfo');
	this.update();
	return this._div;
}

distInfo.update = function (props) {
	this._div.innerHTML = "<h3>" + (props ? activeDistrict + " District: " + props.district_no + "<br /><br />" + props.contest : "Choose a type of <br />office and click on <br />your district") + "</h3>";
	//this._div.innerHTML = '<h3>District:</h3>' + (props[0]);
};

distInfo.addTo(map);