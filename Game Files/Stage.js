function vector2(x, y) {
	this.x = x;
	this.y = y;
};

function Stage(p, s) {
	pos = p;
	size = s;
	fillStyle = 'rgb(0, 200, 0)';
	
	var getPos = function() {
		return pos;
	}
	
	var getSize = function() {
		return size;
	}
	
	var setPos = function(newPos) {
		pos = newPos;
	}
	
	var setSize = function(newSize) {
		size = newSize;
	}
	
	var draw = function(ctx) {
		ctx.beginPath();
		ctx.arc(pos.x, pos.y, size, 0, Math.PI*2);
		ctx.fillStyle = fillStyle;
		ctx.fill();
	}
	
	var collides = function(b) {
		if(Math.sqrt(Math.pow(b.getPos().x - pos.x, 2) + Math.pow(b.getPos().y - pos.y, 2)) <= size + b.getSize())
		return true;
		return false;
	}
	
	return {
		getPos: getPos,
		getSize: getSize,
		setPos: setPos,
		setSize: setSize,
		collides: collides,
		draw: draw
	}
};

module.exports = Stage;