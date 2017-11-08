<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/bootstrap.min.css"/>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/bootstrap-theme.min.css"/>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/signin.css"/>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-2.2.0.min.js"></script>
<script type="text/javascript">
	var basePath = '${pageContext.request.contextPath}';
	$(
		function captcha() {
			$.ajax({
				url : basePath + '/login/captcha',
				type : 'GET',
				success : function(d) {
					
				}
			});
		}
	);
	function login() {
		$.ajax({
			url : basePath + '/login/login',
			type : 'POST',
			data : {
				username : $('#username').val(),
				password : $('#password').val(),
				randcode : $('#randcode').val()
			},
			success : function(d) {
			}
		});
	}
</script>
</head>
<body>
	<div class="container">
		<form class="form-signin">
			<div class="panel-body">
				<h2 class="form-signin-heading"></h2>
				<label for="inputEmail" class="sr-only">用户名</label>
				<input type="text" id="username" class="form-control" placeholder="用户名" required autofocus/>
				<label for="inputPassword" class="sr-only">密码</label>
				<input type="password" id="password" class="form-control" placeholder="密码" required/>
				<label for="inputEmail" class="sr-only">验证码</label>
				<input type="text" id="randcode" class="form-control" placeholder="验证码" required/>
				<br/>
				<button class="btn btn-success btn-block" onclick="login();">登     录</button>
			</div>
		</form>
	</div>
</body>
</html>