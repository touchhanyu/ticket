(function() {
	var c = null;
	var b;
	var a = "用户名／邮箱／手机号";
	jQuery.extend({
				initLoginForm : function() {
					b = $("#loginForm").validate(
									{
										wrapper : "li",
										onkeyup : false,
										rules : {
											"loginUserDTO.user_name" : {
												requiredUserName : true,
												checkLoginUserName : true
											},
											"userDTO.password" : {
												required : true,
												minlength : 6
											}
										},
										messages : {
											"loginUserDTO.user_name" : {
												requiredUserName : login_messages.userNameEmpty,
												checkLoginUserName : login_messages.userNameFormat
											},
											"userDTO.password" : {
												required : login_messages.passwordEmpty,
												minlength : login_messages.passwordLength
											}
										},
										submitHandler : function(d) {
											var e = dhtmlx.modalbox({
														targSrc : '<div style="z-index: 20000; position: fixed; left: 750.5px; top: 237px;"><img src="'
																+ ctx
																+ 'resources/images/loading.gif"></img></div>'
													});
											$(d).ajaxSubmit({
																url : ctx + "login/loginAysnSuggest",
																type : "post",
																async : false,
																success : function( f) {
																	dhtmlx.modalbox.hide(e);
																	if (f.status) {
																		if (f.data.loginCheck == "Y") {
																			if (f.data.otherMsg != "") {
																				dhtmlx.alert({
																							title : messages["message.error"],
																							ok : messages["button.ok"],
																							text : f.data.otherMsg,
																							type : "alert-error",
																							callback : function() {
																								$.submitLogin()
																							}
																						})
																			} else {
																				$.submitLogin()
																			}
																		} else {
																			if ("Y" == ifShowRandCode && "Y" == openRandCodeCheck) {
																				refreshImg("login", "sjrand");
																				$("#randCode").val("")
																			}
																			$("#password").val("");
																			return false
																		}
																	}
																}
															})
										}
									});
					$("#loginSub").on("click", function(d) {
						$("#loginForm").submit()
					})
				},
				verifyLoginUser : function(g) {
					if (g == a || "" == g || null == g) {
						return login_messages.userNameEmpty
					}
					var e = /^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])\d{8}$/;
					var d = /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/;
					var f = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
					if (!d.test(g) && !f.test(g) && !e.test(g)) {
						return login_messages.userNameFormat
					}
					return true
				},
				verifyLoginPassword : function(d) {
					var e = true;
					if ("" == d || null == d) {
						e = login_messages.passwordEmpty
					} else {
						if (6 > d.length) {
							e = login_messages.passwordLength
						}
					}
					return e
				},
				onBlurCheck : function() {
					var d = false;
					var e = false;
					$("#username").on("blur", function() {
						var g = $("#username").val();
						d = $.verifyLoginUser(g);
						if ("Y" == ifShowRandCode) {
							var f = $("#randCode")[0];
							if (typeof (d) !== "boolean") {
								$.showError(f, d)
							} else {
								if (d === true) {
									$.showError(f).hide()
								}
							}
						}
					});
					$("#password").on("blur", function() {
						var g = $("#password").val();
						var h = $.verifyLoginPassword(g);
						if ("Y" == ifShowRandCode) {
							var f = $("#randCode")[0];
							if (d === true && typeof (h) !== "boolean") {
								$.showError(f, h)
							} else {
								if (h === true) {
									$.showError(f).hide()
								}
							}
						}
					})
				},
				loginClick : function() {
					$("#loginSub").on("click",
									function(j) {
										var i = $("#username").val();
										var g = $("#password").val();
										var d = $("#randCode").val();
										if ("undefined" == typeof (submitForm)) {
										} else {
											submitForm()
										}
										var f = $.verifyLoginUser(i);
										var h = typeof (f) === "boolean" ? $.verifyLoginPassword(g) : f;
										if ("Y" == ifShowRandCode && "Y" == openRandCodeCheck && !$.verifyRandCode($("#randCode")[0], h)) {
											return
										}
										if ("Y" != ifShowRandCode && "Y" != openRandCodeCheck) {
											if (typeof (h) !== "boolean") {
												$("#loginNew_error").html(h).show();
												return
											}
										}
										var k = dhtmlx.modalbox({
													targSrc : '<div style="z-index: 20000; position: fixed; left: 750.5px; top: 237px;"><img src="'
															+ ctx + 'resources/images/loading.gif"></img></div>'
												});
										$.ajax({
													url : passport_login,
													data : {
														username : $("#username").val(),
														password : $("#password").val(),
														appid : passport_appId
													},
													dataType : "json",
													type : "POST",
													xhrFields : {
														withCredentials : true
													},
													success : function(e) {
														dhtmlx.modalbox.hide(k);
														if (e.result_code == 0) {
															$.submitLogin()
														} else {
															dhtmlx.alert({
																		title : messages["message.error"],
																		ok : messages["button.ok"],
																		text : e.result_message,
																		type : "alert-error",
																		callback : function() {
																		}
																	});
															if ("Y" == ifShowRandCode
																	&& "Y" == openRandCodeCheck) {
																$.refreshImg("login", "sjrand");
																$("#randCode").val("")
															}
															$("#password").val("");
															return false
														}
													}
												})
									})
				},
				forgetMyPassword : function() {
					$("#forget_password_id").on(
									"click",
									function(d) {
										otsRedirect("post", ctx + "forgetPassword/initforgetMyPassword")
									})
				},
				submitLogin : function() {
					otsRedirect("post", ctx + "login/userLogin")
				},
				alertErrorMsg : function(d, e) {
					dhtmlx.alert({
						title : messages["message.error"],
						ok : messages["button.ok"],
						text : e,
						type : "alert-error",
						callback : function() {
							if (d) {
								obj.focus()
							}
						}
					})
				},
				styleSet : function() {
					$("#username").css("color", "#333");
					$("#password").css("color", "#333");
					$("#randCode").css("color", "#333");
					if ($("#username").val() == "" || $("#username").val() == a
							|| $("#username").val() == null) {
						$("#username").css("color", "#999");
						$("#username").val(a)
					}
					$("#username").focus(function() {
						var d = $("#username").val();
						if (d == a) {
							$("#username").css("color", "#333");
							$("#username").val("")
						}
					}).blur(function() {
						var d = $("#username").val();
						if (d == "") {
							$("#username").css("color", "#999");
							$("#username").val(a)
						}
					});
					$("#username").on("input", function() {
						$("#loginNew_error").hide()
					});
					$("#password").on("input", function() {
						$("#loginNew_error").hide()
					})
				},
				verifyRandCode : function(g, e) {
					if (typeof (e) !== "boolean") {
						$.showError(g, e);
						return false
					}
					var d = g.value;
					var f = typeof ($.getErrorMessage) === "function" ? $.getErrorMessage(g) : login_messages.pleaseClickCaptcha;
					if ("" == d || null == d) {
						$.showError(g, f, 1);
						return false
					}
					if (!$.checkRandCode(g)) {
						f = typeof ($.getErrorMessage) === "function" ? $.getErrorMessage(g, false) : login_messages.pleaseClickCaptcha;
						$.showError(g, f, 1);
						return false
					}
					$.showError(g).hide();
					return true
				},
				checkRandCode : function(h) {
					var e = false, d = h.value, f = "sjrand", g = TouClick.get("touclick-" + h.id);
					$.ajax({
						url : passport_captcha_check,
						type : "post",
						dataType : "json",
						xhrFields : {
							withCredentials : true
						},
						data : {
							answer : d,
							login_site : "E",
							rand : f
						},
						async : false,
						success : function(i) {
							if (i.result_code == "4") {
								e = true;
								g.success();
								setTimeout(function() {
									if (g.getState() === "success") {
										g.reload()
									}
								}, 3000)
							} else {
								e = false;
								var j = i.result_message;
								g.fail()
							}
						}
					});
					return e
				},
				getRandCodeName : function(d) {
					var e = "randCode";
					if (d) {
						e += "_" + d
					}
					return e
				},
				showError : function(f, g, d) {
					var h = $(f).data("targetdiv");
					var e = $("#error_msg" + h);
					if (g) {
						e.html(g).show();
						if (d) {
							e.data("tag", d)
						}
					}
					return e
				},
				showRandCodeBefore : function() {
					$(".captchaButton")
							.each(
									function(k, j) {
										var l = $(j);
										var n = l.data("touclick-name");
										var m = '<div class="touclick" name="touclick-' + $.getRandCodeName(n)
												+ '"><div class="touclick-wrapper"><div class="touclick-bgimg touclick-reload touclick-reload-normal"></div><div class="touclick-bgimg touclick-arrow"></div><div class="touclick-img-par touclick-bgimg"  style=" width: 293px; height: 190px;"><img class="touclick-image" alt="" src=""/></div></div></div>';
										l.prepend(m)
									});
					for (var e = 0; e < targetdiv.length; e++) {
						var f = $.getRandCodeName(targetelement[e]);
						$("#" + targetdiv[e]).after(
										'<input type="hidden" name="' + $.getRandCodeName("") + '" data-targetdiv="' + targetdiv[e] + '" id="' + f
												+ '" /><li id="error_msg' + targetdiv[e] + '" class="error" style="display:none" ></li>')
					}
					var h = '<script type="text/javascript" charset="utf-8" async="true" src="' + ctx + 'resources/js/newpasscode/captcha_js.js"><\/script>'
					$("head").append(h);
					var g = '<link type="text/css" rel="stylesheet" href="' + ctx + 'resources/js/newpasscode/captcha_css.css">';
					$("head").append(g);
					var d = '<link type="text/css" rel="stylesheet" href="' + ctx + 'resources/js/newpasscode/local.css">';
					$("head").append(d);
					$("input[id^=randCode]").on("keyup", function() {
						if (c == this.value) {
							return
						}
						if (this.value && this.value.length === 4) {
							$.showError(this).hide();
							$.verifyRandCode(this, true)
						}
					}).focus(function() {
						this.value = ""
					})
				},
				refreshImg : function(f, e, d) {
					var g = "randCode";
					TouClick.get("touclick-" + g).reload()
				},
				showRandCode : function() {
					$.showRandCodeBefore();
					TouClick.ready(function() {
								var n = "randCode";
								var e = $("#" + targetdiv[0]);
								var l = e.data("code_type");
								var i = e.data("touclick-type");
								var k = "E";
								var o = "sjrand";
								var f = TouClick.get("touclick-" + n).start({
													gp_url : passport_captcha + "?login_site=" + k + "&module=" + l + "&rand=" + o,
													onClick : function(q) {
														var s = $("#" + n);
														s.val(q);
														var r = $("#error_msg" + targetdiv[0]);
														var p = s[0];
														if (r.data("tag") === 1) {
															r.hide()
														}
													},
													onReload : function() {
														$("#" + n).val("");
														$("#error_msg").css("display", "none");
														var p = $.jc_getcookie("current_captcha_type")
													},
													onReloading : function() {
														return true
													}
												});
								$("#randCode").css({
									display : "none"
								});
								var g = $(f.getDom());
								g.css({
									"float" : "left"
								});
								var j = g.parent();
								j.css({
									marginTop : "0px",
									height : "auto",
									"padding-left" : "0",
									zoom : "1"
								});
								var m = j.parent();
								var h = $("<ul></ul>");
								h.css({
									"float" : "left",
									width : "147px"
								});
								m.css({
									"float" : "left",
									width : "510px",
									borderLeft : "1px solid #bbb"
								});
								m.find("input").css({
									width : "309px"
								});
								h.insertBefore(m);
								m.children(".txt").css({
									display : "none"
								});
								m.children(".zc").eq(0).children().appendTo(j);
								m.children(".zc").appendTo(h);
								m.children(".error").css({
									position : "absolute"
								}).wrap($("<div></div>").css({
									height : "12px"
								}));
								h.children(".zc").css({
									paddingLeft : "0",
									marginTop : "0px",
									height : "auto",
									paddingRight : "10px",
									zoom : "1"
								}).eq(0).css({
									height : "10px"
								});
								var d = j.children("a").css({
									width : "155px",
									"float" : "left",
									marginLeft : "6px"
								}).eq(0).css({
									marginLeft : "75px"
								});
								f.show();
								$(
										"<a href='../gonggao/yzmsysm.html' target='_blank' style='display:block;float:right;margin-right:11px;font-size:12px;line-height:25px;'>验证码如何使用？</a>")
										.insertBefore(d);
								m.parent().css({
									height : "340px"
								}).parent().next().css({
									height : "360px"
								}).find("li").css({
									paddingTop : "28px"
								});
								$(
										'<span style="float:left;padding-right:2px;display:block;height:30px;width:65px;text-align:right;">验证码：</span>')
										.insertBefore(g)
							})
				},
				getErrorMessage : function(e, d, f) {
					if (d === false) {
						return login_messages.pleaseClickCaptchaRight
					}
					return login_messages.pleaseClickBottomCaptcha
				},
				checkUAM : function() {
					var d = $.jc_getcookie("tk");
					if (d == null || d == undefined || d == "") {
						$.ajax({
							type : "POST",
							url : passport_authuam,
							data : {
								appid : passport_appId
							},
							xhrFields : {
								withCredentials : true
							},
							dataType : "json",
							success : function(e) {
								if (e.result_code == "0") {
									var f = e.newapptk || e.apptk;
									$.uampassport(f)
								}
							},
							error : function() {
							}
						})
					} else {
						$.uampassport(d)
					}
				},
				uampassport : function(d) {
					$.ajax({
						type : "POST",
						url : ctx + passport_authclient,
						data : {
							tk : d
						},
						datatype : "json",
						success : function(e) {
							if (e.result_code == 0) {
								window.location.href = ctx + passport_okPage
							}
						},
						error : function() {
						}
					})
				}
			});
	$(document).ready(function() {
		if ("undefined" != typeof (activeSuc)) {
			if ("Y" == activeSuc) {
				dhtmlx.createWin({
					winId : "dialog_active_succ",
					closeWinId : [ "dialog_active_close" ],
					okId : "dialog_active_ok",
					okCallBack : function() {
					}
				})
			}
		}
		if ("undefined" != typeof (resetPwdSucFlag)) {
			if ("Y" == resetPwdSucFlag) {
				dhtmlx.createWin({
					winId : "dialog_restPwd_succ",
					closeWinId : [ "dialog_restPwd_close" ],
					okId : "dialog_restPwd_ok",
					okCallBack : function() {
					}
				})
			}
		}
		if ("undefined" != typeof (noticeSessionCollect)) {
			if ("Y" == noticeSessionCollect) {
				dhtmlx.createWin({
					winId : "dialog_sessionCollect",
					closeWinId : [ "dialog_sessionCollect_close" ],
					okId : "dialog_sessionCollect_ok",
					okCallBack : function() {
					}
				})
			}
		}
		$.checkUAM();
		$.onBlurCheck();
		$.loginClick();
		$.styleSet();
		$.forgetMyPassword();
		$.showRandCode()
	})
})();
jQuery.validator
		.addMethod(
				"checkLoginUserName",
				function(f, d) {
					var a = false;
					var c = /^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])\d{8}$/;
					var b = /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/;
					var e = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
					if (b.test(f) || e.test(f) || c.test(f)) {
						a = true
					}
					return this.optional(d) || a
				}, "wrong username.");
