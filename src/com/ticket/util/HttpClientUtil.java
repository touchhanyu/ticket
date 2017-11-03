package com.ticket.util;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.List;

import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

public class HttpClientUtil {
	public static void main(String[] args) {
		String url = "https://kyfw.12306.cn/passport/captcha/captcha-check";
		String para = "answer='115,23'&login_site='E'&rand='sjrand'";
		httpPost(url, para);
	}

	public static void httpPost(String url, String para) {
		X509TrustManager trustManager = new X509TrustManager() {
			@Override
			public void checkClientTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
				// TODO Auto-generated method stub
			}

			@Override
			public void checkServerTrusted(X509Certificate[] arg0, String arg1) throws CertificateException {
				// TODO Auto-generated method stub
			}

			@Override
			public X509Certificate[] getAcceptedIssuers() {
				// TODO Auto-generated method stub
				return null;
			}
		};
		TrustManager[] trusts = new TrustManager[] { trustManager };
		CloseableHttpClient httpClient = null;
		try {
			SSLContext ssl = SSLContext.getInstance("TLS");
			ssl.init(null, trusts, new SecureRandom());
			SSLConnectionSocketFactory factory = new SSLConnectionSocketFactory(ssl, new String[] { "TLSv1" }, null,
					SSLConnectionSocketFactory.getDefaultHostnameVerifier());
			httpClient = HttpClients.custom().setSSLSocketFactory(factory).build();
		} catch (NoSuchAlgorithmException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (KeyManagementException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		HttpPost httpPost = new HttpPost(url);
		try {
			List<NameValuePair> list = new ArrayList<NameValuePair>();
			list.add(new BasicNameValuePair("answer", "177,33"));
			list.add(new BasicNameValuePair("login_site", "E"));
			list.add(new BasicNameValuePair("rand", "sjrand"));
			UrlEncodedFormEntity reqEntity = new UrlEncodedFormEntity(list, "UTF-8");
			httpPost.setEntity(reqEntity);
			System.out.println(EntityUtils.toString(reqEntity));
			CloseableHttpResponse response = httpClient.execute(httpPost);
			try {
				HttpEntity entity = response.getEntity();
				System.out.println("response:" + EntityUtils.toString(entity));
			} catch (Exception e) {
				// TODO: handle exception
			} finally {
				response.close();
			}
		} catch (ClientProtocolException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				httpClient.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}