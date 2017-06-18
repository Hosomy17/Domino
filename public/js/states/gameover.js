State.GameOver = (function(){

	function preload()	{
		this.load.spritesheet('load', 'assets/sprites/load.png',50,50);
	}

	function create(){
		load = game.add.sprite(game.world.centerX, game.world.centerY, 'load', 0);
		load.anchor.set(0.5);
		load = load.animations.add('loading');
		load.play(10,true);
		if(Link.getPlayer().turn == 0)
			Link.newRound();
	}

	function update(){
		if(Link.getStatus() == 'Ready')
			game.state.start('GameState');
	}

	return {preload: preload, create:create, update:update};
})();
