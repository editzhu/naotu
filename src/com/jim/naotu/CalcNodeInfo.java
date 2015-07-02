package com.jim.naotu;

import java.util.ArrayList;
import java.util.List;

public class CalcNodeInfo {
    private List<NodeInfo> allNodeList = new ArrayList<NodeInfo>();// ȫ���ڵ�
    private List<NodeInfo> showNodeList = new ArrayList<NodeInfo>();// ������ʾ�Ľڵ�

    CalcNodeInfo() {
	// �����ݿ��л�ȡnodeinfolist
	// allNodeList = Jdbc.getNodeAll();
	// ֱ�Ӷ���nodeinfolist
	allNodeList.add(new NodeInfo(1, 0, "1�⻧��״"));
	allNodeList.add(new NodeInfo(2, 0, "2���⻧�汾���⻧�汾"));
	allNodeList.add(new NodeInfo(3, 0, "3�������⻧����,���ҿ��Ǽ�Ⱥ(Ӧ��,���ݿ�,��������,�ļ�)ʵ��,�����趨N��"));
	allNodeList.add(new NodeInfo(4, 0, "4��ƽ̨"));
	allNodeList.add(new NodeInfo(5, 0, "5����"));
	allNodeList.add(new NodeInfo(6, 0, "6hehe"));
	allNodeList.add(new NodeInfo(11, 1, "11�����⻧�಻��--�м����⻧���û��ܶ�"));
	allNodeList.add(new NodeInfo(12, 1, "12�⻧��--ÿ�⻧���û���"));
	allNodeList.add(new NodeInfo(13, 1, "13�����⻧�಻��--�м����⻧���û��ܶ�"));
	allNodeList.add(new NodeInfo(14, 1, "14�⻧��--ÿ�⻧���û���"));
	allNodeList.add(new NodeInfo(15, 1, "15�����⻧�಻��--�м����⻧���û��ܶ�"));
	allNodeList.add(new NodeInfo(16, 1, "16�⻧��--ÿ�⻧���û���"));
	allNodeList.add(new NodeInfo(21, 2, "21��̨�����⻧�ź��û�������"));
	allNodeList.add(new NodeInfo(211, 21, "211��̨�����⻧�ź��û�������"));
	allNodeList.add(new NodeInfo(212, 21, "212��̨�����⻧�ź��û�������"));
	allNodeList.add(new NodeInfo(213, 21, "213��̨�����⻧�ź��û�������"));
	allNodeList.add(new NodeInfo(22, 2, "22�⻧������ϵͳ����Ա"));
	allNodeList.add(new NodeInfo(23, 2, "23jk"));
	allNodeList.add(new NodeInfo(31, 3, "31����Ϊÿ���⻧���ƶ˲���ϵͳ,���ݿ����,������Ⱥ"));
	allNodeList.add(new NodeInfo(32, 3, "32�������⻧����,�����Ǽ�Ⱥ,ÿ��Ӧ��"));
	allNodeList.add(new NodeInfo(41, 4, "41������"));

	// ���һ����
	allNodeList.add(new NodeInfo(0, -1, "CKMS", 0));

	// ����level
	boolean flag = true;// ���,����б�����һ��level����-1,�����
	while (flag) {
	    flag = false;
	    for (NodeInfo n : allNodeList) {
		if (n.id == 0) {
		    continue;
		}
		if (n.level == -1) {
		    flag = true;
		}
		if (n.parentId == 0) {
		    n.setLevel(1);
		}
		int level = getParentLevel(n.parentId);
		if (level != -1) {
		    n.setLevel(level + 1);
		}
	    }
	}
    }

    private int getParentLevel(int id) {
	for (NodeInfo n : allNodeList) {
	    if (n.id == id)
		return n.level;
	}
	return -1;
    }

    public List<NodeInfo> getShowNodeList(int level) {
	// ����showNodeList,����levelΪָ����ʾ���ڼ���
	for (NodeInfo n : allNodeList) {
	    if (n.level <= level)
		showNodeList.add(n);
	}
	return showNodeList;
    }

    public static void main(String[] args) {
	CalcNodeInfo calcNode = new CalcNodeInfo();
	calcNode.getShowNodeList(10);
	for (NodeInfo n : calcNode.showNodeList) {
	    if (n.level != -1) {
		System.out.println(n);
	    }
	}
    }
}