jQuery.validator.addMethod("requiredUserName", function(b, a) {
	if ("用户名／邮箱／手机号" == b) {
		return false
	}
	if (b == null || "" == b) {
		return false
	}
	return true
}, "wrong username.");
jQuery.validator.addMethod("requiredSchoolName", function(b, a) {
	if ("简码／汉字" == b) {
		return false
	}
	if (b == null || "" == b) {
		return false
	}
	return true
}, "wrong schoolname.");
jQuery.validator.addMethod("randCodeRequired", function(b, a) {
	$("#i-ok").css("display", "none");
	return b.length > 0
}, "验证码错误!");
jQuery.validator.addMethod("randCodeFormat", function(c, b) {
	$("#i-ok").css("display", "none");
	var a = /^[a-zA-Z0-9]+$/;
	return this.optional(b) || a.test(c)
}, "验证码错误!");
jQuery.validator.addMethod("randCodeLength", function(b, a) {
	$("#i-ok").css("display", "none");
	return b.length == 4
}, "验证码错误!.");
jQuery.validator.addMethod("integrationCheck", function(b, a) {
	var c = /^\d{6}$/;
	return this.optional(a) || c.test(b)
}, "wrong integrationpassword");
jQuery.validator.addMethod("integrationPwdCheck", function(b, a, c) {
	if ($("#" + c[0]).val() == $("#" + c[1]).val()) {
		return true
	}
	return false
}, "两次输入密码不一致!.");
jQuery.validator.addMethod("checkRandCode", function(c, b, d) {
	var a = true;
	if (c && c.length == 4) {
		$.ajax({
			url : ctx + "passcodeNew/checkRandCodeAnsyn",
			type : "post",
			data : {
				randCode : c,
				rand : d
			},
			async : false,
			success : function(e) {
				if (e.data == "N") {
					a = false;
					$("#i-ok").css("display", "none")
				} else {
					a = true;
					$("#i-ok").css("display", "block")
				}
			}
		})
	} else {
		a = false;
		$("#i-ok").css("display", "none")
	}
	return a
}, "验证码错误!.");
jQuery.validator.addMethod("validateUsersName", function(b, a) {
	return this.optional(a) || /^[A-Za-z]{1}([A-Za-z0-9]|[_]){0,29}$/.test(b)
}, "用户名只能由字母、数字或_组成");
jQuery.validator.addMethod("checkWriteSpace", function(c, b) {
	for (var a = 0; a < c.length; a++) {
		if (c.charCodeAt(a) == 32) {
			return false
		}
	}
	return true
}, "contain writespace");
jQuery.validator.addMethod("validateRandCode", function(b, a) {
	return this.optional(a) || /^[a-zA-Z0-9]+$/.test(b)
}, "验证码错误!.");
jQuery.validator.addMethod("checkPassward", function(c, b, e) {
	var d = true;
	for (var a = 0; a < c.length; a++) {
		if (c.charCodeAt(a) == 39 || c.charCodeAt(a) == 60
				|| c.charCodeAt(a) == 62) {
			d = false
		}
		if (!d) {
			break
		}
	}
	return this.optional(b) || d
}, "Passward wrong");
function validateSecIdCard(g) {
	var f = 0;
	var a = g;
	var e = {
		11 : "北京",
		12 : "天津",
		13 : "河北",
		14 : "山西",
		15 : "内蒙",
		21 : "辽宁",
		22 : "吉林",
		23 : "黑龙",
		31 : "上海",
		32 : "江苏",
		33 : "浙江",
		34 : "安徽",
		35 : "福建",
		36 : "江西",
		37 : "山东",
		41 : "河南",
		42 : "湖北",
		43 : "湖南",
		44 : "广东",
		45 : "广西",
		46 : "海南",
		50 : "重庆",
		51 : "四川",
		52 : "贵州",
		53 : "云南",
		54 : "西藏",
		61 : "陕西",
		62 : "甘肃",
		63 : "青海",
		64 : "宁夏",
		65 : "新疆",
		71 : "台湾",
		81 : "香港",
		82 : "澳门",
		91 : "国外"
	};
	if (!/^\d{17}(\d|x)$/i.test(a)) {
		return false
	}
	a = a.replace(/x$/i, "a");
	if (e[parseInt(a.substr(0, 2))] == null) {
		return false
	}
	var c = a.substr(6, 4) + "-" + Number(a.substr(10, 2)) + "-"
			+ Number(a.substr(12, 2));
	var h = new Date(c.replace(/-/g, "/"));
	if (c != (h.getFullYear() + "-" + (h.getMonth() + 1) + "-" + h.getDate())) {
		return false
	}
	for (var b = 17; b >= 0; b--) {
		f += (Math.pow(2, b) % 11) * parseInt(a.charAt(17 - b), 11)
	}
	if (f % 11 != 1) {
		return false
	}
	return true
}
function validateFirIdCard(g) {
	var f = 0;
	var a;
	var e = {
		11 : "北京",
		12 : "天津",
		13 : "河北",
		14 : "山西",
		15 : "内蒙",
		21 : "辽宁",
		22 : "吉林",
		23 : "黑龙",
		31 : "上海",
		32 : "江苏",
		33 : "浙江",
		34 : "安徽",
		35 : "福建",
		36 : "江西",
		37 : "山东",
		41 : "河南",
		42 : "湖北",
		43 : "湖南",
		44 : "广东",
		45 : "广西",
		46 : "海南",
		50 : "重庆",
		51 : "四川",
		52 : "贵州",
		53 : "云南",
		54 : "西藏",
		61 : "陕西",
		62 : "甘肃",
		63 : "青海",
		64 : "宁夏",
		65 : "新疆",
		71 : "台湾",
		81 : "香港",
		82 : "澳门",
		91 : "国外"
	};
	if (g.length == 15) {
		a = idCardUpdate(g)
	} else {
		a = g
	}
	if (!/^\d{17}(\d|x)$/i.test(a)) {
		return false
	}
	a = a.replace(/x$/i, "a");
	if (e[parseInt(a.substr(0, 2))] == null) {
		return false
	}
	var c = a.substr(6, 4) + "-" + Number(a.substr(10, 2)) + "-"
			+ Number(a.substr(12, 2));
	var h = new Date(c.replace(/-/g, "/"));
	if (c != (h.getFullYear() + "-" + (h.getMonth() + 1) + "-" + h.getDate())) {
		return false
	}
	for (var b = 17; b >= 0; b--) {
		f += (Math.pow(2, b) % 11) * parseInt(a.charAt(17 - b), 11)
	}
	if (f % 11 != 1) {
		return false
	}
	return true
}
function idCardUpdate(g) {
	var b;
	var f = /^(\d){15}$/;
	if (f.test(g)) {
		var e = 0;
		var a = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
		var d = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
		g = g.substr(0, 6) + "19" + g.substr(6, g.length - 6);
		for (var c = 0; c < g.length; c++) {
			e += parseInt(g.substr(c, 1)) * a[c]
		}
		g += d[e % 11];
		b = g
	} else {
		b = "#"
	}
	return b
}
jQuery.validator.addMethod("checkBorth", function(e, c) {
	var b = e;
	if (b == "") {
		return true
	} else {
		var a = b.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
		if (a == null) {
			return false
		}
		var f = new Date(a[1], a[3] - 1, a[4]);
		return (f.getFullYear() == a[1] && (f.getMonth() + 1) == a[3] && f
				.getDate() == a[4])
	}
}, "日期格式不合法");
jQuery.validator.addMethod("byteRangeLength", function(d, b, e) {
	var c = d.length;
	for (var a = 0; a < d.length; a++) {
		if (d.charCodeAt(a) > 127) {
			c++
		}
	}
	return this.optional(b) || (c >= e[0] && c <= e[1])
}, "length wrong");
jQuery.validator.addMethod("checkNameCharBlank", function(c, b, d) {
	var a = d.split("@");
	if ($("#" + a[1]).val() == "") {
		return true
	} else {
		if ($("#" + a[0]).val() == "1" || $("#" + a[0]).val() == "2") {
			return this.optional(b) || /^[a-zA-Z·.．\u3400-\u9FFF]+$/.test(c)
		} else {
			if ($("#" + a[0]).val() == "B") {
				if (/^[-]+$/.test(c)) {
					return false
				}
				return this.optional(b)
						|| /^[a-z A-Z·.．\u3400-\u9FFF\-]+$/.test(c)
			} else {
				if ($("#" + a[0]).val() == "H") {
					if (/^[-]+$/.test(c)) {
						return false
					}
					return this.optional(b)
							|| /^[a-z A-Z·。.．\u3400-\u9FFF-]+$/.test(c)
				} else {
					return this.optional(b)
							|| /^[a-z A-Z·.．\u3400-\u9FFF]+$/.test(c)
				}
			}
		}
	}
}, "wrong name.");
jQuery.validator.addMethod("checkIdValidStr", function(c, b) {
	var a = /^[a-zA-Z0-9\_\-\(\)]+$/;
	return this.optional(b) || (a.test(c))
}, "wrong id");
jQuery.validator.addMethod("isSecIDCard", function(b, a, c) {
	if (!checkIfSecIdCard($(c).val())) {
		return true
	}
	return validateSecIdCard(b)
}, "wrong");
function checkIfSecIdCard(a) {
	if (a == "1") {
		return true
	}
	return false
}
function checkIfFirIdCard(a) {
	if (a == "2") {
		return true
	}
	return false
}
function checkCardForHKorTW(a) {
	if (a == "C" || a == "G") {
		return true
	}
	return false
}
jQuery.validator.addMethod("isFirIDCard", function(b, a, c) {
	if (!checkIfFirIdCard($(c).val())) {
		return true
	}
	return validateFirIdCard(b)
}, "wrong");
jQuery.validator.addMethod("checkHkongMacao", function(c, b, d) {
	if ($(d).val() == "C") {
		var a = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/;
		return this.optional(b) || (a.test(c))
	} else {
		return true
	}
}, "wrong format.");
jQuery.validator.addMethod("checkTaiw", function(c, a, e) {
	if ($(e).val() == "G") {
		var d = /^[0-9]{8}$/;
		var b = /^[0-9]{10}$/;
		return this.optional(a) || (d.test(c)) || (b.test(c))
	} else {
		return true
	}
}, "wrong format.");
jQuery.validator.addMethod("checkPassport", function(d, b, e) {
	if ($(e).val() == "B") {
		var c = /^[a-zA-Z]{5,17}$/;
		var a = /^[a-zA-Z0-9]{5,17}$/;
		return this.optional(b) || (a.test(d)) || c.test(d)
	} else {
		return true
	}
}, "wrong format.");
jQuery.validator.addMethod("checkWork", function(c, b, d) {
	if ($(d).val() == "H") {
		var a = /^[a-zA-Z]{3}[0-9]{12}$/;
		return this.optional(b) || (a.test(c))
	} else {
		return true
	}
}, "wrong format.");
jQuery.validator.addMethod("isMobile", function(d, b) {
	var c = d.length;
	var a = /^(13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9])\d{8}$/;
	return this.optional(b) || (c == 11 && a.test(d))
}, "wrong mobile phone ");
jQuery.validator
		.addMethod(
				"isTelePhone",
				function(b, a) {
					var c = /(^[0-9]{3,4}\-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}#)/;
					return this.optional(a) || (c.test(b))
				}, "wrong telePhone ");
