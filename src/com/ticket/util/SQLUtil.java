package com.ticket.util;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

public class SQLUtil {
	public static List<Map<String, Object>> query(String sql) {
		Connection conn = JDBCUtil.getConn();
		PreparedStatement pstm = null;
		ResultSet rs = null;
		ArrayList<Map<String, Object>> list = null;
		try {
			pstm = conn.prepareStatement(sql);
			rs = pstm.executeQuery();
			ResultSetMetaData metaData = rs.getMetaData();
			int count = metaData.getColumnCount();
			list = new ArrayList<Map<String, Object>>();
			while (rs.next()) {
				HashMap<String, Object> map = new HashMap<String, Object>();
				for (int i = 0; i < count; i++) {
					map.put(metaData.getColumnName(i + 1), rs.getObject(i + 1));
				}
				list.add(map);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			JDBCUtil.release(conn, pstm, rs);
		}
		return list;
	}

	public static void insert(String sql, Map<Integer, Object> map) {
		Connection conn = JDBCUtil.getConn();
		PreparedStatement pstm = null;
		try {
			pstm = conn.prepareStatement(sql);
			Set<Entry<Integer, Object>> entrySet = map.entrySet();
			Iterator<Entry<Integer, Object>> it = entrySet.iterator();
			while (it.hasNext()) {
				Entry<Integer, Object> entry = it.next();
				pstm.setObject(entry.getKey(), entry.getValue());
			}
			pstm.executeUpdate();
			conn.commit();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			try {
				conn.rollback();
			} catch (SQLException ee) {
				// TODO Auto-generated catch block
				ee.printStackTrace();
			}
			e.printStackTrace();
		} finally {
			JDBCUtil.release(conn, pstm, null);
		}
	}
}