package com.ticket.util;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

public class JDBCUtil {
	private static Properties prop = new Properties();
	static {
		InputStream is = null;
		try {
			is = JDBCUtil.class.getResourceAsStream("/com/ticket/common/jdbc.properties");
			prop.load(is);
		} catch (Exception e) {
			// TODO: handle exception
			throw new ExceptionInInitializerError(e);
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

	public static ThreadLocal<Connection> tl = new ThreadLocal<Connection>();

	public static Connection getConn() {
		Connection conn = tl.get();
		if (conn == null) {
			try {
				Class.forName(prop.getProperty("driver"));
				String url = prop.getProperty("url");
				String username = prop.getProperty("username");
				String password = prop.getProperty("password");
				conn = DriverManager.getConnection(url, username, password);
				tl.set(conn);
			} catch (ClassNotFoundException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return conn;
	}

	public static void release(Connection conn, PreparedStatement pstm,
			ResultSet rs) {
		if (rs != null) {
			try {
				rs.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		if (pstm != null) {
			try {
				pstm.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		if (conn != null) {
			try {
				conn.close();
				tl.remove();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}