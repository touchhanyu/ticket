package com.ticket.dto;

import java.util.List;

public class TicketGridDTO {
	private int page;
	private List rows;

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public List getRows() {
		return rows;
	}

	public void setRows(List rows) {
		this.rows = rows;
	}
}