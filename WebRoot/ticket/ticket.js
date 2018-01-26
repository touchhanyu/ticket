var dt;
$(function() {
	$('#fromStation').select2({
		language : 'zh-CN',
		ajax : {
			url : basePath + '/ticket/queryStation',
			dataType : 'json',
			data : function(params) {
				return {
					pinyin : params.term
				};
			},
			processResults : function(data) {
				return {
					results : data
				};
			},
			cache : true
		},
		minimumInputLength : 0,
		allowClear : true
	});
	$('#toStation').select2({
		language : 'zh-CN',
		ajax : {
			url : basePath + '/ticket/queryStation',
			dataType : 'json',
			data : function(params) {
				return {
					pinyin : params.term
				};
			},
			processResults : function(data) {
				return {
					results : data
				};
			},
			cache : true
		},
		minimumInputLength : 0,
		allowClear : true
	});
	$('#tranDate').datepicker({
		autoclose : true,
		language : 'zh-CN',
		clearBtn : true,
		todayBtn : false,
		format : {
			toDisplay : function(date, format, language) {
				return dateFormat(date);
			},
			toValue : function(date, format, language) {
				return dateFormat(date);
			}
		}
	});
	dataTableOption.ajax.url = basePath + '/ticket/ticketQuery';
	dataTableOption.ajax.data = {
		tranDate : '',
		from_station : '',
		to_station : ''
	};
	dataTableOption.scrollY = '300px';
	dataTableOption.scrollCollapse = true;
	dataTableOption.columns = [
		{ data : 'secretStr', title : 'secretStr', searchable : false, orderable : false, visible : false },
		{ data : 'train_no', title : 'train_no', searchable : false, orderable : false, visible : false },
		{ data : 'station_train_code', title : '车次', orderable : false},
		{ data : 'start_station_name', title : '始发站', orderable : false},
		{ data : 'end_station_name', title : '终点站', orderable : false},
		{ data : 'start_time', title : '发车时间', orderable : false},
		{ data : 'arrive_time', title : '到达时间', orderable : false},
		{ data : 'lishi', title : '历时', orderable : false},
		{ data : 'tz_num', title : '特等座/商务座', orderable : false},
		{ data : 'zy_num', title : '一等座', orderable : false},
		{ data : 'ze_num', title : '二等座', orderable : false},
		{ data : 'gr_num', title : '高级软卧', orderable : false},
		{ data : 'rw_num', title : '软卧', orderable : false},
		{ data : 'yw_num', title : '硬卧', orderable : false},
		{ data : 'yz_num', title : '硬座', orderable : false},
		{ data : 'wz_num', title : '无座', orderable : false},
		{ data : 'oper', title : '操作', orderable : false, render : function(data, type, full, meta) {
			return '<button class="btn btn-success" onclick="void(0);">预定</button>';
		} } ];
	dt = $('#tickettb').DataTable(dataTableOption);
});
function captcha() {
	$.ajax({
		url : basePath + '/ticket/captcha',
		type : 'GET',
		success : function(d) {
			var path = basePath + d;
			$('#randcode').attr('src', path);
		}
	});
}
function login() {
	$.ajax({
		url : basePath + '/ticket/login',
		type : 'POST',
		data : {
			username : $('#username').val(),
			password : $('#password').val(),
			randcode : $('#randcode').val()
		},
		success : function(d) {}
	});
}
function queryTicket() {
	var tranDate = $('#tranDate').val();
	var from_station = $('#fromStation').val();
	var to_station = $('#toStation').val();
	var param = {
		tranDate : tranDate,
		from_station : from_station,
		to_station : to_station
	};
	dt.settings()[0].ajax.data = param;
	dt.ajax.reload();
}