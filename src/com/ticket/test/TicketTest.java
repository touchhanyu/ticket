package com.ticket.test;

import org.junit.Test;

import com.ticket.dto.LeftTicketDTO;
import com.ticket.entity.PURPOSE_CODES;
import com.ticket.service.TicketService;
import com.ticket.service.impl.TicketServiceImpl;

public class TicketTest {
	@Test
	public void testQuery() {
		LeftTicketDTO dto = new LeftTicketDTO();
		dto.setTran_date("2017-10-25");
		dto.setFrom_station("BJP");
		dto.setTo_station("HFH");
		dto.setCodes(PURPOSE_CODES.ADULT);
		TicketService impl = new TicketServiceImpl();
		impl.queryTicket(dto, PURPOSE_CODES.ADULT);
	}

	@Test
	public void testUpdate() {
		TicketService impl = new TicketServiceImpl();
		impl.updateStation();
	}

	@Test
	public void testLoginPic() {
		TicketService impl = new TicketServiceImpl();
		impl.loginImageCode();
	}

	@Test
	public void testLogin() {
		TicketService impl = new TicketServiceImpl();
		impl.login("18500613344", "hy", "4");
	}
}