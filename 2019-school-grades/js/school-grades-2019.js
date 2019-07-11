$(document).ready( function () {
	$('#school-data').DataTable({
		ajax: {
			"url": "json/school-grades-2019.json",
			"dataSrc": "school-grades-2019"
		},
		columns: [
			{title: "District"},
			{title: "School"},
			{title: "2019 Grade"},
			{title: "2018 Grade"},
			{title: "2017 Grade"},
			{title: "2016 Grade"},
			{title: "2015 Grade"},
			{title: "Charter School?"},
			{title: "Title I School?"}
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