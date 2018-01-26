package com.ticket.action;

import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.google.gson.Gson;
import com.ticket.dto.LeftTicketDTO;
import com.ticket.dto.StationDTO;
import com.ticket.dto.TicketGridDTO;
import com.ticket.entity.PURPOSE_CODES;
import com.ticket.entity.Ticket;
import com.ticket.service.TicketService;
import com.ticket.service.impl.TicketServiceImpl;

@Controller
@RequestMapping("/ticket")
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

	@RequestMapping("/ticketQuery")
	public void queryTicket(@RequestParam(value = "tranDate") String tranDate,
			@RequestParam(value = "from_station") String from_station,
			@RequestParam(value = "to_station") String to_station, PrintWriter pw) {
		List<Ticket> list = null;
		if (tranDate == null || "".equals(tranDate)) {
			list = new ArrayList<Ticket>();
		} else {
			LeftTicketDTO dto = new LeftTicketDTO();
			dto.setTran_date(tranDate);
			dto.setFrom_station(from_station);
			dto.setTo_station(to_station);
			dto.setCodes(PURPOSE_CODES.ADULT);
			list = service.queryTicket(dto);
			if (list == null)
				list = new ArrayList<Ticket>();
		}
		Gson gson = new Gson();
		TicketGridDTO grid = new TicketGridDTO();
		grid.setPage(list.size());
		grid.setRows(list);
		String json = gson.toJson(grid);
		pw.print(json);
	}

	@RequestMapping("/queryStation")
	public void queryStation(String pinyin, PrintWriter pw) {
		List<StationDTO> list = this.service.queryStation(pinyin);
		Gson gson = new Gson();
		String json = gson.toJson(list);
		pw.print(json);
	}
}