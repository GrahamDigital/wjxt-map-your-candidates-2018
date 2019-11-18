var layer = new L.StamenTileLayer('terrain');

var map = new L.Map('map').setView([30.314,-81.652],10);
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

var greenPin = new PinIcon({iconUrl: 'images/pin-green.png'}),
	orangePin = new PinIcon({iconUrl: 'images/pin-orange.png'}),
	redPin = new PinIcon({iconUrl: 'images/pin-red.png'});

var draw = L.markerClusterGroup({
	maxClusterRadius: 50
});

var scratch = L.markerClusterGroup({
	maxClusterRadius: 50
});

var winners = L.markerClusterGroup({
	maxClusterRadius: 50
});

var stat_layers = {
	"Value of Winning Tickets": winners,
	"Draw Game Tickets Sold": draw,
	"Scratch-Off Tickets Sold": scratch
};

winners.addTo(map);

L.control.layers(stat_layers, null, {collapsed: false}).addTo(map);

var count_fmt = new Intl.NumberFormat('en-US', {
	style: 'decimal'
});

var money_fmt = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD'
});

for (var num = 0; num < nefl_retailers_draw.length; num++) {
	var draw_store = nefl_retailers_draw[num];
	var draw_name = draw_store["Retailer Name"];
	var draw_address = draw_store["Location Address"];
	var draw_city = draw_store["City"];
	var draw_sales_amt = draw_store["Draw Sales Amt"];
	var draw_sales_count = draw_store["Draw Sales Cnt"];
	var draw_lat = draw_store["Latitude"];
	var draw_long = draw_store["Longitude"];
		
	if (draw_sales_count >= 500000) {
		pin = redPin;
	} else if (draw_sales_count >= 50000) {
		pin = orangePin;
	} else {
		pin = greenPin;
	}
		
	var marker = L.marker([draw_lat,draw_long],{icon:pin});
	
	var popup_html = '<strong>Retailer: ' + draw_name + '</strong>';
	popup_html += '<div>Address:' + draw_address + ', ' + draw_city + '</div>';
	popup_html += '<div><strong>' + count_fmt.format(draw_sales_count) + '</strong> draw game tickets sold, worth <strong>' + money_fmt.format(draw_sales_amt) + '</strong></div>';
	
	marker.bindPopup(popup_html);
	draw.addLayer(marker);
}

for (var num = 0; num < nefl_retailers_scratch.length; num++) {
	var scratch_store = nefl_retailers_scratch[num];
	var scratch_name = scratch_store["Retailer Name"];
	var scratch_address = scratch_store["Location Address"];
	var scratch_city = scratch_store["City"];
	var scratch_sales_amt = scratch_store["Scratch-Off Sales Amt"];
	var scratch_sales_count = scratch_store["Scratch-Off Sales Cnt"];
	var scratch_lat = scratch_store["Latitude"];
	var scratch_long = scratch_store["Longitude"];
	
	if (scratch_sales_count >= 300000) {
		pin = redPin;
	} else if (scratch_sales_count >= 50000) {
		pin = orangePin;
	} else {
		pin = greenPin;
	}
		
	var marker = L.marker([scratch_lat,scratch_long],{icon:pin});
	
	var popup_html = '<strong>Retailer: ' + scratch_name + '</strong>';
	popup_html += '<div>Address:' + scratch_address + ', ' + scratch_city + '</div>';
	popup_html += '<div><strong>' + count_fmt.format(scratch_sales_count) + '</strong> scratch-off tickets sold, worth <strong>' + money_fmt.format(scratch_sales_amt) + '</strong></div>';
	
	marker.bindPopup(popup_html);
	scratch.addLayer(marker);
}

for (var num = 0; num < nefl_winners.length; num++) {
	var winners_store = nefl_winners[num];
	var winners_name = winners_store["RETAILERNAME"];
	var winners_address = winners_store["RETAILERSTREET"];
	var winners_city = winners_store["RETAILERCITY"];
	var winners_amt = winners_store["total_won"];
	var winners_count = winners_store["num_winners"];
	var winners_lat = winners_store["Latitude"];
	var winners_long = winners_store["Longitude"];
	
	if (winners_amt >= 500000) {
		pin = redPin;
	} else if (winners_amt >= 50000) {
		pin = orangePin;
	} else {
		pin = greenPin;
	}
		
	var marker = L.marker([winners_lat,winners_long],{icon:pin});
	
	var popup_html = '<strong>Retailer: ' + winners_name + '</strong>';
	popup_html += '<div>Address:' + winners_address + ', ' + winners_city + '</div>';
	popup_html += '<div><strong>' + winners_count + '</strong> winning tickets sold, worth <strong>' + money_fmt.format(winners_amt) + '</strong></div>';
	
	marker.bindPopup(popup_html);
	winners.addLayer(marker);
}


// map.addLayer(draw);