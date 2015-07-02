package com.jim.naotu;

import java.util.ArrayList;
import java.util.List;

public class CalcNodeInfo {
    private List<NodeInfo> allNodeList = new ArrayList<NodeInfo>();// 全部节点
    private List<NodeInfo> showNodeList = new ArrayList<NodeInfo>();// 用于显示的节点

    CalcNodeInfo() {
	// 从数据库中获取nodeinfolist
	// allNodeList = Jdbc.getNodeAll();
	// 直接定义nodeinfolist
	allNodeList.add(new NodeInfo(1, 0, "1租户现状"));
	allNodeList.add(new NodeInfo(2, 0, "2多租户版本多租户版本"));
	allNodeList.add(new NodeInfo(3, 0, "3开发多租户部分,并且考虑集群(应用,数据库,搜索引擎,文件)实现,初步设定N万"));
	allNodeList.add(new NodeInfo(4, 0, "4云平台"));
	allNodeList.add(new NodeInfo(5, 0, "5故事"));
	allNodeList.add(new NodeInfo(6, 0, "6hehe"));
	allNodeList.add(new NodeInfo(11, 1, "11不管租户多不多--有几个租户的用户很多"));
	allNodeList.add(new NodeInfo(12, 1, "12租户多--每租户的用户少"));
	allNodeList.add(new NodeInfo(13, 1, "13不管租户多不多--有几个租户的用户很多"));
	allNodeList.add(new NodeInfo(14, 1, "14租户多--每租户的用户少"));
	allNodeList.add(new NodeInfo(15, 1, "15不管租户多不多--有几个租户的用户很多"));
	allNodeList.add(new NodeInfo(16, 1, "16租户多--每租户的用户少"));
	allNodeList.add(new NodeInfo(21, 2, "21后台配置租户号和用户数上限"));
	allNodeList.add(new NodeInfo(211, 21, "211后台配置租户号和用户数上限"));
	allNodeList.add(new NodeInfo(212, 21, "212后台配置租户号和用户数上限"));
	allNodeList.add(new NodeInfo(213, 21, "213后台配置租户号和用户数上限"));
	allNodeList.add(new NodeInfo(22, 2, "22租户号内置系统管理员"));
	allNodeList.add(new NodeInfo(23, 2, "23jk"));
	allNodeList.add(new NodeInfo(31, 3, "31独立为每个租户在云端部署系统,数据库合用,不做集群"));
	allNodeList.add(new NodeInfo(32, 3, "32开发多租户部分,不考虑集群,每套应用"));
	allNodeList.add(new NodeInfo(41, 4, "41阿里云"));

	// 添加一个根
	allNodeList.add(new NodeInfo(0, -1, "CKMS", 0));

	// 设置level
	boolean flag = true;// 标记,如果列表中有一个level还是-1,则继续
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
	// 生成showNodeList,参数level为指定显示到第几层
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
