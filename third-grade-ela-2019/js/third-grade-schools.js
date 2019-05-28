$(document).ready( function () {
	$('#school-data').DataTable({
		ajax: {
			"url": "json/schools-2019.json",
			"dataSrc": "school-results-2019"
		},
		columns: [
			{title: "District"},
			{title: "School"},
			{title: "Percent in Level 3 or Above"},
			{title: "Percent in Level 1"},
			{title: "Percent in Level 2"},
			{title: "Percent in Level 3"},
			{title: "Percent in Level 4"},
			{title: "Percent in Level 5"},
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