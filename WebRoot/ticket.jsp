<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/bootstrap-theme.min.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/signin.css" />
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-2.2.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common.js"></script>
<script type="text/javascript">
	var basePath = '${pageContext.request.contextPath}';
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
</script>
</head>
<body>
	<div class="container">
		<form id="loginfm" class="form-signin">
			<div class="panel-body">
				<h2 class="form-signin-heading"></h2>
				<!-- 
				<label for="inputEmail" class="sr-only">用户名</label>
				 -->
				<input type="text" id="username" class="form-control" placeholder="用户名" required autofocus/>
				<!-- 
				<label for="inputPassword" class="sr-only">密码</label>
				 -->
				<input type="password" id="password" class="form-control" placeholder="密码" required/>
				<img id="randcode" class="img-thumbnail" src="" onclick="captcha();"/>
				<!-- 
				<label for="inputEmail" class="sr-only">验证码</label>
				 -->
				<input type="text" id="randcode" class="form-control" placeholder="验证码" required/>
				<button class="btn btn-success btn-block" onclick="login();">登     录</button>
			</div>
		</form>
		<div id="tickettb"/>
	</div>
</body>
</html>