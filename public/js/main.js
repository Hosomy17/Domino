var Game = new Phaser.Game(1000, 1000, Phaser.AUTO, 'phaser-game', {preload:preload,create:create,update:update});

var State = {
	LudusSplash: function () {
	}
};

function preload(){
	Game.load.script('menu','/js/states/menu.js');
	Game.load.script('load','/js/states/load.js');
	Game.load.script('game','/js/states/game.js');
	Game.load.script('gameover','/js/states/gameover.js');

	Game.load.script('core','/js/classes/core.js');
	Game.load.script('hud','/js/classes/hud.js');
	Game.load.script('table','/js/classes/table.js');
	Game.load.script('hand','/js/classes/hand.js');
	Game.load.script('edges','/js/classes/edges.js');
}

function create(){
	Game.stage.disableVisibilityChange = true;

	Game.state.add('MenuState', new State.Menu());
	Game.state.add('LoadState', new State.Load());
	Game.state.add('GameState', State.Game);
	Game.state.add('GameoverState', State.GameOver);

	Game.state.start('MenuState');
}

function update(){

}
