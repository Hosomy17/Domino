State.Load = function(){

}

State.Load.prototype = {

	 preload : function()	{
		this.load.script('link','/js/link.js');
		this.load.spritesheet('load', 'assets/sprites/load.png',50,50);
		this.load.script('core','/js/classes/core.js');
		this.load.script('hud','/js/classes/hud.js');
		this.load.script('table','/js/classes/table.js');
		this.load.script('hand','/js/classes/hand.js');
		this.load.script('edges','/js/classes/edges.js');
	},

	create : function(){
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
