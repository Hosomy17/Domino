var game = new Phaser.Game(1000, 1000, Phaser.AUTO, 'phaser-game', {preload:preload,create:create,update:update});

function preload(){
	game.load.script('menu','/js/menu.js');
	game.load.script('load','/js/load.js');
	game.load.script('game','/js/game.js');
	game.load.script('hud','/js/classes/Hud.js');
	game.load.script('table','/js/classes/Table.js');
}

function create(){
	this.stage.disableVisibilityChange = true;

	game.state.add('MenuState', MenuState);
	game.state.add('LoadState', LoadState);
	game.state.add('GameState', GameState);

	game.state.start('MenuState');
}

function update(){

}
