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
	Class.forName("oracle.jdbc.driver.OracleDriver"); // �������ݿ�������ע�ᵽ����������
	String url = "jdbc:oracle:thin:@10.0.2.16:1521:orcl"; // ���ݿ������ַ���
	String username = "ckms"; // ���ݿ��û���
	String password = "ckms"; // ���ݿ�����
	return DriverManager.getConnection(url, username, password);

    }

    public static List<NodeInfo> getNodeAll() {
	List<NodeInfo> list = new ArrayList<NodeInfo>();
	// ����Connection����
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
	// �ж����ݿ������Ƿ�Ϊ��
	if (conn != null) {
	    log.p("���ݿ����ӳɹ���"); // ���������Ϣ
	} else {
	    log.p("���ݿ�����ʧ�ܣ�"); // ���������Ϣ
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
