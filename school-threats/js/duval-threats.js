$(document).ready( function() {
	$('#duval-threats').DataTable({
		ajax: {
			"url": "json/duval_threats.json",
			"dataSrc": "duval_threats"
		},
		columns: [
			{title: "School Year"},
			{title: "School"},
			{title: "Total Number of Assessments"},
			{title: "Dates of Assessments"}
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
		dom: 'ftpr',
		"columnDefs": [
			{
				"targets": [0],
				"visible": false
			},
			{
				"targets": [3],
				"className": "none"
			}
		],
		order: [[2, "desc"]]
	});
	var SchoolYear = $("input[name='SchoolYear']:checked").val();
	$('#duval-threats').DataTable().columns([0]).search(SchoolYear).draw();
	
	
	$("input[type='radio']").on('change', function () {
		var SchoolYear = $("input[name='SchoolYear']:checked").val();
		$('#duval-threats').DataTable().columns([0]).search(SchoolYear).draw();
	});
	

});