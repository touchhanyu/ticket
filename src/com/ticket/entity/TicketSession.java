package com.ticket.entity;

import com.ticket.annotation.TCookie;

public class TicketSession {
	@TCookie("JSESSIONID")
	private String JSESSIONID;
	@TCookie("BIGipServerotn")
	private String BIGipServerotn;
	@TCookie("BIGipServerpassport")
	private String BIGipServerpassport;
	@TCookie("BIGipServerpool_passport")
	private String BIGipServerpool_passport;
	@TCookie("RAIL_DEVICEID")
	private String RAIL_DEVICEID;
//	private String RAIL_EXPIRATION;
	@TCookie("route")
	private String route;
	@TCookie("_passport_ct")
	private String _passport_ct;
	@TCookie("_passport_session")
	private String _passport_session;
	private String _jc_save_wfdc_flag = "dc";
	private String current_captcha_type = "Z";
	private String uamtk;

	public String getJSESSIONID() {
		return JSESSIONID;
	}

	public void setJSESSIONID(String jSESSIONID) {
		JSESSIONID = jSESSIONID;
	}

	public String getBIGipServerotn() {
		return BIGipServerotn;
	}

	public void setBIGipServerotn(String bIGipServerotn) {
		BIGipServerotn = bIGipServerotn;
	}

	public String getBIGipServerpassport() {
		return BIGipServerpassport;
	}

	public void setBIGipServerpassport(String bIGipServerpassport) {
		BIGipServerpassport = bIGipServerpassport;
	}

	public String getBIGipServerpool_passport() {
		return BIGipServerpool_passport;
	}

	public void setBIGipServerpool_passport(String bIGipServerpool_passport) {
		BIGipServerpool_passport = bIGipServerpool_passport;
	}

	public String getRAIL_DEVICEID() {
		return RAIL_DEVICEID;
	}

	public void setRAIL_DEVICEID(String rAIL_DEVICEID) {
		RAIL_DEVICEID = rAIL_DEVICEID;
	}

	public String getRoute() {
		return route;
	}

	public void setRoute(String route) {
		this.route = route;
	}

	public String get_passport_ct() {
		return _passport_ct;
	}

	public void set_passport_ct(String _passport_ct) {
		this._passport_ct = _passport_ct;
	}

	public String get_passport_session() {
		return _passport_session;
	}

	public void set_passport_session(String _passport_session) {
		this._passport_session = _passport_session;
	}

	public String get_jc_save_wfdc_flag() {
		return _jc_save_wfdc_flag;
	}

	public void set_jc_save_wfdc_flag(String _jc_save_wfdc_flag) {
		this._jc_save_wfdc_flag = _jc_save_wfdc_flag;
	}

	public String getCurrent_captcha_type() {
		return current_captcha_type;
	}

	public void setCurrent_captcha_type(String current_captcha_type) {
		this.current_captcha_type = current_captcha_type;
	}

	public String getUamtk() {
		return uamtk;
	}

	public void setUamtk(String uamtk) {
		this.uamtk = uamtk;
	}

	@Override
	public String toString() {
		String str = "";
		if (JSESSIONID != null)
			str += "JSESSIONID=" + JSESSIONID + ";";
		if (BIGipServerotn != null)
			str += "BIGipServerotn=" + BIGipServerotn + ";";
		if (BIGipServerpassport != null)
			str += "BIGipServerpassport=" + BIGipServerpassport + ";";
		if (BIGipServerpool_passport != null)
			str += "BIGipServerpool_passport=" + BIGipServerpool_passport + ";";
		if (RAIL_DEVICEID != null)
			str += "RAIL_DEVICEID=" + RAIL_DEVICEID + ";";
		if (route != null)
			str += "route=" + route + ";";
		if (_passport_ct != null)
			str += "_passport_ct=" + _passport_ct + ";";
		if (_passport_session != null)
			str += "_passport_session=" + _passport_session + ";";
		if (_jc_save_wfdc_flag != null)
			str += "_jc_save_wfdc_flag=" + _jc_save_wfdc_flag + ";";
		if (current_captcha_type != null)
			str += "current_captcha_type=" + current_captcha_type + ";";
		if (uamtk != null)
			str += "tk=" + uamtk;
		return str;
	}
}