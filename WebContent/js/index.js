window.onload=kaiju();
document.onkeyup = keyUp;
function kaiju() {
	adddemo("KAIJU");
	var v1 = document.getElementById("i1");
	var v2 = document.getElementById("i2");
	var v3 = document.getElementById("i3");
	var v4 = document.getElementById("i4");
	var v5 = document.getElementById("i5");
	var v6 = document.getElementById("i6");
	var myCanvas = document.getElementById("myCanvas");
	var context = myCanvas.getContext("2d");
	context.clearRect(0, 0, 2200, 2200);
	go(v1, v2);
	go(v1, v3);
	go(v1, v4);
	go(v1, v5);
	go(v1, v6);
}

function go(v1, v2) {
	var myCanvas = document.getElementById("myCanvas");
	var context = myCanvas.getContext("2d");
	// context.clearRect(0, 0, 2200, 2200);
	// context.fillStyle = 'rgba(255,0,0,.3)';//填充颜色：红色，半透明
	context.strokeStyle = 'hsl(120,50%,50%)';// 线条颜色：绿色
	context.lineWidth = 1;// 设置线宽
	context.beginPath();
	// var v1 = document.getElementById("i1");
	// var v2 = document.getElementById("i2");
	var x1 = parseInt(window.getComputedStyle(v1, null).left) + 30;
	var y1 = parseInt(window.getComputedStyle(v1, null).top) + 1;
	var x2 = parseInt(window.getComputedStyle(v2, null).left);
	var y2 = parseInt(window.getComputedStyle(v2, null).top) + 1;
	var zx = (x2 + x1) / 2;
	var zy = (y2 + y1) / 2;
	context.moveTo(x1, y1);
	// context.lineTo(parseInt(v2.style.left), parseInt(v2.style.top));//直线连接

	// context.quadraticCurveTo(zx, y1, zx, zy);//曲线连接
	// context.quadraticCurveTo(zx, y2, x2, y2);//曲线连接,这2行是分段曲线

	context.quadraticCurveTo(x1, y2, x2, y2);// 单段曲线连接
	context.stroke();// 画线框
	// context.fill();//填充颜色

}
function keyUp(e) {
	var currKey = 0, e = e || event;
	currKey = e.keyCode || e.which || e.charCode;
	var keyName = String.fromCharCode(currKey);
	adddemo(currKey + ":" + keyName);
	switch (currKey) {
	case 74://key "j"
		addNewChild();
	}

}

function addNewChild() {
	adddemo("addnewchild");
	var newDiv = document.createElement("div");
	newDiv.className = "L1";
	newDiv.style.left = Math.random() * (1000) + "px";
	newDiv.style.top = Math.random() * (500) + "px";
	document.getElementById("left").appendChild(newDiv);
	reDraw();//增加了节点了,重画
	// document.getElementsByTagName("body").item(0).appendChild(newDiv);
}
function adddemo(s) {
	x = document.getElementById("demo"); // 找到元素
	x.innerHTML = x.innerHTML + "<br>" + s; // 改变内容
}

function reDraw(){
	//识别所有id为left的div的所有className=L1的子元素节点
	var dians=Arrays();//所有L1的节点数组
	var tmp=0;
	var nodes=document.getElementById("left").childNodes;
	for(var i=0;i<nodes.length;i++){
		if(nodes[i].className=="L1"){
			dian[tmp++]=nodes[i];
			adddemos(dian[tmp].className);
		}
	}
}
