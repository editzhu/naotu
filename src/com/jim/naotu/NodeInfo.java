package com.jim.naotu;

public class NodeInfo {
    public int id;
    public int parentId;
    public String nodeName;
    public int level;

    NodeInfo(int id, int parentId, String nodeNmae) {
	this.id = id;
	this.parentId = parentId;
	this.nodeName = nodeNmae;
	this.level = -1;
    }

    NodeInfo(int id, int parentId, String nodeNmae, int level) {
	this.id = id;
	this.parentId = parentId;
	this.nodeName = nodeNmae;
	this.level = level;
    }

    public void setLevel(int level) {
	this.level = level;
    }

    @Override
    public String toString() {
	// TODO Auto-generated method stub
	return "id:" + id + " parentId:" + parentId + " nodeName:" + nodeName + " level:" + level;
    }
}
