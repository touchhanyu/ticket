package com.ticket.test;

import java.util.List;
import java.util.Scanner;

import org.junit.Test;

import com.ticket.dto.LeftTicketDTO;
import com.ticket.entity.PURPOSE_CODES;
import com.ticket.entity.Ticket;
import com.ticket.service.TicketService;
import com.ticket.service.impl.TicketServiceImpl;

public class TicketTest {
	private TicketService impl = new TicketServiceImpl();

	@Test
	public void testQuery() {
		LeftTicketDTO dto = new LeftTicketDTO();
		dto.setTran_date("2017-11-31");
		dto.setFrom_station("BJP");
		dto.setTo_station("HFH");
		dto.setCodes(PURPOSE_CODES.ADULT);
		impl.queryTicket(dto);
	}

	@Test
	public void testUpdate() {
		impl.updateStation();
	}

	@Test
	public void testLoginPic() {
		impl.loginImageCode();
	}

	@Test
	public void testLogin() {
		impl.loginImageCode();
		Scanner sc = new Scanner(System.in);
		System.out.println("password:");
		String pw = sc.nextLine();
		System.out.println("randCode:");
		String randCode = sc.nextLine();
		sc.close();
		impl.login("18500613344", pw, randCode);
	}

	@Test
	public void testBooking() {
		testLogin();
		LeftTicketDTO dto = new LeftTicketDTO();
		dto.setTran_date("2017-11-30");
		dto.setFrom_station("BJP");
		dto.setTo_station("HFH");
		dto.setCodes(PURPOSE_CODES.ADULT);
		List<Ticket> list = this.impl.queryTicket(dto);
		if (list != null && list.size() > 0) {
			Ticket ticket = list.get(0);
			String secretStr = ticket.getSecretStr();
			String trainDate = "2017-11-30";
			impl.booking(secretStr, trainDate, trainDate, dto.getCodes(), "北京", "合肥");
			impl.initParam();
		}
	}
}