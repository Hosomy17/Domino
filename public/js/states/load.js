State.Load = function(){

}

State.Load.prototype = {

	 preload : function()	{
		this.load.script('link','/js/link.js');
		this.load.spritesheet('load', 'assets/sprites/load.png',50,50);
	},

	create : function(){
		Link.requestMatch();
		var load = game.add.sprite(game.world.centerX, game.world.centerY, 'load', 0);
		load.anchor.set(0.5);
		load = load.animations.add('loading');
		load.play(10,true);
	},

	update : function(){
		if(Link.getStatus() == 'Ready')
			game.state.start('GameState');
	}

};
