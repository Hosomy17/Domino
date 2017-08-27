State.Load = function(){

}

State.Load.prototype = {

	 preload : function()	{
		Game.load.script('game','/js/states/game.js');
		Game.load.script('gameover','/js/states/gameover.js');

		Game.load.script('link','/js/link.js');
		Game.load.spritesheet('load', 'assets/sprites/load.png',50,50);
		Game.load.script('core','/js/classes/core.js');
		Game.load.script('hud','/js/classes/hud.js');
		Game.load.script('table','/js/classes/table.js');
		Game.load.script('hand','/js/classes/hand.js');
		Game.load.script('edges','/js/classes/edges.js');
	},

	create : function(){
		Game.state.add('GameState', State.Game);
		Game.state.add('GameoverState', State.GameOver);

		Link.requestMatch();
		var load = Game.add.sprite(Game.world.centerX, Game.world.centerY, 'load', 0);
		load.anchor.set(0.5);
		load = load.animations.add('loading');
		load.play(10,true);
	},

	update : function(){
		if(Link.match.status == 'Ready')
			Game.state.start('GameState');
	}

};
