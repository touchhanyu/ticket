package com.ticket.entity;

public enum PURPOSE_CODES {
	ADULT("成人", "ADULT"), STUDENT("学生", "0X00");
	private String name;
	private String value;

	private PURPOSE_CODES(String name, String value) {
		this.name = name;
		this.value = value;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return this.value;
	}
}