package com.ticket.service;

import java.util.List;

import com.ticket.dto.LeftTicketDTO;
import com.ticket.entity.PURPOSE_CODES;
import com.ticket.entity.Ticket;

public interface TicketService {
	/**
	 * 查询
	 * 
	 * @param leftTicketDTO
	 * @return
	 */
	public List<Ticket> queryTicket(LeftTicketDTO leftTicketDTO);

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

	/**
	 * 预定
	 * 
	 * @param secretStr
	 * @param trainDate
	 * @param backTrainDate
	 * @param tourFlag
	 * @param purposeCodes
	 * @param queryFromStation
	 * @param queryToStation
	 */
	public void booking(String secretStr, String trainDate, String backTrainDate, PURPOSE_CODES purposeCodes, String queryFromStation, String queryToStation);

	public void initParam();
}