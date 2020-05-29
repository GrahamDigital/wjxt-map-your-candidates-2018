$(document).ready( function () {
	$('#covid-ltc-data').DataTable({
		ajax: {
			"url": "json/covid-ltc-facilities-wjxt.json",
			"dataSrc": "covid-ltc-facilities"
		},
		columns: [
			{title: "County"},
			{title: "Facility Name"},
			{title: "Provider Type"},
			{title: "Number of Positive Residents"},
			{title: "Number of Positive Residents Transferred"},
			{title: "Number of Positive Staff"}
		],
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
				},
			}
		},
		processing: true,
		lengthChange: false,
		language: {
			"search": ""
		},
		pageLength: 5,
		dom: 'ftipr',
	});
});