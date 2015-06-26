function vector2(x, y) {
	this.x = x;
	this.y = y;
}

var keys;
keys = new Keys();
	
window.addEventListener("keydown", onKeydown, false);
window.addEventListener("keyup", onKeyup, false);

function onKeydown(e) {
	if (p1) {
		keys.onKeyDown(e);
	}
};

function onKeyup(e) {
	if (p1) {
		keys.onKeyUp(e);
	}
};

socket.on('update', function(data){
	context.clearRect(0,0,canvas.width, canvas.height);
	stage.draw(context);
	p1.setPos(data[0]);
	p2.setPos(data[1]);
	p1.draw(context);
	p2.draw(context);
});


// function animate() {
	// context.clearRect(0,0,canvas.width, canvas.height);
	// stage.draw();
	
	// localPlayer.move(keys);
	// remotePlayer.move(keys);
	
	// if(!localPlayer.isIdle())
		// localPlayer.update();
	// if(!remotePlayer.isIdle())
		// remotePlayer.update();
		
	// if(localPlayer.collides(remotePlayer)) 
		// collidePlayers(localPlayer, remotePlayer);
	
	// localPlayer.draw(context);
	// remotePlayer.draw(context);
	// requestAnimationFrame(animate);
// };
