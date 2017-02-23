MenuState = (function(){

	function preload(){
		game.load.spritesheet('start', '/assets/sprites/start_200x75.png',200,75);
	}

	function create(){
		game.stage.backgroundColor = '#57C651';
		btn = game.add.button(game.world.width * 0.5, game.world.height * 0.75, 'start', function(){game.state.start('LoadState')}, this, 1, 0, 2);
	}

	function update(){
		
	}

	return {preload: preload, create:create, update:update};
})();