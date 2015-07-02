package com.jim.naotu;

import java.util.ArrayList;
import java.util.List;

public class CalcNode {
    private List<NodeInfo> nodeInfoList = new ArrayList<NodeInfo>();//
    public List<Node> nodeList = new ArrayList<Node>();//
    public int canvasWidth;
    public int canvasHeight;

    CalcNode() {
	CalcNodeInfo calcNodeInfo = new CalcNodeInfo();
	nodeInfoList = calcNodeInfo.getShowNodeList(10);
	for (NodeInfo n : nodeInfoList) {
	    nodeList.add(new Node(n.id, n.parentId, 0, 0, n.nodeName, n.level));
	}
	// …Ë÷√sortNumber
	Node node = getNodeById(0);
	setSortNumber(node);

	canvasWidth = 1000;
	canvasHeight = 400;
    }

    // …Ë÷√sortNumber∫Õflod
    private void setSortNumber(Node node) {
	int count = 0;
	for (Node n : nodeList) {
	    if (n.parentId == node.id) {
		n.sortNumber = (count++);
		setSortNumber(n);
	    }
	}
	if (count == 0) {
	    node.flod = 0;
	    System.out.println("=0");
	} else {
	    node.flod = 1;
	    System.out.println("=1");
	}
    }

    private Node getNodeById(int id) {
	for (Node n : nodeList) {
	    if (n.id == id)
		return n;
	}
	return null;
    }

    public static void main(String[] args) {
	CalcNode calcNode = new CalcNode();
	for (Node n : calcNode.nodeList) {
	    System.out.println(n);
	}
    }
}
