package com.jim.naotu;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSON;

public class MakeJson {
    public List<Node> nodes = new ArrayList<Node>();
    public int canvasWidth;
    public int canvasHeight;

    public static String getJson() {
	MakeJson makeJson = new MakeJson();
	CalcNode calcNode = new CalcNode();
	makeJson.nodes = calcNode.nodeList;
	makeJson.canvasWidth = calcNode.canvasWidth;
	makeJson.canvasHeight = calcNode.canvasHeight;
	return JSON.toJSONString(makeJson);
    }

    public static void main(String[] args) {

    }
}
