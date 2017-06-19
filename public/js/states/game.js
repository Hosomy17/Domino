var STATIC = {
    TOTAL_PLAYERS : 4,
    TOTAL_PIECES  : 7,
    WIDTH_PIECE   : 68,
    HEIGHT_PIECE  : 134
}
State.Game = (function(){
  var _core;

	function preload(){
    this.load.spritesheet('domino', 'assets/sprites/domino.png',STATIC.WIDTH_PIECE,STATIC.HEIGHT_PIECE);//<<<<<<<<<<<<<<<<<<<<<<<< dimenção
    this.load.spritesheet('hand',   'assets/sprites/hand.png');//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< spritesheet??????
    this.load.spritesheet('table',  'assets/sprites/table.png');//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< spritesheet??????
    this.load.spritesheet('blank',  'assets/sprites/blank.png');//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< spritesheet??????
    this.load.spritesheet('pass',   'assets/sprites/pass.png',90,30);
    this.load.spritesheet('turn',   'assets/sprites/turn.png');
	}

	function create(){
    Link.setStatus("waiting");
    var edges = new Edges();
    var hand = new Hand(game, edges);
    var table = new Table(game, edges);
    var hud = new Hud(game, table);
    edges.create();
    hand.create();
    table.create();
    hud.create();
    var players = hud.players;
    var score = hud.score;
    var table = table.group;

    _core = new Core(game, hand, edges, players, score, table);
	}

	function update(){
    move = Link.getLastMove();
    if(move)
      _core.doMove(move);
	}

  return {preload: preload, create:create, update:update};
})();
