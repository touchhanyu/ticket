package com.ticket.dto;

import com.ticket.entity.PURPOSE_CODES;

public class LeftTicketDTO {
	private String tran_date;
	private String from_station;
	private String to_station;
	private PURPOSE_CODES codes;

	public String getTran_date() {
		return tran_date;
	}

	public void setTran_date(String tran_date) {
		this.tran_date = tran_date;
	}

	public String getFrom_station() {
		return from_station;
	}

	public void setFrom_station(String from_station) {
		this.from_station = from_station;
	}

	public String getTo_station() {
		return to_station;
	}

	public void setTo_station(String to_station) {
		this.to_station = to_station;
	}

	public PURPOSE_CODES getCodes() {
		return codes;
	}

	public void setCodes(PURPOSE_CODES codes) {
		this.codes = codes;
	}
}