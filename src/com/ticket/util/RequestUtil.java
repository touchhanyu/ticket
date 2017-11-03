package com.ticket.util;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;
import java.util.Set;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLSession;

import org.apache.log4j.Logger;

import com.ticket.entity.TicketSession;

public class RequestUtil {
	public static Properties prop;// 配置文件
	public static final String CHARSET = "UTF-8";
	private static Logger logger = Logger.getLogger(RequestUtil.class);
	private static Map<String, TicketSession> sessions = new HashMap<String, TicketSession>();

	static {
		InputStream is = null;
		try {
			String path = "/com/ticket/common/url.properties";
			is = RequestUtil.class.getResourceAsStream(path);
			prop = new Properties();
			prop.load(is);
		} catch (Exception e) {
			// TODO: handle exception
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
	}

	public static String requestGet(String strUrl) {
		InputStream is = request(strUrl, "GET", null);
		String json = dealJson(is, CHARSET);
		return json;
	}

	public static String requestGet(String strUrl, String charSet) {
		InputStream is = request(strUrl, "GET", null);
		String json = dealJson(is, charSet);
		return json;
	}

	public static String requsetImg(String url, String charSet, String path, String fileName) {
		InputStream is = request(url, "GET", null);
		return dealImage(is, charSet, path, fileName);
	}

	public static String requestPost(String strUrl, Map<String, String> map) {
		InputStream is = request(strUrl, "POST", map);
		String json = dealJson(is, CHARSET);
		return json;
	}

	public static String requestPost(String strUrl, Map<String, String> map, String charSet) {
		InputStream is = request(strUrl, "POST", map);
		String json = dealJson(is, charSet);
		return json;
	}

	private static InputStream request(String strUrl, String method, Map<String, String> map) {
		boolean checkHttps = false;
		if (strUrl.startsWith("https")) {
			checkHttps = true;
			HttpsUtil.trustAllHost();
		}
		URL url = null;
		HttpURLConnection http = null;
		HttpsURLConnection https = null;
		InputStream is = null;
		try {
			url = new URL(strUrl);
			String host = url.getHost();
			TicketSession tSession = sessions.get(host);
			URLConnection conn = url.openConnection();
			if (checkHttps) {
				https = (HttpsURLConnection) conn;
				https.setHostnameVerifier(new HostnameVerifier() {
					@Override
					public boolean verify(String arg0, SSLSession arg1) {
						// TODO Auto-generated method stub
						return true;
					}
				});
				https.setRequestMethod(method);
				https.setDoOutput(true);
				https.setDoInput(true);
				https.setUseCaches(false);
				https.setInstanceFollowRedirects(true);
				if (tSession != null)
					https.setRequestProperty("Cookie", tSession.toString());
				https.setRequestProperty("Accpet", "application/json, text/javascript, */*; q=0.01");
				https.setRequestProperty("Accpet-Encoding", "gzip, deflate, br");
				https.setRequestProperty("Accpet-Language", "zh-CN,zh;q=0.8");
				https.setRequestProperty("Connection", "keep-alive");
				https.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
				https.setRequestProperty("X-Requested-With", "XMLHttpRequest");
				https.connect();
				StringBuffer sb = new StringBuffer();
				if ("POST".equals(method)) {
					if (map != null && map.size() > 0) {
						DataOutputStream dos = new DataOutputStream(https.getOutputStream());
						Set<Entry<String, String>> entrySet = map.entrySet();
						Iterator<Entry<String, String>> it = entrySet.iterator();
						while (it.hasNext()) {
							Entry<String, String> entry = it.next();
							sb.append(entry.getKey());
							sb.append("=").append(entry.getValue()).append("&");
						}
						String str = sb.toString();
						System.out.println(str);
						dos.write(str.getBytes(CHARSET));
						dos.flush();
						dos.close();
					}
				}
				String session = https.getHeaderField("Set-Cookie").split(";")[0];
				System.out.println(session);
				sessions.put(host, null);
				is = https.getInputStream();
			} else {
				http = (HttpURLConnection) conn;
				http.setRequestMethod(method);
				if ("POST".equals(method)) {
					Set<Entry<String, String>> entrySet = map.entrySet();
					Iterator<Entry<String, String>> it = entrySet.iterator();
					while (it.hasNext()) {
						Entry<String, String> entry = it.next();
						http.setRequestProperty(entry.getKey(), entry.getValue());
					}
				}
				http.setDoInput(true);
				http.setDefaultUseCaches(false);
				http.connect();
				is = http.getInputStream();
			}
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return is;
	}

	private static String dealJson(InputStream is, String charSet) {
		String json = null;
		InputStreamReader isr = null;
		try {
			isr = new InputStreamReader(is, charSet);
			BufferedReader br = new BufferedReader(isr);
			StringBuffer sb = new StringBuffer();
			while (true) {
				String line = br.readLine();
				if (line == null)
					break;
				sb.append(line);
			}
			json = sb.toString();
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return json;
	}

	private static String dealImage(InputStream is, String charSet, String path, String fileName) {
		String outputPath = path + File.separator + fileName;
		FileOutputStream fos = null;
		try {
			fos = new FileOutputStream(outputPath);
			byte[] b = new byte[1024];
			int len = 0;
			while (true) {
				len = is.read(b);
				if (len == -1)
					break;
				fos.write(b, 0, len);
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			if (fos != null) {
				try {
					fos.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return outputPath;
	}
}