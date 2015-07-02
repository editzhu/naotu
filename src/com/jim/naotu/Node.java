package com.jim.naotu;

public class Node {
    public int id;
    public int parentId;
    public int left;
    public int top;
    public String txt;
    public int txtLength;
    public int level;
    public int sortNumber;
    public int flod;// �Ƿ��۵� 0=���ӽڵ� 1=���ӽڵ� 2=���۵�

    Node(int id, int parentId, int left, int top, String txt, int level) {
	this.id = id;
	this.parentId = parentId;
	this.left = left;
	this.top = top;
	this.txt = txt;
	this.txtLength = 0;
	this.level = level;
	this.sortNumber = 0;
	this.flod = 0;
    }

    @Override
    public String toString() {
	// TODO Auto-generated method stub
	return "id:" + id + " left:" + left + " top:" + top + " txt:" + txt + " txtLength:" + txtLength + " level:" + level + " sortNumber:" + sortNumber + " flod:" + flod;
    }
}
