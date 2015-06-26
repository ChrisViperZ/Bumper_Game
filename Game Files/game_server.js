function vector2(x, y) {
	this.x = x;
	this.y = y;
};

function calculateMagnitude(p) {
	return Math.sqrt(Math.pow(p.getVel().x, 2) + Math.pow(p.getVel().y, 2));
};

function collidePlayers(pl1, pl2) {
	vp = pl1.findCollisionPoint(pl2);
	p1mag = calculateMagnitude(pl1);
	p2mag = calculateMagnitude(pl2);
	p1angle = Math.atan2((pl1.getPos().y - vp.y), (pl1.getPos().x - vp.x));
	p2angle = p1angle + Math.PI;
	newVelX1 = p2mag * Math.cos(p1angle);
	newVelY1 = p2mag * Math.sin(p1angle);
	newVelX2 = p1mag * Math.cos(p2angle);
	newVelY2 = p1mag * Math.sin(p2angle);
	pl1.setVel(new vector2(newVelX1, newVelY1));
	pl2.setVel(new vector2(newVelX2, newVelY2));
};


var express = require('express');
var app = express();
app.use(express.static(__dirname));
var http = require('http').Server(app);
var io = require('socket.io')(http);
var player = require('./Player.js');
var stage = require('./Stage.js');
var width = 500,
	height = 500;
var playerPositions = []
var currentStage = new stage(new vector2(width/2, height/2), 200);

p1 = new player(new vector2(100,100), 50);
p2 = new player(new vector2(300,100), 50);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/game.html');
});

io.on('connection', function(socket){
	console.log("a user connected");
	socket.on('disconnect', function(){
		console.log('a user disconnected');
	});
	setInterval(function(){
		p1.setVel(new vector2(3,0));
		
		if(!p1.isIdle())
			p1.update();
		if(!p2.isIdle())
			p2.update();
			
		if(p1.collides(p2)) 
			collidePlayers(p1, p2);
	
		playerPositions = [];
		playerPositions.push(p1.getPos());
		playerPositions.push(p2.getPos());
		socket.emit('update', playerPositions);
	}, 1000 / 60);
});

http.listen(3000, function(){
	console.log('listening on localhost:3000');
});