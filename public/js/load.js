LoadState = (function(){

	function preload()	{
		this.load.script('link','/js/link.js');
		this.load.spritesheet('load', 'assets/sprites/load.png',50,50);
	}

	function create(){
		Link.requestMatch();
		game.stage.backgroundColor = '#57C651';
		load = game.add.sprite(game.world.centerX, game.world.centerY, 'load', 0);
		load.anchor.set(0.5);
		load = load.animations.add('loading');
		load.play(10,true);
	}

	function update(){
		if(Link.getStatus() == 'Ready')
			game.state.start('GameState');
	}

	return {preload: preload, create:create, update:update};
})();
