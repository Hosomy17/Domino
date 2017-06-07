var STATIC = {
    TOTAL_PLAYERS : 4,
    TOTAL_PIECES  : 7,
    WIDTH_PIECE   : 68,
    HEIGHT_PIECE  : 134
}
GameState = (function(){

  var _turn = 0;
  var _countPass = 0;
  var _flagStart = true;//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>SOCORRO
  var _maxPieceRow = 0;//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>maior numero de peças em uma fila
  var _scaleTable = 1;
  var _players = [];
  var _edges = null;
  var _score = null;
  var _table = null;

	function preload(){
    this.load.spritesheet('domino', 'assets/sprites/domino.png',STATIC.WIDTH_PIECE,STATIC.HEIGHT_PIECE);//<<<<<<<<<<<<<<<<<<<<<<<< dimenção
    this.load.spritesheet('hand',   'assets/sprites/hand.png');//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< spritesheet??????
    this.load.spritesheet('table',  'assets/sprites/table.png');//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< spritesheet??????
    this.load.spritesheet('blank',  'assets/sprites/blank.png');//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< spritesheet??????
    this.load.spritesheet('pass',   'assets/sprites/pass.png',90,30);
	}

	function create(){
    _edges = new Edges();
    _edges.create();
    hand = new Hand(game, _edges, _turn);
    hand.create();
    table = new Table(game, _edges);
    table.create();
    hud = new Hud(game);
    hud.create();
    _players = hud.players;
    _score = hud.score;
    _table = table.group;
	}

	function update(){
    move = Link.getLastMove();
    if(move)
      doMove(move);
	}

  function skipMove(){
    ok=true;
    if(_turn != Link.getPlayer().turn)
        ok = false;

    pieces = Link.getPlayer().pieces;
    nums = [];
    nums[0] = _edges.edges.up.open;
    nums[1] = _edges.edges.down.open;
    nums[2] = _edges.edges.right.open;
    nums[3] = _edges.edges.left.open;
    for (var i=0;i < pieces.length;i++) {
      for (var j=0;j < nums.length;j++) {
        if(pieces[i][0] == nums[j] || pieces[i][1] == nums[j])
          ok=false;
      }
    }
    if(ok)
      _edges.finishSelect(null,null);
    if(_players[data.player.turn].ctn <= 1)
      Link.newRound();
  }

  function doMove(data){

    if(++_turn >= STATIC.TOTAL_PLAYERS)
      _turn = 0;

    if(data.move.piece == null){
      _countPass
      return 0;
    }

    drawMove(data);
    _players[data.player.turn].ctn--;
    points = calculatePoints();
    if(points % 5 == 0){
      _players[data.player.turn].points += points;
      _score[data.player.team].total += points;
    }
    if(Link.getPlayer().turn != data.player.turn){
      _players[data.player.turn].totalPieces.text = _players[data.player.turn].ctn;
    }
    _score[data.player.team].text.text = "pts "+_score[data.player.team].total;

    if(_edges.flagStart){
      _edges.flagStart = false;
      _edges.edges.up.open     = data.move.piece[0];
      _edges.edges.down.open   = data.move.piece[0];
      _edges.edges.left.open   = data.move.piece[0];
      _edges.edges.right.open  = data.move.piece[0];
      _edges.edges.center.open = data.move.piece[0];
    }

    sprite.anchor.set(0.5);
    _table.addChild(sprite);

    //Zoom out
    if(_maxPieceRow < edge.total){
      _maxPieceRow = edge.total;
      tableScale = _table.scale;
      if(_scaleTable > 0.6)
        //_table.scale.set(tableScale.x - 0.1);
        _scaleTable -= 0.1;
      game.add.tween(_table.scale).to( { x: _scaleTable, y: _scaleTable,}, 500, Phaser.Easing.Linear.None, true);
    }
  }

  function drawMove(data){
    orientation = (data.move.piece[0] == data.move.piece[1] ) ? 'side' : 'normal';
    edge = _edges.edges[data.move.direction];

    sprite = game.add.sprite(edge.blank[orientation].x,edge.blank[orientation].y,'domino',data.move.piece[2]);//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<melhorar atributos
    sprite.angle = edge.blank[orientation].angle;

    edge.total++;
    if(edge.open == data.move.piece[0])//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<roda se o lado for o outro
    {
      sprite.angle += 180;
      edge.open = data.move.piece[1];
      edge.points = data.move.piece[1];
    }
    else{
      edge.open = data.move.piece[0];
      edge.points = data.move.piece[0];
    }

    edge.points *= (data.move.piece[0]==data.move.piece[1]) ? 2 : 1;

    if(edge.total == 7 && (data.move.direction == 'right' || data.move.direction == 'left')){
      edge.blank.normal.angle += 90;
      edge.blank.side.angle += 90;
      switch (data.move.direction) {
        case 'right':
          edge.nextPosition    = _edges.formulaPositions.down;
          edge.blank.normal.y -= STATIC.WIDTH_PIECE/2;
          edge.blank.side.y   -= STATIC.WIDTH_PIECE/2;
          edge.blank.normal.x += STATIC.WIDTH_PIECE/2;
          edge.blank.side.x   += STATIC.WIDTH_PIECE;
        break;
        case 'left':
          edge.nextPosition    = _edges.formulaPositions.up;
          edge.blank.normal.y += STATIC.WIDTH_PIECE/2;
          edge.blank.side.y   += STATIC.WIDTH_PIECE/2;
          edge.blank.normal.x -= STATIC.WIDTH_PIECE/2;
          edge.blank.side.x   -= STATIC.WIDTH_PIECE;
        break;
      }
    }
    else if (edge.total == 5 &&  (data.move.direction == 'up' || data.move.direction == 'down')) {
      edge.blank.normal.angle += 90;
      edge.blank.side.angle += 90;
      switch (data.move.direction) {
        case 'up':
          edge.nextPosition     = _edges.formulaPositions.right;
          edge.blank.normal.x -= STATIC.WIDTH_PIECE/2;
          edge.blank.side.x   -= STATIC.WIDTH_PIECE/2;
          edge.blank.normal.y -= STATIC.WIDTH_PIECE/2;
          edge.blank.side.y   -= STATIC.WIDTH_PIECE;
        break;
        case 'down':
          edge.nextPosition    = _edges.formulaPositions.left;
          edge.blank.normal.x += STATIC.WIDTH_PIECE/2;
          edge.blank.side.x   += STATIC.WIDTH_PIECE/2;
          edge.blank.normal.y += STATIC.WIDTH_PIECE/2;
          edge.blank.side.y   += STATIC.WIDTH_PIECE;
        break;
      }
    }

    //Move blank to the next edge
    edge.nextPosition(edge.blank, orientation);
  }

  function calculatePoints(){

    _edges.edges.center.points *= (_edges.edges.left.total > 0 && _edges.edges.right.total > 0) ? 0 : 1;

    points = _edges.edges.center.points + _edges.edges.up.points + _edges.edges.right.points + _edges.edges.down.points + _edges.edges.left.points;
    return points;
  }

  return {preload: preload, create:create, update:update};
})();
