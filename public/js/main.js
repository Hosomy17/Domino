var game = new Phaser.Game(1000, 1000, Phaser.AUTO, 'phaser-game', {preload:preload,create:create,update:update});

var State = {
	LudusSplash: function (game) {
		"use strict";
		this.game = game;
	}
}

function preload(){
	game.load.script('menu','/js/states/menu.js');
	game.load.script('load','/js/states/load.js');
	game.load.script('game','/js/states/game.js');
	game.load.script('core','/js/classes/core.js');
	game.load.script('gameover','/js/states/gameover.js');
	game.load.script('hud','/js/classes/Hud.js');
	game.load.script('table','/js/classes/Table.js');
	game.load.script('hand','/js/classes/hand.js');
	game.load.script('edges','/js/classes/Edges.js');
}

function create(){
	game.stage.disableVisibilityChange = true;

	game.state.add('MenuState', new State.Menu());
	game.state.add('LoadState', new State.Load());
	game.state.add('GameState', State.Game);
	game.state.add('GameoverState', State.GameOver);

	game.state.start('MenuState');
}

function update(){

}
