// handle map
  
  var layer = new L.StamenTileLayer('toner-lite');

var map = new L.Map('map').setView([30.178,-82.213],8);
map.addLayer(layer);

var geoJson;

var colorSet = false;
var colorNumber;

function getDistColor () {
	colors = ['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33']
	if (colorSet == false) {
		colorNumber = Math.floor(Math.random() * 6);
		colorSet = true;
		return colors[colorNumber];	
	} else {
		colorNumber++;
		if (colorNumber > 5) {
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
	// alert(layer.feature.properties.NAME);
	$('table.ddtable').DataTable().columns([0]).search(layer.feature.properties.NAME).draw();
}

function onEachFeature(feature,layer) {
	layer.on({
		click: highlightFeature
	});
}

L.geoJson(fl_counties, {style: setStyle, onEachFeature: onEachFeature}).addTo(map);
  
// handle table

	
$(document).ready( function () {	
	$('table.ddtable').DataTable( {
	// data: dataset,
	responsive: {
        details: {
           // display: $.fn.dataTable.Responsive.display.childRowImmediate, 
			renderer: function ( api, rowIdx, columns ) {
                var data = $.map( columns, function ( col, i ) {
                    return col.hidden ?
                        '<tr data-dt-row="'+col.rowIndex+'" data-dt-column="'+col.columnIndex+'">'+
                            '<td>'+col.title+':'+'</td> '+
                            '<td>'+col.data+'</td>'+
                        '</tr>' :
                        '';
                } ).join('');
 
                return data ?
                    $('<table/>').append( data ) :
                    false;
            }
        }
    },
	processing: true,
	paging: false,
	lengthChange: false,
	dom: 'lrtp',
	});
	$('table.ddtable').DataTable().columns([0]).search("State").draw();
	
});

