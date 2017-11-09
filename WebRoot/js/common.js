$.fn.extend({
	grid : function(param) {
		var $el = this;
		if (param.type == null || param.type == undefined)
			param.type = 'GET';
		if (param.dataType == null || param.dataType == undefined)
			param.dataType = 'json';
		$.ajax({
			url : param.url,
			type : param.type,
			data : param.data,
			dataType : param.dataType,
			success : function(d) {
				makeGrid($el, param.columns, d.rows);
			}
		});
	}
});
function makeGrid(obj, columns, data) {
	var htmlStr = '<div class="col-md-6"><table class="table table-striped table-bordered">';
	htmlStr += '<thead><tr>';
	/* 表头 */
	for (var i = 0; i < columns.length; i++) {
		htmlStr += '<th name="' + columns[i].name + '_th"';
		if (columns[i].hide)
			htmlStr += ' style="display: none"';
		htmlStr += '>' + columns[i].title + '</th>';
	}
	htmlStr += '</tr></thead><tbody>';
	for (var i = 0; i < data.length; i++) {
		htmlStr += '<tr>';
		var row = data[i];
		for (var j = 0; j < columns.length; j++) {
			var value = row[columns[j].field];
			if (value == null || value == undefined)
				value = '';
			htmlStr += '<td name="' + columns[j].name + '"';
			if (columns[j].hide)
				htmlStr += ' style="display: none"';
			htmlStr += '>'
			if (columns[j].value == null || columns[j].value == undefined) {
				htmlStr += value + '</td>';
			} else {
				htmlStr += columns[j].value + '</td>';
			}

		}
		htmlStr += '</tr>';
	}
	htmlStr += '</tbody></table></div>';
	obj.append(htmlStr);
}