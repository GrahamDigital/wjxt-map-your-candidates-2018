var layer = new L.StamenTileLayer('terrain');

var map = new L.Map('map').setView([30.314,-81.652],11);
map.addLayer(layer);

var geoJson;

function setStyle(feature) {
	return {
		opacity: 1,
		weight: 2,
		color: "#FFF",
		fillColor: "#000000",
		fillOpacity: 0
	}
}

var PinIcon = L.Icon.extend({
	options: {
		shadowUrl: 'images/pin-shadow.png',
		iconSize: [38,80],
		shadowSize: [70,24],
		iconAnchor: [2,78],
		shadowAnchor: [5,12],
		popupAnchor: [15,-63]
	}
});

var redPin = new PinIcon({iconUrl: 'images/pin-red.png'}), 
	orangePin = new PinIcon({iconUrl: 'images/pin-orange.png'}),
	yellowPin = new PinIcon({iconUrl: 'images/pin-yellow.png'}),
	greenPin = new PinIcon({iconUrl: 'images/pin-green.png'});

var markers = L.markerClusterGroup({
	maxClusterRadius: 50
});

for (var num = 0; num < august_11.length; num++) {
	var aug_11_issue = august_11[num];
	var aug_11_lat = aug_11_issue["Lat"];
	var aug_11_long = aug_11_issue["Lng"];
	var aug_11_name = aug_11_issue["SchoolName"];
	var aug_11_desc = aug_11_issue["Description"];
	var aug_11_addr = aug_11_issue["School Address"];
	
	
	var pin = orangePin;
		
	var marker = L.marker([aug_11_lat,aug_11_long],{icon:pin});
	
	var popup_html = '<h4>August 11 Report: ' + aug_11_name + '</h4>';
	popup_html += '<div>' + aug_11_addr + '</div>';
	popup_html += '<div><strong>Issue:</strong> ' + aug_11_desc + '</div>';
	
	marker.bindPopup(popup_html);
	markers.addLayer(marker);
}



for (var num = 0; num < august_09.length; num++) {
	var aug_09_issue = august_09[num];
	var aug_09_lat = aug_09_issue["Lat"];
	var aug_09_long = aug_09_issue["Lng"];
	var aug_09_name = aug_09_issue["SchoolName"];
	var aug_09_desc = aug_09_issue["Description"];
	var aug_09_addr = aug_09_issue["School Address"];
	var aug_09_create = aug_09_issue["Created on"];
	
	var pin = greenPin;
		
	var marker = L.marker([aug_09_lat,aug_09_long],{icon:pin});
	
	var popup_html = '<h4>August 9 Report: ' + aug_09_name + '</h4>';
	popup_html += '<div>' + aug_09_addr + '</div>';
	popup_html += '<div><strong>Issue:</strong> ' + aug_09_desc + '</div>';
	popup_html += '<div><strong>Work Order Created On:</strong> ' + aug_09_create + '</div>';
	popup_html += '<div><strong>(Issue cleared by August 11th report)</strong></div>';
	
	marker.bindPopup(popup_html);
	markers.addLayer(marker);
}

map.addLayer(markers);