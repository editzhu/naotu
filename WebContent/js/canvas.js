var canvas = document.getElementById("myCanvas"); // 读取canvas元素的id
var ctx = canvas.getContext("2d");
var fontsize = 12;// 默认字体大小
var font = fontsize + "px Arial";// 默认canvavs的字体
var rootX = 100;// 根节点位置x
var offsetLevelX = 50;// 每层之间的左右偏移
var offsetNodeY = 10;// node之间的上下偏移
var nodeHeight = fontsize + 8;// 节点高度
var offsetLevelY = offsetNodeY + nodeHeight;// 每层之间的上下偏移
var iniTop = 30;// 初始点距离屏幕的距离
var currentNode;
var oldNode;
var currentTopMax = 0;// 目前的屏幕最大Y
var nodeMaxId = 0;// 所有node的id的最大值
var htmlobj = $.ajax({
	url : "/naotu/ServletCanvas",
	async : false
});
console.log(htmlobj.responseText);

var obj = jQuery.parseJSON(htmlobj.responseText);
$("#myCanvas").attr("height", obj.canvasHeight);
$("#myCanvas").attr("width", obj.canvasWidth);
var rootNode = getObjByNodeId(0);
calc();
paint();
function calc() {
	console.log("begin to calc");
	currentTopMax = -100000;
	// 先计算txtLength
	for (var i = 0; i < obj.nodes.length; i++) {
		var o = obj.nodes[i];
		ctx.font = font;
		o.txtLength = ctx.measureText(o.txt).width;
	}
	// 找到根节点,并定义根节点位置
	rootNode.left = rootX;
	// 处理node
	rootNode.top = makeNode(rootNode);

}
function paint() {
	console.log("begin to paint initop:" + iniTop);
	clearCanvas();

	// 处理连线,画line
	makeLine(rootNode);

	// 画node
	for (var i = 0; i < obj.nodes.length; i++) {
		var o = obj.nodes[i];
		if (checkParentFlod(o)) {// 任意长辈的flod不等于2
			drawText(o.left, o.top, o.txt, o.txtLength, 0);
			if (o.id != 0)// rootNode不画圈
				drawArc(o.left, o.top, o.flod);
		}
	}
	highlight(currentNode);
}

function makeNode(node) {
	var childNodeMin = 100000;// 元素所有子元素的最低点
	var childNodeMax = -100000;// 元素所有子元素的最高点
	var childCount = 0;// 子元素计数

	var nodeIdList = [];
	for (var i = 0; i < obj.nodes.length; i++) {
		var o = obj.nodes[i];
		if (o.parentId == node.id) {
			nodeIdList.push(i);
		}
	}
	// 排序
	for (var i = 0; i < nodeIdList.length; i++) {
		// console.log("aaa:" + obj.nodes[nodeIdList[i]].id + ":" +
		// obj.nodes[nodeIdList[i]].sortNumber);
		for (var j = i; j < nodeIdList.length; j++) {
			if (obj.nodes[nodeIdList[i]].sortNumber > obj.nodes[nodeIdList[j]].sortNumber) {
				var tmp = obj.nodes[nodeIdList[i]];
				obj.nodes[nodeIdList[i]] = obj.nodes[nodeIdList[j]];
				obj.nodes[nodeIdList[j]] = tmp;
			}
		}
	}
	for (var i = 0; i < obj.nodes.length; i++) {
		var o = obj.nodes[i];
		// 处理id序列
		if (o.id > nodeMaxId) {
			nodeMaxId = o.id;
		}
		if (o.parentId == node.id) {
			childCount += 1;
			o.left = node.left + node.txtLength + offsetLevelX;
			o.top = makeNode(o);
			if (o.top > childNodeMax)
				childNodeMax = o.top;
			if (o.top < childNodeMin)
				childNodeMin = o.top;
			if (o.top > currentTopMax)
				currentTopMax = o.top;
		}
	}
	if (currentTopMax < iniTop) {
		return iniTop;// 初始点
	} else if (childCount > 0) {
		return (childNodeMax + childNodeMin) / 2;
	} else {
		return currentTopMax + offsetLevelY;
	}
}

