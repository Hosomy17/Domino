GameState = (function(){

  var STATIC = {
      TOTAL_PLAYERS : 4,
      TOTAL_PIECES  : 7,
      WIDTH_PIECE   : 68,
      HEIGHT_PIECE  : 134
  }

  var _turn = 0;
  var _hand;
  var _table;
  var _selectedPiece;
  var _flagStart = true;//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>SOCORRO
  var _maxPieceRow = 0;//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>maior numero de peças em uma fila
  var _scaleTable = 1;
  var _text0;
  var _text1;
  var _text2;
  var _text3;


  var _edges = {
      center : {
        blank : {
          normal : null,
          side   : null,
        },
        open    : null,
        points  : 0,
        total   : 0,
        nextPosition : function(blank, orietantion){}
      },
      up : {
        blank : {
          normal : null,
          side   : null,
        },
        open     : null,
        points  : 0,
        total    : 0,
        nextPosition : function(blank, orietantion) {
          if(orietantion == 'normal'){
            blank.side.y = blank.normal.y - (STATIC.WIDTH_PIECE+ STATIC.HEIGHT_PIECE)/2;
            blank.normal.y -= STATIC.HEIGHT_PIECE;
          }
          else {
            blank.normal.y = blank.side.y - (STATIC.WIDTH_PIECE + STATIC.HEIGHT_PIECE)/2;
            blank.side.y -= STATIC.WIDTH_PIECE;
          }
        }
      },
      down : {
        blank : {
          normal : null,
          side   : null,
        },
        open     : null,
        points  : 0,
        total    : 0,
        nextPosition : function(blank, orietantion) {
          if(orietantion == 'normal'){
            blank.side.y = blank.normal.y + (STATIC.WIDTH_PIECE+ STATIC.HEIGHT_PIECE)/2;
            blank.normal.y += STATIC.HEIGHT_PIECE;
          }
          else {
            blank.normal.y = blank.side.y + (STATIC.WIDTH_PIECE+ STATIC.HEIGHT_PIECE)/2;
            blank.side.y += STATIC.WIDTH_PIECE;
          }
        }
      },
      right : {
        blank : {
          normal : null,
          side   : null,
        },
        open     : null,
        points  : 0,
        total    : 0,
        nextPosition : function(blank, orietantion) {
          if(orietantion == 'normal'){
            blank.side.x = blank.normal.x + (STATIC.WIDTH_PIECE + STATIC.HEIGHT_PIECE)/2;
            blank.normal.x += STATIC.HEIGHT_PIECE;
          }
          else {
            blank.normal.x = blank.side.x + (STATIC.WIDTH_PIECE+ STATIC.HEIGHT_PIECE)/2;
            blank.side.x += STATIC.WIDTH_PIECE;
          }
        }
      },
      left : {
        blank : {
          normal : null,
          side   : null,
        },
        open     : null,
        points  : 0,
        total    : 0,
        nextPosition : function(blank, orietantion) {
          if(orietantion == 'normal'){
            blank.side.x = blank.normal.x - (STATIC.WIDTH_PIECE + STATIC.HEIGHT_PIECE)/2;
            blank.normal.x -= STATIC.HEIGHT_PIECE;
          }
          else {
            blank.normal.x = blank.side.x - (STATIC.WIDTH_PIECE+ STATIC.HEIGHT_PIECE)/2;
            blank.side.x -= STATIC.WIDTH_PIECE;
          }
        }
      }
  };

  var _formulaPositions = {
    up    : _edges.up.nextPosition,
    right : _edges.right.nextPosition,
    down  : _edges.down.nextPosition,
    left  : _edges.left.nextPosition
  }

	function preload(){
        this.load.spritesheet('domino', 'assets/sprites/domino.png',STATIC.WIDTH_PIECE,STATIC.HEIGHT_PIECE);//<<<<<<<<<<<<<<<<<<<<<<<< dimenção
        this.load.spritesheet('hand', 'assets/sprites/hand.png');//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< spritesheet??????
        this.load.spritesheet('table', 'assets/sprites/table.png');//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< spritesheet??????
        this.load.spritesheet('blank', 'assets/sprites/blank.png');//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< spritesheet??????
        this.load.spritesheet('pass', 'assets/sprites/pass.png',90,30);

	}

	function create(){
        loadTable();

        loadHand();
	}

	function update(){
        move = Link.getLastMove();
        if(move){
            doMove(move);
        }
	}

  function loadTable(){
      _table = game.add.sprite(game.world.centerX,game.world.centerY,'table');
      _table.anchor.set(0.5);
      _table.scale.set(1);

      sprite = game.add.sprite(0,0,'blank');
      sprite.anchor.set(0.5);
      sprite.visible = false;
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(function(obj){
          _selectedPiece.visible = false;
          finishSelect(_selectedPiece.piece, "center");
      });
      _table.addChild(sprite);
      _edges.center.blank.normal = sprite;
      _edges.center.blank.side = sprite;

      sprite = game.add.sprite(0,-STATIC.HEIGHT_PIECE,'blank');
      sprite.anchor.set(0.5);
      sprite.visible = false;
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(function(obj){
          _selectedPiece.visible = false;
          finishSelect(_selectedPiece.piece, "up");
      });
      _table.addChild(sprite);
      _edges.up.blank.normal = sprite;

      sprite = game.add.sprite(0,- (STATIC.HEIGHT_PIECE + STATIC.WIDTH_PIECE)/2,'blank');
      sprite.anchor.set(0.5);
      sprite.angle = 90;
      sprite.visible = false;
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(function(obj){
          _selectedPiece.visible = false;
          finishSelect(_selectedPiece.piece, "up");
      });
      _table.addChild(sprite);
      _edges.up.blank.side = sprite;

      sprite = game.add.sprite(0,STATIC.HEIGHT_PIECE,'blank');
      sprite.anchor.set(0.5);
      sprite.angle = 180;
      sprite.visible = false;
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(function(obj){
          _selectedPiece.visible = false;
          finishSelect(_selectedPiece.piece, "down");
      });
      _table.addChild(sprite);
      _edges.down.blank.normal = sprite;

      sprite = game.add.sprite(0,(STATIC.HEIGHT_PIECE + STATIC.WIDTH_PIECE)/2,'blank');
      sprite.anchor.set(0.5);
      sprite.angle = 270;
      sprite.visible = false;
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(function(obj){
          _selectedPiece.visible = false;
          finishSelect(_selectedPiece.piece, "down");
      });
      _table.addChild(sprite);
      _edges.down.blank.side = sprite;


      sprite = game.add.sprite((STATIC.HEIGHT_PIECE + STATIC.WIDTH_PIECE)/2,0,'blank');
      sprite.anchor.set(0.5);
      sprite.angle = 90;
      sprite.visible = false;
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(function(obj){
          _selectedPiece.visible = false;
          finishSelect(_selectedPiece.piece, "right");
      });
      _table.addChild(sprite);
      _edges.right.blank.normal = sprite;

      sprite = game.add.sprite(STATIC.WIDTH_PIECE,0,'blank');
      sprite.anchor.set(0.5);
      sprite.angle = 180;
      sprite.visible = false;
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(function(obj){
          _selectedPiece.visible = false;
          finishSelect(_selectedPiece.piece, "right");
      });
      _table.addChild(sprite);
      _edges.right.blank.side = sprite;

      sprite = game.add.sprite(-(STATIC.HEIGHT_PIECE + STATIC.WIDTH_PIECE)/2,0,'blank');
      sprite.anchor.set(0.5);
      sprite.angle = 270;
      sprite.visible = false;
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(function(obj){
          _selectedPiece.visible = false;
          finishSelect(_selectedPiece.piece, "left");
      });
      _table.addChild(sprite);
      _edges.left.blank.normal = sprite;

      sprite = game.add.sprite(-STATIC.WIDTH_PIECE,0,'blank');
      sprite.anchor.set(0.5);
      sprite.visible = false;
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(function(obj){
          _selectedPiece.visible = false;
          finishSelect(_selectedPiece.piece, "left");
      });
      _table.addChild(sprite);
      _edges.left.blank.side = sprite;

      style = { font: "65px Arial", fill: "#ff0044", align: "center" };
      _text0 = game.add.text(-400, 0, "0", style);
      _table.addChild(_text0);
      _text1 = game.add.text( 400, 0, "0", style);
      _table.addChild(_text1);
      _text2 = game.add.text(0, -400, "0", style);
      _table.addChild(_text2);
      _text3 = game.add.text(0, 400, "0", style);
      _table.addChild(_text3);
      //bmpText.inputEnabled = true;

  }

  function loadHand(){
      //Create Hand
      _hand = game.add.sprite(game.world.centerX, game.world.height - 50, 'hand');//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< pocição
      _hand.anchor.set(0.5);
      _hand.scale.set(0.9);
      pieces = Link.getPlayer().pieces;
      for (var i = 0; i < STATIC.TOTAL_PIECES; i++){
          piece = pieces[i];

          //Create Sprite
          //2 EXTRAS PIECES TO SIDES, STARTS BY -(TOTAL_PIECES/2) ENDS TO TOTAL_PIECES/2
          //[-4]* [-3] [-2] [-1] [0] [1] [2] [3] [4]*  EXEMPLE TOTAL=7 PIECES
          sprite = game.add.sprite(_hand.width/(STATIC.TOTAL_PIECES + 2)*(i-(Math.floor(STATIC.TOTAL_PIECES/2))), 0, 'domino', piece[2]);//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< pocição e melhorar atributos da peça
          sprite.anchor.set(0.5);

          //Set input listener
          sprite.piece = piece;
          sprite.inputEnabled = true;
          sprite.events.onInputDown.add(
          function(obj)
          {
              if(_turn == Link.getPlayer().turn)
              {
                  _selectedPiece = obj;
                  showBlanks();
              }
          });

          //Add to hand
          _hand.addChild(sprite);
      }
      buttonExit = game.add.button(game.world.width - 100, game.world.height - 50, 'pass', skipMove, this, 0, 1, 2);//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< pocição
      //buttonExit.anchor.set(0.5);
  }

  function showBlanks()
  {
    _edges.center.blank.visible       = false;
    _edges.up.blank.side.visible      = false;
    _edges.down.blank.side.visible    = false;
    _edges.left.blank.side.visible    = false;
    _edges.right.blank.side.visible   = false;
    _edges.up.blank.normal.visible    = false;
    _edges.down.blank.normal.visible  = false;
    _edges.left.blank.normal.visible  = false;
    _edges.right.blank.normal.visible = false;
    if(_flagStart)
    {
      _edges.center.blank.normal.visible = (_selectedPiece.piece[0] + _selectedPiece.piece[1] == 12) ? true : false;
    }
    else if (_selectedPiece.piece[0] == _selectedPiece.piece[1])
    {
      _edges.up.blank.side.visible    = (_selectedPiece.piece[0] == _edges.up.open) ? true : false;
      _edges.down.blank.side.visible  = (_selectedPiece.piece[0] == _edges.down.open) ? true : false;
      _edges.left.blank.side.visible  = (_selectedPiece.piece[0] == _edges.left.open) ? true : false;
      _edges.right.blank.side.visible = (_selectedPiece.piece[0] == _edges.right.open) ? true : false;
    }
    else
    {
      _edges.up.blank.normal.visible    = (_selectedPiece.piece[0] == _edges.up.open || _selectedPiece.piece[1] == _edges.up.open) ? true : false;
      _edges.down.blank.normal.visible  = (_selectedPiece.piece[0] == _edges.down.open || _selectedPiece.piece[1] == _edges.down.open) ? true : false;
      _edges.left.blank.normal.visible  = (_selectedPiece.piece[0] == _edges.left.open || _selectedPiece.piece[1] == _edges.left.open) ? true : false;
      _edges.right.blank.normal.visible = (_selectedPiece.piece[0] == _edges.right.open || _selectedPiece.piece[1] == _edges.right.open) ? true : false;
    }
  }

  function skipMove()
  {
    if(_turn != Link.getPlayer().turn){
        return 0;
    }
    /////////////////////////////////////////////////////////////////////////////VERIFICAR SE NÃO TEM OPÇÕES SE TIVER FAZER HIGHLIGHT
    finishSelect(null,null);
  }

  function finishSelect(piece, direction)
  {
    _edges.center.blank.normal.visible = false;
    _edges.up.blank.side.visible       = false;
    _edges.down.blank.side.visible     = false;
    _edges.left.blank.side.visible     = false;
    _edges.right.blank.side.visible    = false;
    _edges.up.blank.normal.visible     = false;
    _edges.down.blank.normal.visible   = false;
    _edges.left.blank.normal.visible   = false;
    _edges.right.blank.normal.visible  = false;

    move = {piece:piece, direction:direction};
    Link.sendMove(move);
  }

  function doMove(data)
  {

    if(data.move.piece == null)
      return 0;

    drawMove(data);

    calculatePoints();


    if(_flagStart){
      _flagStart = false;
      _edges.up.open     = data.move.piece[0];
      _edges.down.open   = data.move.piece[0];
      _edges.left.open   = data.move.piece[0];
      _edges.right.open  = data.move.piece[0];
      _edges.center.open = data.move.piece[0];
    }

    _turn++;

    if(_turn >= STATIC.TOTAL_PLAYERS)
      _turn = 0;

    sprite.anchor.set(0.5);
    _table.addChild(sprite);

    //Zoom out
      if(_maxPieceRow < edge.total)
      {
        _maxPieceRow = edge.total;
        tableScale = _table.scale;
        if(_scaleTable > 0.6)
          //_table.scale.set(tableScale.x - 0.1);
          _scaleTable -= 0.1;
          game.add.tween(_table.scale).to( { x: _scaleTable, y: _scaleTable,}, 500, Phaser.Easing.Linear.None, true);
      }
  }

  function drawMove(data)
  {
    orientation = (data.move.piece[0] == data.move.piece[1] ) ? 'side' : 'normal';
    edge = _edges[data.move.direction];

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

    edge.points = (data.move.piece[0]==data.move.piece[1]) ? edge.points * 2 : edge.points;

    if(edge.total == 7 && (data.move.direction == 'right' || data.move.direction == 'left'))
    {
      edge.blank.normal.angle += 90;
      edge.blank.side.angle += 90;
      switch (data.move.direction) {
        case 'right':
          edge.nextPosition = _formulaPositions.down;
          edge.blank.normal.y -= STATIC.WIDTH_PIECE/2;
          edge.blank.side.y   -= STATIC.WIDTH_PIECE/2;
          edge.blank.normal.x += STATIC.WIDTH_PIECE/2;
          edge.blank.side.x   += STATIC.WIDTH_PIECE;
        break;
        case 'left':
          edge.nextPosition = _formulaPositions.up;
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
          edge.nextPosition = _formulaPositions.right;
           edge.blank.normal.x -= STATIC.WIDTH_PIECE/2;
           edge.blank.side.x   -= STATIC.WIDTH_PIECE/2;
           edge.blank.normal.y -= STATIC.WIDTH_PIECE/2;
           edge.blank.side.y   -= STATIC.WIDTH_PIECE;
        break;
        case 'down':
          edge.nextPosition = _formulaPositions.left;
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
    _text0.text = _edges.center.points + _edges.up.points + _edges.right.points + _edges.down.points + _edges.left.points;
  }

  return {preload: preload, create:create, update:update};
})();
