var game = new Phaser.Game(1024, 800, Phaser.AUTO, 'phaser-game', {preload:preload,create:create,update:update});

function preload(){
	game.load.script('menu','/js/menu.js');
	game.load.script('load','/js/load.js');
	game.load.script('game','/js/game.js');

}

function create(){
	this.stage.disableVisibilityChange = true;
	
	game.state.add('MenuState', MenuState);
	game.state.add('LoadState', LoadState);
	game.state.add('GameState', GameState);

	game.state.start('LoadState');
}

function update(){

}
