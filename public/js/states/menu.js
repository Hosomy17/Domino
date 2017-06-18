State.Menu = function(game){
	this.game = game;
};

State.Menu.prototype = {
	preload : function (){
		this.load.spritesheet('start', 'assets/sprites/start.png',100,50);
	},

	create : function (){
		this.game.stage.backgroundColor = '#57C651';
		var btn = this.game.add.button(this.game.world.width * 0.5, this.game.world.height * 0.75, 'start', function(){this.game.state.start('LoadState')}, this, 1, 0, 2);
	},

	update : function (){

	}
}
