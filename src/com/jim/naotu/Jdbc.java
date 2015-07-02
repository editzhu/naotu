package com.jim.naotu;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class Jdbc {
    static class log {
	static void p(String s) {
	    System.out.println(s);
	}
    }

    public static Connection getConn() throws SQLException, IOException, ClassNotFoundException {
	Class.forName("oracle.jdbc.driver.OracleDriver"); // 加载数据库驱动，注册到驱动管理器
	String url = "jdbc:oracle:thin:@10.0.2.16:1521:orcl"; // 数据库连接字符串
	String username = "ckms"; // 数据库用户名
	String password = "ckms"; // 数据库密码
	return DriverManager.getConnection(url, username, password);

    }

    public static List<NodeInfo> getNodeAll() {
	List<NodeInfo> list = new ArrayList<NodeInfo>();
	// 创建Connection连接
	Connection conn = null;
	try {
	    conn = getConn();
	} catch (ClassNotFoundException e1) {
	    // TODO Auto-generated catch block
	    e1.printStackTrace();
	} catch (SQLException e1) {
	    // TODO Auto-generated catch block
	    e1.printStackTrace();
	} catch (IOException e1) {
	    // TODO Auto-generated catch block
	    e1.printStackTrace();
	}
	// 判断数据库连接是否为空
	if (conn != null) {
	    log.p("数据库连接成功！"); // 输出连接信息
	} else {
	    log.p("数据库连接失败！"); // 输出连接信息
	}
	try {
	    Statement stat = conn.createStatement();
	    String query = "select node_id,parent_id,node_name from km_tree_node";
	    ResultSet rs = stat.executeQuery(query);
	    int i;
	    int j;
	    String n;
	    while (rs.next()) {
		// log.p(rs.getString(1));
		// log.p(rs.getString(2));
		// log.p(rs.getString(3));
		// log.p(rs.getString(4));
		// log.p(rs.getString(5));
		i = rs.getInt(1);
		j = rs.getInt(2);
		n = rs.getString(3);
		list.add(new NodeInfo(i, j, n));
	    }
	} catch (Exception e) {
	    e.printStackTrace();
	} finally {
	    try {
		conn.close();
	    } catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	    }
	}
	return list;
    }

    public static void main(String[] args) {
	List<NodeInfo> list = new ArrayList<NodeInfo>();
	list = getNodeAll();
	for (NodeInfo n : list) {
	    if (n.parentId == 0)
		System.out.println(n);
	}

    }
}
