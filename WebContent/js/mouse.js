//处理鼠标事件,通过计算获得指定坐标的信息
$("#edit").hide();
var infoXY = "";
var infoTmp = "";
var offsetLeft = $("#myCanvas").position().left;
var offsetTop = $("#myCanvas").position().top;
var flagEdit = false;// 是否进入编辑模式
// console.log($("#myCanvas").offset().left);
$("#myCanvas").mousemove(function(e) {
	$("#info").css("left", e.clientX + $(document).scrollLeft());
	$("#info").css("top", e.clientY - 30 + $(document).scrollTop());
	infoXY = "X:" + e.clientX + " Y:" + (e.clientY + $(document).scrollTop());
	$("#info").html(infoXY + infoTmp);
});
$("body").mousemove(function(e) {
	for (var i = 0; i < obj.nodes.length; i++) {
		var x = e.clientX + $(document).scrollLeft();
		var y = e.clientY + $(document).scrollTop();
		if (isInNode(x, y, obj.nodes[i])) {
			infoTmp = obj.nodes[i].txt + obj.nodes[i].sortNumber;
			$("#info").html(infoXY + infoTmp);
			break;
		} else {
			infoTmp = "";
			$("#info").html(infoXY + infoTmp);
		}
	}
});
$("body").click(function(e) {
	console.log("click");
	var x = e.clientX + $(document).scrollLeft();
	var y = e.clientY + $(document).scrollTop();
	currentNode = getNode(x, y);
	if (currentNode) {
		console.log("o.id:" + currentNode.id + " flagEdit:" + flagEdit);
		highlight(currentNode);
		cancalHighlight(oldNode);
		if (oldNode == currentNode) {// 判断是否在已经选中的节点上再次click
			if (!flagEdit) {
				console.log("你又点击了,我要给你进入编辑模式了");
				flagEdit = true;
				$("#edit").show();
				$("#edit").css("left", currentNode.left + offsetLeft);
				$("#edit").css("top", currentNode.top + offsetTop);
				$("#edit").attr("value", currentNode.txt);
				$("#edit").css("width", currentNode.txtLength);
				$("#edit").select();
			}
		} else {
			quitEdit();
			cancalHighlight(oldNode);
		}
		oldNode = currentNode;
	} else {
		quitEdit();
		cancalHighlight(oldNode);
		oldNode = null;
		currentNode = null;
	}

	// 判断node的折叠圈
	var arcNode = getArcNode(x, y);
	if (arcNode) {
		if (arcNode.flod == 1) {
			arcNode.flod = 2;
		}
		else if (arcNode.flod == 2) {
			arcNode.flod = 1;
		}
		calc();
		paint();
	}
});

// 退出编辑框
function quitEdit() {

	$("#edit").hide();
	if (oldNode && flagEdit) {
		oldNode.txt = $("#edit").attr("value");
	}
	flagEdit = false;
	calc();
	paint();
}

function getArcNode(x, y) {
	for (var i = 0; i < obj.nodes.length; i++) {
		if (isInArc(x, y, obj.nodes[i])) {
			console.log(obj.nodes[i].id);
			return obj.nodes[i];
		}
	}
	return null;
}
function getNode(x, y) {
	for (var i = 0; i < obj.nodes.length; i++) {
		if (isInNode(x, y, obj.nodes[i])) {
			return obj.nodes[i];
		}
	}
	return null;
}
function isInNode(x, y, node) {
	if (x > node.left + offsetLeft && x < node.left + node.txtLength + offsetLeft && y > node.top + offsetTop
			&& y < node.top + nodeHeight + offsetTop) {
		return true;
	} else {
		return false;
	}
}
function isInArc(x, y, node) {
	console.log(x+":"+y);
	if (node.flod == 0) {
		return false;
	}
	if (x > node.left - 8 - 5 + offsetLeft && x < node.left - 8 + 5 + offsetLeft
			&& y > node.top + nodeHeight / 2 - 5 + offsetTop && y<node.top + nodeHeight / 2 + 5 + offsetTop) {
		return true;
	} else {
		return false;
	}
}
