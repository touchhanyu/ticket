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
var dataTableOption = {
	autoWidth : true,
	info : true,
	lengthChange : true,
	ordering : true,
	paging : true,
	processing : true,
	serverSide : false,
	deferRender : true,
	pagingType : 'full',
	language : {
		lengthMenu : '显示 _MENU_ 条记录',
		search : '',
		searchPlaceholder : '搜 索...',
		processing : '正在处理中...',
		loadingRecords : '载入中...',
		emptyTable : '暂无记录',
		infoEmpty : '',
		info : '第_PAGE_页，共_PAGES_页',
		infoFiltered : '(由_MAX_条记录过滤)',
		paginate : {
			first : '首页', //&laquo;
			previous : '上一页',
			next : '下一页',
			last : '末页' //&raquo;
		}
	},
	columns : [],
	ajax : {
		url : '',
		type : 'POST',
		data : {
			page : 1,
			rows : 10
		},
		dataType : 'json',
		dataSrc : 'rows'
	}
}
/**
 * 日期格式化
 * 
 * @param date
 * @returns {String}
 */
function dateFormat(date) {
	date = new Date(date);
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	if (m < 10) {
		m = '0' + m;
	}
	var d = date.getDate();
	if (d < 10) {
		d = '0' + d;
	}
	return y + '-' + m + '-' + d;
}