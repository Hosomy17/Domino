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

  var _edges = {
      center : {
        blank: {
          normal : null,
          side : null,
        },
        open : null,
        total: 0,
        nextPosition : function(blank, orietantion){}
      },
      up : {
        blank: {
          normal : null,
          side : null,
        },
        open : null,
        total: 0,
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
        blank: {
          normal : null,
          side : null,
        },
        open : null,
        total: 0,
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
        blank: {
          normal : null,
          side : null,
        },
        open : null,
        total: 0,
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
        blank: {
          normal : null,
          side : null,
        },
        open : null,
        total: 0,
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
        move = Link.getLastMove()
        if(move){
            drawMove(move);
        }
	}

  function loadTable(){
      _table = game.add.sprite(game.world.centerX,game.world.centerY,'table');
      _table.anchor.set(0.5);
      _table.scale.set(0.3);

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
          sprite.events.onInputDown.add(function(obj){
              if(_turn == Link.getPlayer().turn){
                  _selectedPiece = obj;
                  showBlanks();
              }
          });

          //Add to hand
          _hand.addChild(sprite);
      }

      //btn = add.button(pass)
      //btn.clickdown = funciton(){
      //Link.sendMove({piece:null,direction:null});
    //}
  }

  function showBlanks(){
    _edges.center.blank.visible       = false;
    _edges.up.blank.side.visible      = false;
    _edges.down.blank.side.visible    = false;
    _edges.left.blank.side.visible    = false;
    _edges.right.blank.side.visible   = false;
    _edges.up.blank.normal.visible    = false;
    _edges.down.blank.normal.visible  = false;
    _edges.left.blank.normal.visible  = false;
    _edges.right.blank.normal.visible = false;
    //&& _selectedPiece.piece[0] + _selectedPiece.piece[1] == 12
    if(_flagStart){
      _edges.center.blank.normal.visible = true;
    }
    else if (_selectedPiece.piece[0] == _selectedPiece.piece[1]){
      _edges.up.blank.side.visible    = (_selectedPiece.piece[0] == _edges.up.open) ? true : false;
      _edges.down.blank.side.visible  = (_selectedPiece.piece[0] == _edges.down.open) ? true : false;
      _edges.left.blank.side.visible  = (_selectedPiece.piece[0] == _edges.left.open) ? true : false;
      _edges.right.blank.side.visible = (_selectedPiece.piece[0] == _edges.right.open) ? true : false;
    }
    else {
      _edges.up.blank.normal.visible    = (_selectedPiece.piece[0] == _edges.up.open || _selectedPiece.piece[1] == _edges.up.open) ? true : false;
      _edges.down.blank.normal.visible  = (_selectedPiece.piece[0] == _edges.down.open || _selectedPiece.piece[1] == _edges.down.open) ? true : false;
      _edges.left.blank.normal.visible  = (_selectedPiece.piece[0] == _edges.left.open || _selectedPiece.piece[1] == _edges.left.open) ? true : false;
      _edges.right.blank.normal.visible = (_selectedPiece.piece[0] == _edges.right.open || _selectedPiece.piece[1] == _edges.right.open) ? true : false;
    }
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

  function drawMove(data){
    _turn++;

    if(data.move.piece == null)
      return 0;
      
    orientation = (data.move.piece[0] == data.move.piece[1] ) ? 'side' : 'normal';
    edges = _edges[data.move.direction];

    sprite = game.add.sprite(edges.blank[orientation].x,edges.blank[orientation].y,'domino',data.move.piece[2]);//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<melhorar atributos
    sprite.angle = edges.blank[orientation].angle;

    if(edges.open == data.move.piece[0]){
      sprite.angle += 180;
      edges.open = data.move.piece[1];
    }
    else{
      edges.open = data.move.piece[0];
    }

    if(_turn >= STATIC.TOTAL_PLAYERS)
      _turn = 0;

    edges.nextPosition(edges.blank, orientation);

    if(_flagStart){
      _flagStart = false;
      _edges.up.open = data.move.piece[0];
      _edges.down.open = data.move.piece[0];
      _edges.left.open = data.move.piece[0];
      _edges.right.open = data.move.piece[0];
    }

    sprite.anchor.set(0.5);//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<angle
    _table.addChild(sprite);

    //Move blank to the next edge
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<TENTAR MELHOR ISSO
  }

  return {preload: preload, create:create, update:update};
})();
