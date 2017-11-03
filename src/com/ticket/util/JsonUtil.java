package com.ticket.util;

import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class JsonUtil {
	public static <E> List<E> parse(String json, Class<E> cls, ParseDataHelp help) {
		if (json == null && "".equals(json))
			return null;
		JsonParser parser = new JsonParser();
		JsonObject jsonObject = (JsonObject) parser.parse(json);
		JsonObject data = jsonObject.get("data").getAsJsonObject();
		JsonArray array = data.get("result").getAsJsonArray();
		ArrayList<E> list = new ArrayList<E>();
		for (int i = 0; i < array.size(); i++) {
			String str = array.get(i).getAsString();
			E e = help.parseJson(str);
			list.add(e);
		}
		return list;
	}
}