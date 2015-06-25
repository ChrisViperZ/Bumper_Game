function vector2(x, y) {
	this.x = x;
	this.y = y;
}

function Player(p, s) {
	var pos = p,
		size = s,
		id,
		idle = true,
		vel = new vector2(0,0);

	var getPos = function() {
		return pos;
	};
	
	var getSize = function() {
		return size;
	};
	
	var getVel = function() {
		return vel;
	};
	
	var setPos = function(newPos) {
		pos = newPos;
	};
	
	var setSize = function(newSize) {
		size = newSize;
	}
	
	var setVel = function(newVel) {
		vel = newVel;
	};
	
	var isIdle = function() {
		if(vel.x == 0 && vel.y == 0)
			return true;
		return false;
	};
	
	var move = function(keys) {
		if(keys.up)
			vel.y-=.5;
		if(keys.down)
			vel.y+=.5;
		if(keys.left)
			vel.x-=.5;
		if(keys.right)
			vel.x+=.5;	
	}
	
	var update = function() {	
		if(vel.x > 6)
			vel.x = 6;
		else if(vel.x < -6)
			vel.x = -6;
		if(vel.y > 6)
			vel.y = 6
		else if(vel.y < -6)
			vel.y = -6;
			
		
		pos = new vector2(pos.x + vel.x, pos.y + vel.y);
		
		vel.x *= .95;
		vel.y *= .95;
		
		if(Math.abs(vel.x) < .1)
			vel.x = 0;
		if(Math.abs(vel.y) < .1)
			vel.y = 0;
	};
	
	var collides = function(b) {
		if(Math.sqrt(Math.pow(b.getPos().x - pos.x, 2) + Math.pow(b.getPos().y - pos.y, 2)) <= size + b.getSize())
			return true;
		return false;
	};
	
	var findCollisionPoint = function(b) {
		x = (pos.x * b.getSize() + b.getPos().x * size) / (size + b.getSize());
		y = (pos.y * b.getSize() + b.getPos().y * size) / (size + b.getSize());
		return new vector2(x,y);;	
	}
	
	var draw = function(ctx) {
		ctx.beginPath();
		ctx.arc(pos.x, pos.y, size, 0, Math.PI*2);
		ctx.fillStyle = 'rgb(255, 0, 0)';
		ctx.fill();
	};
	
	return {
		getPos: getPos,
		getSize: getSize,
		getVel: getVel,
		setPos: setPos,
		setSize: setSize,
		setVel: setVel,
		isIdle: isIdle,
		move: move,
		update: update,
		collides: collides,
		findCollisionPoint: findCollisionPoint,
		draw: draw
	}
};

module.exports = Player;