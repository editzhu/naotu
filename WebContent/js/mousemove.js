var isTouched = false;
var oldX = -1;
var oldY = -1;
$("#myCanvas").bind('mousedown', function(e) {
	console.log("down");
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
		scroll(deltaX*10,deltaY*10);
		console.log("mousemove:"+deltaX);
	}

});

$("#myCanvas").bind('mouseup', function(e) {
	isTouched = false;
	oldX = -1;
	oldY = -1;
});
