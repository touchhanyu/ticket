<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/bootstrap-theme.min.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/js/font-awesome/css/font-awesome.min.css"/>
<link rel="stylesheet" href="${pageContext.request.contextPath}/js/Ionicons/css/ionicons.min.css"/>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/bootstrap-datepicker/css/bootstrap-datepicker.min.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/select2/css/select2.min.css" />
<link rel="stylesheet" href="${pageContext.request.contextPath}/js/datatables.net-bs/css/dataTables.bootstrap.min.css"/>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/toastr/toastr.min.css" />
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/js/sweetalert2/sweetalert2.min.css" />
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/bootstrap/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/bootstrap-datepicker/js/bootstrap-datepicker.zh-CN.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/select2/js/select2.full.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/select2/js/i18n/zh-CN.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/datatables.net/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/toastr/toastr.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/sweetalert2/sweetalert2.all.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/ticket/ticket.js"></script>
<script type="text/javascript">
	var basePath = '${pageContext.request.contextPath}';
</script>
</head>
<body>
	<div class="header"></div>
	<div class="container">
		<div class="panel panel-info">
			<div class="panel-heading">
				余票查询
			</div>
			<div class="panel-body">
				<form class="form-horizontal" role="form">
					<div class="row">
						<div class="col-sm-6">
							<div class="form-group">
								<label for="fromStation" class="col-sm-3 control-label">出发地</label>
								<div class="col-sm-7">
									<select type="text" id="fromStation" class="form-control select2" style="width: 100%;"></select>
								</div>
							</div>
							<div class="form-group">
								<label for="fromStation" class="col-sm-3 control-label">出发日期</label>
								<div class="col-sm-7">
									<div class="input-group date date-picker">
										<div class="input-group-addon">
											<i class="fa fa-calendar"></i>
										</div>
										<input type="text" class="form-control pull-right" id="tranDate" name="tranDate" readonly/>
									</div>
								</div>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="form-group">
								<label for="toStation" class="col-sm-3 control-label">目的地</label>
								<div class="col-sm-7">
									<select type="text" id="toStation" class="form-control select2" style="width: 100%;"></select>
								</div>
							</div>
						</div>
					</div>
				</form>
				<center>
					<button type="button" class="btn btn-info" onclick="queryTicket();">查&nbsp;询</button>
				</center>
				<table id="tickettb" class="table table-striped table-bordered"></table>
			</div>
		</div>
	</div>
</body>
</html>