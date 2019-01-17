var layer = new L.StamenTileLayer('terrain');

var map = new L.Map('map').setView([30.284,-81.652],9);
map.addLayer(layer);

var geoJson;

var colorSet = false;
var colorNumber;

function getDistColor () {
	colors = ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9','#bc80bd','#ccebc5','#ffed6f','#6a3d9a','#ff7f00'];
	if (colorSet == false) {
		colorNumber = Math.floor(Math.random() * 14);
		colorSet = true;
		return colors[colorNumber];	
	} else {
		colorNumber++;
		if (colorNumber > 13) {
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
		//fillColor: "#CCC",
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

L.geoJson(coj_districts,{style: setStyle, onEachFeature: onEachFeature}).addTo(map);
//L.geoJson(coj_districts).addTo(map);

var distInfo = L.control();

distInfo.onAdd = function (map) {
	this._div = L.DomUtil.create('div','distInfo');
	this.update();
	return this._div;
}

distInfo.update = function (props) {
	this._div.innerHTML = "<h3>" + (props ? " District: " + props.district_no + "<br /><br />" + props.contest : "Click on a district<br /> for more information") + "</h3>";
	//this._div.innerHTML = '<h3>District:</h3>' + (props[0]);
};

distInfo.addTo(map);