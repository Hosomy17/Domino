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
    this.load.spritesheet('domino', 'assets/sprites/domino.png',STATIC.WIDTH_PIECE,STATIC.HEIGHT_PIECE);
    this.load.spritesheet('hand',   'assets/sprites/hand.png');
    this.load.spritesheet('table',  'assets/sprites/table.png');
    this.load.spritesheet('blank',  'assets/sprites/blank.png');
    this.load.spritesheet('turn',   'assets/sprites/turn.png');
    this.load.spritesheet('final',  'assets/sprites/final.png');
    this.load.spritesheet('options','assets/sprites/options.png');
    this.load.spritesheet('shadow',  'assets/sprites/shadow.png');
    this.load.spritesheet('shadow-s',  'assets/sprites/shadow-s.png');
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

    _core = new Core(hand, hud, edges, table);
    _core.create();
    _core.skipMove();
	}

	function update(){
    var move = Link.player.lastMove;
    if(move){
      _core.doMove(move);
    }
    _core.update();
	}

  return {preload: preload, create:create, update:update};
})();
