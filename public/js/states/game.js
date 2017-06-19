var STATIC = {
    TOTAL_PLAYERS : 4,
    TOTAL_PIECES  : 7,
    WIDTH_PIECE   : 68,
    HEIGHT_PIECE  : 134
}
State.Game = (function(){

  var _hand;
  var _countPass = 0;
  var _flagStart = true;//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>SOCORRO
  var _maxPieceRow = 0;//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>maior numero de peças em uma fila
  var _scaleTable = 1;
  var _players = [];
  var _edges = null;
  var _score = null;
  var _table = null;
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
    _edges = new Edges();
    _hand = new Hand(game, _edges);
    table = new Table(game, _edges);
    hud = new Hud(game, table);
    _edges.create();
    _hand.create();
    table.create();
    hud.create();
    _players = hud.players;
    _score = hud.score;
    _table = table.group;

    _core = new Core(game, _hand, _edges, _players, _score, _table);
	}

	function update(){
    move = Link.getLastMove();
    if(move)
      _core.doMove(move);
	}

  return {preload: preload, create:create, update:update};
})();
