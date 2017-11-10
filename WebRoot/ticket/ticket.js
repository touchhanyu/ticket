$(function() {
	captcha();
	$('#loginfm').hide();
	queryTicket();
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
	$('#tickettb').grid({
		url : basePath + '/ticket/ticketQuery',
		type : 'POST',
		data : {
			tranDate : '2017-11-30',
			from_station : 'BJP',
			to_station : 'HFH'
		},
		columns : [ {
			field : 'secretStr',
			name : 'secretStr',
			title : 'secretStr',
			hide : true
		}, {
			field : 'train_no',
			name : 'train_no',
			title : 'train_no',
			hide : true
		}, {
			field : 'station_train_code',
			name : 'station_train_code',
			title : '车次',
		}, {
			field : 'start_station_name',
			name : 'start_station_name',
			title : '始发站'
		}, {
			field : 'end_station_name',
			name : 'end_station_name',
			title : '终点站'
		}, {
			field : 'start_time',
			name : 'start_time',
			title : '发车时间'
		}, {
			field : 'arrive_time',
			name : 'arrive_time',
			title : '到达时间'
		}, {
			field : 'lishi',
			name : 'lishi',
			title : '历时'
		}, {
			field : 'tz_num',
			name : 'tz_num',
			title : '特等座/商务座'
		}, {
			field : 'zy_num',
			name : 'zy_num',
			title : '一等座'
		}, {
			field : 'ze_num',
			name : 'ze_num',
			title : '二等座'
		}, {
			field : 'gr_num',
			name : 'gr_num',
			title : '高级软卧'
		}, {
			field : 'rw_num',
			name : 'rw_num',
			title : '软卧'
		}, {
			field : 'yw_num',
			name : 'yw_num',
			title : '硬卧'
		}, {
			field : 'yz_num',
			name : 'yz_num',
			title : '硬座'
		}, {
			field : 'wz_num',
			name : 'wz_num',
			title : '无座'
		}, {
			field : 'booking',
			name : 'booking',
			title : '',
			value : '预定'
		} ]
	});
}