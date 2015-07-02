package com.jim.naotu;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class CanvasData
 */
public class ServletCanvas extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public ServletCanvas() {
	super();
	// TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
     *      response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	// TODO Auto-generated method stub
	response.setContentType("text/html;charset=utf-8");
	PrintWriter out = response.getWriter();

	String rs = null;
	boolean flag = true;
	if (flag) {
	    // �����ж�ȡrs
	    rs = MakeJson.getJson();
	} else {
	    // ���ļ��ж�ȡrs
	    FileReader fr = new FileReader("d:\\ckms.json");
	    BufferedReader br = new BufferedReader(fr);
	    rs = br.readLine();
	    br.close();
	}
	out.print(rs);
	out.flush();
	out.close();

    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
     *      response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	// TODO Auto-generated method stub
	request.setCharacterEncoding("UTF-8");
	// String file =
	// request.getSession().getServletContext().getRealPath("wersdasdfasfe.txt");
	BufferedReader buf = request.getReader();
	FileWriter fw = new FileWriter("d:\\ckms.json");
	BufferedWriter bw = new BufferedWriter(fw);
	try {
	    String s = buf.readLine();
	    System.out.println(s);
	    while (null != s) {
		bw.write(s);
		// ����BufferedReader��rendLIne()�ǲ����뻻�з��ģ�����д�뻻��ʱ����newLine()����
		bw.newLine();
		s = buf.readLine();
	    }

	    buf.close();
	    bw.close();
	} catch (IOException e) {
	    System.out.println(e);
	}
    }
}
