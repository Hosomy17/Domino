LoadState = (function(){

	function preload()	{
		game.load.script('link','/js/link.js');
	}

	function create(){
		Link.requestMatch();
		game.stage.backgroundColor = '#57C651';
	}

	function update(){
		if(Link.getStatus() == 'Ready')
			game.state.start('GameState');
	}

	return {preload: preload, create:create, update:update};
})();
