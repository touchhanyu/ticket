package com.ticket.entity;

public class Station {
	private String station_name;
	private String station_cname;
	private String pinyin;
	private String id;

	public String getStation_name() {
		return station_name;
	}

	public void setStation_name(String station_name) {
		this.station_name = station_name;
	}

	public String getStation_cname() {
		return station_cname;
	}

	public void setStation_cname(String station_cname) {
		this.station_cname = station_cname;
	}

	public String getPinyin() {
		return pinyin;
	}

	public void setPinyin(String pinyin) {
		this.pinyin = pinyin;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
}