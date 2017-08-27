var Game = new Phaser.Game("100%", "100%", Phaser.AUTO, 'phaser-game', {preload:preload,create:create,update:update});
var State = {
	LudusSplash: function () {
	}
};

function preload(){
	Game.load.script('menu','/js/states/menu.js');
	Game.load.script('load','/js/states/load.js');
}

function create(){
	Game.stage.disableVisibilityChange = true;

	Game.stage.backgroundColor = '#3F2832';
	Game.scale.pageAlignHorizontally = true;
	Game.scale.pageAlignVertically = true;
	Game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	Game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

	//Game.scale.minWidth = 200;
	//Game.scale.minHeight = 200;
	//Game.scale.maxWidth = 600;
	//Game.scale.maxHeight = 600;
	Game.scale.forceLandscape = true;

	Game.state.add('MenuState', new State.Menu());
	Game.state.add('LoadState', new State.Load());

	Game.state.start('MenuState');
}

function update(){

}
