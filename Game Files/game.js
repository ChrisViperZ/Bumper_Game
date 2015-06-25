function vector2(x, y) {
	this.x = x;
	this.y = y;
}

var keys,
	localPlayer,
	remotePlayer;
	
var socket = io();

keys = new Keys();
	
window.addEventListener("keydown", onKeydown, false);
window.addEventListener("keyup", onKeyup, false);

function onKeydown(e) {
	if (localPlayer) {
		keys.onKeyDown(e);
	}
};

function onKeyup(e) {
	if (localPlayer) {
		keys.onKeyUp(e);
	}
};

function animate() {
	context.clearRect(0,0,canvas.width, canvas.height);
	stage.draw();
	
	localPlayer.move(keys);
	//remotePlayer.move(keys);
	
	if(!localPlayer.isIdle())
		localPlayer.update();
	if(!remotePlayer.isIdle())
		remotePlayer.update();
		
	if(localPlayer.collides(remotePlayer)) {
		// console.log('collide');
		collidePlayers(localPlayer, remotePlayer);
	}
	localPlayer.draw(context);
	remotePlayer.draw(context);
	requestAnimationFrame(animate);
};

socket.on('', function(){

});