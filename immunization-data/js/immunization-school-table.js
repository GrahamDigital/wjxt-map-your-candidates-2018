$(document).ready( function () {
	$('#school-data').DataTable({
		ajax: {
			"url": "/json/immunization-school-data.json",
			"dataSrc": "schoolData"
		},
		columns: [
			{title: "District"},
			{title: "School"},
			{title: "Grade Level"},
			{title: "Percent Fully Immunized"},
			{title: "Percent with Religious Exemptions"},
			{title: "Total Number of Students"},
			{title: "Number of Students Fully Immunized"},
			{title: "Number of Students with Temporary Medical Exemptions"},
			{title: "Number of Students with Permanent Medical Exemptions"},
			{title: "Number of Students with Permanent Religious Exemptions"},
			{title: "Virtual/Home Education Students"},
			{title: "No Data"},
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