function makeLine(node) {
	for (var i = 0; i < obj.nodes.length; i++) {
		var o = obj.nodes[i];
		if (o.parentId == node.id) {
			if (node.id == 0) {// rootnote的特殊处理
				drawLine(node.left + node.txtLength / 2, node.top + 5, o.left, o.top + 10);
			} else {
				drawLine(node.left + node.txtLength + 2, node.top + 10, o.left, o.top + 10);
			}
			if (o.flod == 1)
				makeLine(o);
		}
	}
}

function getObjByNodeId(id) {
	for (var i = 0; i < obj.nodes.length; i++) {
		var o = obj.nodes[i];
		if (o.id == id)
			return o;
	}
	return null;
}

function drawText(left, top, text, length, style) {
	ctx.fillStyle = "#EEF3F6";
	ctx.strokeStyle = "rgb(115,161,191)"; // 边框颜色
	ctx.lineWidth = 1; // 边框宽
	if (style == 1) {
		ctx.strokeStyle = "green";
	}
	ctx.font = font;
	ctx.fillRect(left, top, length, nodeHeight);// 填充颜色 x y坐标 宽
	// 高
	ctx.strokeRect(left, top, length, nodeHeight); // 填充边框 x
	// y坐标 宽 高
	ctx.fillStyle = "#000000";
	ctx.fillText(text, left, top + fontsize + 3);
}
// 画隐藏/显示折叠子节点的圈圈
function drawArc(left, top, flod) {
	if (flod == 1) {
		ctx.beginPath();
		ctx.strokeStyle = "#777777";
		ctx.arc(left - 8, top + nodeHeight / 2, 5, 0, 2 * Math.PI, true);
		ctx.closePath();
		ctx.fillStyle = "#EEF3F6";
		ctx.moveTo(left - 8 - 3, top + nodeHeight / 2);
		ctx.lineTo(left - 8 + 3, top + nodeHeight / 2);
		ctx.fill();
		ctx.stroke();
	} else if (flod == 2) {
		ctx.beginPath();
		ctx.strokeStyle = "#777777";
		ctx.arc(left - 8, top + nodeHeight / 2, 5, 0, 2 * Math.PI, true);
		ctx.closePath();
		ctx.fillStyle = "#EEF3F6";
		ctx.moveTo(left - 8 - 3, top + nodeHeight / 2);
		ctx.lineTo(left - 8 + 3, top + nodeHeight / 2);
		ctx.moveTo(left - 8, top + nodeHeight / 2 - 3);
		ctx.lineTo(left - 8, top + nodeHeight / 2 + 3);
		ctx.fill();
		ctx.stroke();
	}

}

function drawLine(x1, y1, x2, y2,reverse) {
	//处理左右反转
	if(reverse==1){
		left=2*rootX-left-length;
	}
	var hx = x1 + (x2 - x1) / 2;
	var hy = y1 + (y2 - y1) * 3 / 4;
	ctx.strokeStyle = "rgb(115,161,191)";
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	// 第一连接到hx,hy
	ctx.lineTo(hx, hy);
	// ctx.quadraticCurveTo(hx, y1 , hx, hy);// 单段曲线连接
	ctx.quadraticCurveTo(hx + (x2 - hx) / 2, y2, x2 - 2, y2);// 单段曲线连接
	ctx.stroke();
}

function move(x, y) {
	rootX -= x
	iniTop -= y;
}

function clearCanvas() {
	// ctx.fillStyle = "#FBFBFB";
	// ctx.fillRect(0, 0, obj.canvasWidth, obj.canvasHeight);// 填充颜色 x y坐标 宽
	ctx.clearRect(0, 0, obj.canvasWidth, obj.canvasHeight);

}

function cancalHighlight(o) {
	if (o) {
		drawText(o.left, o.top, o.txt, o.txtLength);
	}
}
function highlight(o) {
	// if (oldNode) {// 判断oldNode是否存在,在刚进入系统时,oldNode=undefine
	// drawText(oldNode.left, oldNode.top, oldNode.txt, oldNode.txtLength);
	// }
	if (o) {
		drawText(o.left, o.top, o.txt, o.txtLength, 1);
	}
}

// 任意长辈的flod不等于2,就返回true
function checkParentFlod(node) {
	var tmp = false;
	if (node.id == 0) {
		return true;
	}
	for (var i = 0; i < obj.nodes.length; i++) {
		var o = obj.nodes[i];
		if (o.id == node.parentId) {
			if (o.flod == 2) {
				return false;
			} else {
				return checkParentFlod(o);
			}
		}
	}
}
