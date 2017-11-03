package com.ticket.service;

import java.util.List;

import com.ticket.dto.LeftTicketDTO;
import com.ticket.entity.PURPOSE_CODES;
import com.ticket.entity.Ticket;

public interface TicketService {
	/**
	 * 查询
	 * 
	 * @param from
	 * @param to
	 * @param date
	 * @param code
	 * @return
	 */
	public List<Ticket> queryTicket(LeftTicketDTO leftTicketDTO, PURPOSE_CODES code);

	/**
	 * 同步车站信息
	 */
	public void updateStation();

	/**
	 * 登录验证码
	 * 
	 * @return
	 */
	public String loginImageCode();

	/**
	 * 登录
	 * 
	 * @param username
	 * @param password
	 * @param randcode
	 */
	public void login(String username, String password, String randcode);
}