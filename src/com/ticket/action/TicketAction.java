package com.ticket.action;

import java.io.PrintWriter;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ticket.service.TicketService;
import com.ticket.service.impl.TicketServiceImpl;

@Controller
@RequestMapping("/login")
public class TicketAction {
	private TicketService service = new TicketServiceImpl();

	@RequestMapping("/captcha")
	public void init(PrintWriter pw) {
//		this.service.loginImageCode();
		pw.write("/img/imgcode.png");
	}

	@RequestMapping("/login")
	public void login(@RequestParam(value = "username") String username,
			@RequestParam(value = "password") String password,
			@RequestParam(value = "randcode") String randcode, PrintWriter pw) {
		service.login(username, password, randcode);
	}
}