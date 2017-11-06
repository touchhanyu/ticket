package com.ticket.service.impl;

import java.io.File;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import com.ticket.dto.LeftTicketDTO;
import com.ticket.entity.PURPOSE_CODES;
import com.ticket.entity.Ticket;
import com.ticket.service.TicketService;
import com.ticket.util.JsonUtil;
import com.ticket.util.ParseDataHelp;
import com.ticket.util.RandCodeUtil;
import com.ticket.util.RequestUtil;
import com.ticket.util.SQLUtil;

public class TicketServiceImpl implements TicketService {

	@Override
	public List<Ticket> queryTicket(LeftTicketDTO dto) {
		// TODO Auto-generated method stub
		Properties prop = RequestUtil.prop;
		String url = prop.getProperty("query");
		url += "leftTicketDTO.train_date=" + dto.getTran_date() + "&";
		url += "leftTicketDTO.from_station=" + dto.getFrom_station() + "&";
		url += "leftTicketDTO.to_station=" + dto.getTo_station() + "&";
		url += "purpose_codes=" + dto.getCodes().toString();
		String json = RequestUtil.requestGet(url);
		ParseDataHelp help = new ParseDataHelp() {
			@SuppressWarnings("unchecked")
			@Override
			public <E> E parseJson(String json) {
				// TODO Auto-generated method stub
				String[] split = json.split("\\|");
				Ticket ticket = new Ticket();
				ticket.setSecretStr(split[0]);
				ticket.setTrain_no(split[2]);
				ticket.setStation_train_code(split[3]);
				ticket.setStart_station_telecode(split[4]);
				ticket.setStart_station_name(split[6]);
				ticket.setEnd_station_telecode(split[5]);
				ticket.setEnd_station_name(split[7]);
				ticket.setStart_time(split[8]);
				ticket.setArrive_time(split[9]);
				ticket.setLishi(split[10]);
				String s11 = split[11];
				String s12 = split[12];
				ticket.setStart_train_date(split[13]);
				ticket.setTrain_seat_feature(split[14]);
				String s15 = split[15];
				String s16 = split[16];
				String s17 = split[17];
				ticket.setIs_support_card(split[18]);
				ticket.setControl_day(split[19]);
				String s20 = split[20];
				ticket.setGr_num(split[21]);
				String s22 = split[22];
				ticket.setRw_num(split[23]);
				ticket.setRz_num(split[24]);
				String s25 = split[25];
				ticket.setWz_num(split[26]);
				String s27 = split[27];
				ticket.setYw_num(split[28]);
				ticket.setYz_num(split[29]);
				ticket.setZe_num(split[30]);
				ticket.setZy_num(split[31]);
				ticket.setTz_num(split[32]);
				String s33 = split[33];
				ticket.setSeat_feature(split[34]);
				ticket.setSeat_types(split[35]);
				return (E) ticket;
			}
		};
		List<Ticket> tickets = null;
		if (json != null && !"".equals(json))
			tickets = JsonUtil.parse(json, Ticket.class, help);
		return tickets;
	}

	@Override
	public void updateStation() {
		// TODO Auto-generated method stub
		Properties prop = RequestUtil.prop;
		String url = prop.getProperty("station");
		String json = RequestUtil.requestGet(url);
		String value = json.split("=")[1];
		value = value.replaceAll("'", "");
		value = value.replaceAll(";", "");
		String[] split = value.split("@");
		for (int i = 0; i < split.length; i++) {
			String str = split[i];
			if (str != null && !"".equals(str)) {
				String[] split2 = str.split("\\|");
				String sql = "insert into station values(?,?,?,?)";
				HashMap<Integer, Object> map = new HashMap<Integer, Object>();
				map.put(1, split2[2]);
				map.put(2, split2[1]);
				map.put(3, split2[3]);
				map.put(4, split2[5]);
				SQLUtil.insert(sql, map);
			}
		}
	}

	@Override
	public String loginImageCode() {
		// TODO Auto-generated method stub
		String url = RequestUtil.prop.getProperty("init");
		RequestUtil.requestGet(url);
		url = RequestUtil.prop.getProperty("captcha");
		String path = TicketServiceImpl.class.getResource("/").getPath();
		path = URLDecoder.decode(path);
		File file = new File(path);
		path = file.getParentFile().getParentFile().getPath() + File.separator + "img";
		String fileName = "imgcode.png";
		return RequestUtil.requsetImg(url, "UTF-8", path, fileName);
	}

	@Override
	public void login(String username, String password, String randCode) {
		// TODO Auto-generated method stub
		String[] split = randCode.split(",");
		randCode = "";
		for (int i = 0; i < split.length; i++) {
			String xy = split[i];
			int index = Integer.parseInt(xy);
			randCode += RandCodeUtil._4x2[index - 1];
			if (i != split.length -1)
				randCode += ",";
		}
		String url = RequestUtil.prop.getProperty("captchacheck");
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("answer", randCode);
		map.put("login_site", "E");
		map.put("rand", "sjrand");
		String s = RequestUtil.requestPost(url, map);
		System.out.println(s);
		map.clear();
		url = RequestUtil.prop.getProperty("login");
		map.put("username", username);
		map.put("password", password);
		map.put("appid", "otn");
		String json = RequestUtil.requestPost(url, map);
		System.out.println(json);
		map.clear();
		url = RequestUtil.prop.getProperty("userLogin");
		map.put("_json_att", "");
		String ss = RequestUtil.requestPost(url, map);
		System.out.println(ss);
		url = RequestUtil.prop.getProperty("login2");
		String str = RequestUtil.requestGet(url);
		System.out.println(str);
	}

	@Override
	public void booking(String secretStr, String trainDate, String backTrainDate,
			PURPOSE_CODES purposeCodes, String queryFromStation, String queryToStation) {
		// TODO Auto-generated method stub
		String url = RequestUtil.prop.getProperty("checkUser");
		Map<String, String> para = new HashMap<String, String>();
		para.put("_json_att", "");
		System.out.println(RequestUtil.requestPost(url, para));
		para.clear();
		url = RequestUtil.prop.getProperty("booking");
		para.put("secretStr", secretStr);
		para.put("train_date", trainDate);
		para.put("back_train_date", backTrainDate);
		para.put("tour_flag", "dc");
		para.put("purpose_codes", purposeCodes.toString());
		para.put("query_from_station_name", queryFromStation);
		para.put("query_to_station_name", queryToStation);
		para.put("undefined", "");
//		String str = RequestUtil.requestPost(url, para);
//		System.out.println(str);
	}

	@Override
	public void initParam() {
		// TODO Auto-generated method stub
		String url = RequestUtil.prop.getProperty("initDc");
		Map<String, String> para = new HashMap<String, String>();
		para.put("_json_att", "");
		String str = RequestUtil.requestPost(url, para);
		System.out.println(str);
	}
}