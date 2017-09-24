State.Menu = function(){
};

State.Menu.prototype = {
	preload : function (){
		this.load.spritesheet('start', 'assets/sprites/start.png',75,25);
		this.load.spritesheet('bg', 'assets/sprites/title.png');
	},

	create : function (){
		var btn = Game.add.button(Game.world.centerX, Game.world.height * 0.75, 'start', function(){Game.state.start('LoadState')}, this, 1, 0, 2);//<<<<<<<this está ok?
		var bg = Game.add.sprite(Game.world.centerX, Game.world.centerY, 'bg');
		bg.anchor.set(0.5);
		btn.anchor.set(0.5);
		btn.setScaleMinMax(2);
	},

	update : function (){

	}
}
