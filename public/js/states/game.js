var STATIC = {
    TOTAL_PLAYERS : 4,
    TOTAL_PIECES  : 7,
    WIDTH_PIECE   : 68,
    HEIGHT_PIECE  : 134,
    POINT_SKIP    : 20,
    POINT_GALO    : 50,
    POINT_CARROCA : 20,
    POINT_GOAL    : 200
}
State.Game = (function(){
  var _core;

	function preload(){
    this.load.spritesheet('domino', 'assets/sprites/domino.png',STATIC.WIDTH_PIECE,STATIC.HEIGHT_PIECE);//<<<<<<<<<<<<<<<<<<<<<<<< dimenção
    this.load.spritesheet('hand',   'assets/sprites/hand.png');//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< spritesheet??????
    this.load.spritesheet('table',  'assets/sprites/table.png');//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< spritesheet??????
    this.load.spritesheet('blank',  'assets/sprites/blank.png');//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< spritesheet??????
    this.load.spritesheet('turn',   'assets/sprites/turn.png');
    this.load.spritesheet('final',  'assets/sprites/final.png');
    this.load.spritesheet('shadow',  'assets/sprites/shadow.png');
	}

	function create(){
    Link.match.status = "waiting";
    var edges = new Edges();
    var hand = new Hand(edges);
    var table = new Table(edges,hand);
    var hud = new Hud(table);
    edges.create();
    table.create();
    hand.create();
    hud.create();
    var players = hud.players;
    var score = hud.score;
    var table = table.group;
    _core = new Core(hand, hud, edges, players, score, table);
    _core.skipMove();
	}

	function update(){
    var move = Link.player.lastMove;
    if(move){
      _core.doMove(move);
    }
	}

  return {preload: preload, create:create, update:update};
})();
