State.Menu = function(){
};

State.Menu.prototype = {
	preload : function (){
		this.load.spritesheet('start', 'assets/sprites/start.png',100,50);
	},

	create : function (){
		Game.stage.backgroundColor = '#3F2832';
		var btn = Game.add.button(Game.world.width * 0.5, Game.world.height * 0.75, 'start', function(){Game.state.start('LoadState')}, this, 1, 0, 2);//<<<<<<<this está ok?
	},

	update : function (){

	}
}
