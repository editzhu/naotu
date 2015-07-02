$(document).ready(function() {
	$("#root").click(function() {
		rootX = 100;
		iniTop = 30;
		calc();
		paint();
	});
	$("#navi").click(function() {
		var image = new Image();
		image.src = canvas.toDataURL("image/png");
		console.log("image.width:"+image.width);
		$("#imgnavi").attr("src",image.src);
	});
	$("#save").click(function() {
		for (var i = 0; i < obj.nodes.length; i++) {
			console.log("add--id:" + obj.nodes[i].id + " top:" + obj.nodes[i].top);
		}
		var jsonString = JSON.stringify(obj);
		console.log(jsonString);
		$.ajax({
			url : "/naotu/ServletCanvas",
			async : false,
			type : 'post',
			data : jsonString,
			error : function() {
				alert('error');
			},
			success : function(data) {
				alert('success');
			}
		});
		console.log(htmlobj.responseText);
	});

	function scroll(x, y) {
		console.log("scroll:x:" + x);
		move(x, y);
		calc();
		paint();
	}
	function addChildNode(o) {
		var node = new Object();
		nodeMaxId += 1;
		node.id = nodeMaxId;
		node.parentId = o.id;
		node.txt = "分支主体";
		node.left = 0;
		node.top = 0;
		node.lastChildNodeTop = 0;
		node.txtLength = 0;
		node.level = o.level + 1;
		node.sortNumber = getChildMaxSortNumber(o) + 1;
		obj.nodes.push(node);
		calc();
		paint();
	}
	function addNextNode(o) {
		var node = new Object();
		nodeMaxId += 1;
		node.id = nodeMaxId;
		node.parentId = o.parentId;
		node.txt = "分支主体";
		node.left = 0;
		node.top = 0;
		node.lastChildNodeTop = 0;
		node.txtLength = 0;
		node.level = o.level;
		node.sortNumber = o.sortNumber + 1;

		// 所有的下面兄弟sortNumber都需要加1
		for (var i = 0; i < obj.nodes.length; i++) {
			if (obj.nodes[i].parentId == o.parentId && obj.nodes[i].sortNumber > o.sortNumber) {
				obj.nodes[i].sortNumber += 1;
			}
		}
		obj.nodes.push(node);
		calc();
		paint();
	}
	function delNode(o) {
		currentNode = null;
		oldNode = null;
		// 所有的下面兄弟sortNumber都需要-1
		for (var i = 0; i < obj.nodes.length; i++) {
			if (obj.nodes[i].parentId == o.parentId && obj.nodes[i].sortNumber > o.sortNumber) {
				obj.nodes[i].sortNumber -= 1;
			}
		}

		var flag = false;
		for (var i = 0; i < obj.nodes.length; i++) {
			if (o == obj.nodes[i]) {
				flag = true;
			}
			if (i == obj.nodes.length - 1) {
				obj.nodes[i] = null;
			} else {
				if (flag) {
					obj.nodes[i] = obj.nodes[i + 1];
				}
			}
		}
		obj.nodes.length -= 1;
		calc();
		paint();
	}
	function getChildMaxSortNumber(o) {
		var val = -1;
		for (var i = 0; i < obj.nodes.length; i++) {
			console.log(o.id + obj.nodes[i].parentId);
			if (o.id == obj.nodes[i].parentId) {
				val = val + 1;
			}
		}
		console.log(val);
		return val;
	}

	$("body").keyup(function() {
		var currKey = 0, e = e || event;
		currKey = e.keyCode || e.which || e.charCode;
		console.log("cruuKey:" + currKey);
		switch (currKey) {
		case 74:
			addChildNode(oldNode);
			break;
		case 75:
			addNextNode(oldNode);
			break;
		case 46:
			delNode(oldNode);
			break;
		}
	});
	$("#myCanvas").mousewheel(function(event, delta) {
		console.log(delta);
		scroll(0, delta * 10);
		return false;
	});
	var isTouched = false;
	var oldX = -1;
	var oldY = -1;
	$("#myCanvas").bind('mousedown', function(e) {
		console.log("mousedown");
		isTouched = true;
		oldX = e.clientX;
		oldY = e.clientY;

	});

	$("#myCanvas").bind('mousemove', function(e) {
		if (isTouched) {
			var deltaX = e.clientX - oldX;
			var deltaY = e.clientY - oldY;
			oldX = e.clientX;
			oldY = e.clientY;
			scroll(-deltaX, -deltaY);
			console.log("mousemove:" + deltaX);
		}

	});

	$("#myCanvas").bind('mouseup', function(e) {
		isTouched = false;
		oldX = -1;
		oldY = -1;
	});
});