jQuery.validator.addMethod("illegalChar", function(c, b, e) {
	var d = true;
	if (c.indexOf("$") >= 0) {
		return false
	}
	for (var a = 0; a < c.length; a++) {
		if (c.charCodeAt(a) == 39 || c.charCodeAt(a) == 60
				|| c.charCodeAt(a) == 62 || c.charCodeAt(a) == 34
				|| c.charCodeAt(a) == 63) {
			d = false
		}
		if (!d) {
			break
		}
	}
	return this.optional(b) || d
}, "Illegal char wrong");
jQuery.validator.addMethod("isZipCode", function(c, b) {
	var a = /^[0-9]{6}$/;
	return this.optional(b) || (a.test(c))
}, "wrong zipcode");
jQuery.validator.addMethod("isEmail", function(c, a) {
	var b = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return this.optional(a) || (b.test(trim(c)))
}, "wrong email");
function replaceChar(b) {
	var a = b.value.replace(/['"<> ?]/g, "");
	b.value = a
}
function checkNameChar1(a) {
	return /^[a-zA-Z0-9\u3400-\u9FFF]+$/.test(a)
}
function trim(a) {
	return a.replace(/(^\s*)|(\s*$)/g, "")
}
function ltrim(a) {
	return a.replace(/(^\s*)/g, "")
}
function rtrim(a) {
	return a.replace(/(\s*$)/g, "")
}
jQuery.validator.addMethod("validateName", function(b, a) {
	return this.optional(a) || /^[a-zA-Z\u3400-\u9FFF0-9\_]+$/.test(b)
}, "wrong username.");
jQuery.validator.addMethod("studentRequired", function(b, a, c) {
	if ($(c).val() == "3") {
		return b && trim(b) != ""
	}
	return true
}, "wrong studentRequired.");
jQuery.validator.addMethod("studentStationRequired", function(b, a, c) {
	if ($(c).val() == "3") {
		return b && trim(b) != "简拼/全拼/汉字" && trim(b) != ""
	}
	return true
}, "wrong studentStationRequired.");
jQuery.validator.addMethod("studentValidateName", function(b, a, c) {
	if ($(c).val() == "3") {
		return this.optional(a) || /^[a-zA-Z\u3400-\u9FFF0-9\_]+$/.test(b)
	}
	return true
}, "wrong username.");
jQuery.validator.addMethod("checkStudentName", function(b, a, c) {
	if ($(c).val() == "3") {
		if ((!b || trim(b) == "" || trim(b) == "简码/汉字")) {
			return false
		}
	}
	return true
}, "wrong username.");
jQuery.validator.addMethod("isQuestionNull", function(b, a, c) {
	if (jQuery.trim(b) != "") {
		if (jQuery.trim($(c[0]).val()) == "customQuestion"
				&& jQuery.trim($(c[1]).val()) == ""
				|| jQuery.trim($(c[0]).val()) == "") {
			return false
		}
	}
	return true
}, "you should input the question");
jQuery.validator.addMethod("isAnswerNull", function(b, a, c) {
	if ((jQuery.trim($(c[0]).val()) == "customQuestion" && jQuery.trim($(c[1])
			.val()) != "")
			|| (jQuery.trim($(c[0]).val()) != "")) {
		if (jQuery.trim(b) == "") {
			return false
		}
	}
	return true
}, "you should input the answer");
function checkSex(c, b, a) {
	if (!checkSexByCardId(c, b, a)) {
		if (!confirm("性别与身份证中的性别不符，是否继续?")) {
			return false
		} else {
			return true
		}
	} else {
		return true
	}
}
function checkSexByCardId(c, e, a) {
	function b(h, i) {
		var g = null;
		if (i.length == 15) {
			g = i.substring(14, 15)
		} else {
			if (i.length == 18) {
				g = i.substring(16, 17)
			} else {
				return true
			}
		}
		if (g == "x" || g == "X") {
			g = "10"
		}
		var f = parseInt(g);
		var j = f % 2;
		if (j === 0 && h === "F") {
			return true
		} else {
			if (j === 1 && h === "M") {
				return true
			} else {
				return false
			}
		}
	}
	var d = $(a).val();
	if (checkIfSecIdCard($(e).val()) && validateSecIdCard(d)) {
		if (d !== "") {
			return b(c, d)
		} else {
			return true
		}
	} else {
		if (checkIfFirIdCard($(e).val()) && validateFirIdCard(d)) {
			if (d !== "") {
				return b(c, d)
			} else {
				return true
			}
		} else {
			return true
		}
	}
}
function checkBirdDateByCardId(c, e, b) {
	var a = null;
	var d = $(b).val();
	if (checkIfSecIdCard($(e).val()) && d !== "" && validateSecIdCard(d)) {
		a = d.substring(6, 14)
	} else {
		if (checkIfFirIdCard($(e).val()) && d !== "" && validateFirIdCard(d)) {
			if (d.length == 15) {
				a = "19" + d.substring(6, 12)
			} else {
				if (d.length == 18) {
					a = d.substring(6, 14)
				}
			}
		} else {
			return true
		}
	}
	if (c !== "") {
		c = c.replace(/-/g, "");
		if (c != a) {
			return false
		} else {
			return true
		}
	} else {
		return true
	}
}
function checkBirdate(c, b, a) {
	if (!checkBirdDateByCardId(c, b, a)) {
		if (!confirm("出生日期与身份证中的出生日期不符，是否继续?")) {
			return false
		} else {
			return true
		}
	} else {
		return true
	}
}
jQuery.validator.addMethod("checkPwdValidate", function(b, a) {
	return this.optional(a)
			|| /(?![a-z]+$|[0-9]+$|_+$)^[a-zA-Z0-9_]{6,}$/.test(b)
}, "contain writespace");
jQuery.validator.addMethod("checkConfirmPassWard", function(b, a, c) {
	if ($(c).val() != null) {
		return $(c).val() == b
	}
	return true
}, "contain writespace");
jQuery.validator.addMethod("IVR_passwd_format", function(b, a) {
	var c = /^[0-9]{6}$/;
	return this.optional(a) || c.test(b)
}, "验证码错误!.");
jQuery.validator
		.addMethod(
				"checkStation",
				function(b, a) {
					if ((!b || trim(b) == "" || trim(b) == "简拼/全拼/汉字" || trim(b) == "简拼/全拼/汉字或↑↓")) {
						return false
					}
					return true
				}, "wrong username.");
jQuery.validator.addMethod("checkAnsyUserName", function(e, c, f) {
	var b = f[0];
	var d = $("#" + f[1]).val();
	var a = true;
	$.ajax({
		url : b + "?user_name=" + e,
		type : "get",
		async : false,
		success : function(g, h) {
			if (g.data == true) {
				a = false
			} else {
				a = true
			}
		},
		error : function(g, i, h) {
			a = false
		}
	});
	return a
}, "wrong cardNo");
function checkPwdRank(e, a, d) {
	var b = $(e);
	var c = b.val();
	if (c.length <= 6 || new RegExp("^[a-zA-Z]{6,}$").test(c)
			|| new RegExp("^[0-9]{6,}$").test(c)
			|| new RegExp("^[_]{6,}$").test(c)) {
		$("#" + a).attr("title", "危险");
		$("#" + d).html("危险");
		$("#" + a).removeClass("rank-a");
		$("#" + a).removeClass("rank-b");
		$("#" + a).removeClass("rank-c");
		$("#" + a).addClass("rank-a")
	} else {
		if (c.length > 6 && new RegExp("[a-zA-Z]").test(c)
				&& new RegExp("[0-9]").test(c) && new RegExp("[_]").test(c)) {
			$("#" + a).attr("title", "安全");
			$("#" + d).html("安全");
			$("#" + a).removeClass("rank-a");
			$("#" + a).removeClass("rank-b");
			$("#" + a).removeClass("rank-c");
			$("#" + a).addClass("rank-c")
		} else {
			$("#" + a).attr("title", "一般");
			$("#" + d).html("一般");
			$("#" + a).removeClass("rank-a");
			$("#" + a).removeClass("rank-b");
			$("#" + a).removeClass("rank-c");
			$("#" + a).addClass("rank-b")
		}
	}
}
Array.prototype.unique = function() {
	var b = {}, a = this.length;
	for (var c = 0; c < a; c++) {
		if (typeof b[this[c]] == "undefined") {
			b[this[c]] = 1
		}
	}
	this.length = 0;
	a = 0;
	for ( var c in b) {
		this[a++] = c
	}
	return this
};
function checkSearchPwdRank(h, c, g) {
	var e = $(h);
	var f = e.val();
	if (f.length < 6) {
		$("#" + c).attr("title", "危险");
		$("#" + g).html("危险");
		$("#" + c).removeClass("rank-a");
		$("#" + c).removeClass("rank-b");
		$("#" + c).removeClass("rank-c");
		$("#" + c).addClass("rank-a")
	} else {
		var a = [];
		for (var b = 0; b < 6; b++) {
			a.push(f.charAt(b))
		}
		a = a.unique();
		var d = a.length;
		if (d == 1) {
			$("#" + c).attr("title", "危险");
			$("#" + g).html("危险");
			$("#" + c).removeClass("rank-a");
			$("#" + c).removeClass("rank-b");
			$("#" + c).removeClass("rank-c");
			$("#" + c).addClass("rank-a")
		} else {
			if (d > 1 && d < 5) {
				$("#" + c).attr("title", "一般");
				$("#" + g).html("一般");
				$("#" + c).removeClass("rank-a");
				$("#" + c).removeClass("rank-b");
				$("#" + c).removeClass("rank-c");
				$("#" + c).addClass("rank-b")
			} else {
				$("#" + c).attr("title", "安全");
				$("#" + g).html("安全");
				$("#" + c).removeClass("rank-a");
				$("#" + c).removeClass("rank-b");
				$("#" + c).removeClass("rank-c");
				$("#" + c).addClass("rank-c")
			}
		}
	}
}
jQuery.validator.addMethod("checkDetailAddress", function(b, a) {
	return this.optional(a) || /^[0-9a-zA-Z\u3400-\u9FFF\#]+$/.test(b)
}, "wrong name.");
jQuery.validator.addMethod("checkAddressName", function(b, a) {
	if (/^[-]+$/.test(b)) {
		return false
	}
	return this.optional(a) || /^[a-z A-Z·.．\u3400-\u9FFF\-]+$/.test(b)
			|| /^[a-zA-Z·.．\u3400-\u9FFF]+$/.test(b)
}, "wrong name.");
jQuery.validator.addMethod("checkAddressSelect", function(b, a) {
	if ("" == b) {
		return false
	}
	if (b) {
		return true
	}
	return this.optional(a)
}, "wrong name.");
var login_messages = {
	randCodeError : "验证码错误!",
	randCodeExpired : "验证码失效",
	randCodeLentgh : "验证码长度为4位!",
	randCodeFormat : "验证码只能由数字或字母组成!",
	randCodeEmpty : "验证码不能为空!",
	userNameEmpty : "登录名必须填写!",
	userNameFormat : "登录名格式不正确，请重新输入!",
	passwordEmpty : "密码必须填写,且不少于6位!",
	passwordLength : "密码长度不能少于6位!",
	pleaseClickCaptcha : "请点击验证码",
	pleaseClickLeftCaptcha : "请点击左侧验证码",
	pleaseClickCaptchaRight : "请点击正确的验证码",
	pleaseClickBottomCaptcha : "请点击下方验证码",
	loginError : "当前访问用户过多,请稍候重试!",
	submitAfterVerify : "提交",
	pleaseClickSubmitButtonAfterClick : "pleaseClickSubmitButtonAfterClick",
	leftTicketOrderNoteMessage : '点击"提交"按钮获取验证码',
	leftTicketOrderClickCallbackNoteMessage : '完成选择后，继续点击下方橙色"提交"按钮提交订单',
	leftTicketOrderShowCallbackNoteMessage : "按照提示点击选择所有的图片",
	leftTicketOrderHiddenCallbackNoteMessage : '点击"提交"按钮获取验证码',
	getCaptchaByClick : "点击获取验证码"
};
