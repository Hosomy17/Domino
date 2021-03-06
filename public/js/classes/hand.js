var Hand = function(e){
  this.edges = e;
  this.turn;
  this.pieces = [1,2];
  this.group = null;
  this.autoPiece = null;
  this.core = null;
}

Hand.prototype = {
  create : function(){
    //Create Hand
    this.turn = Link.match.turn;
    this.group = Game.add.sprite(Game.world.centerX, Game.world.height - 100, 'hand');//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< posição
    this.group.anchor.set(0.5);
    //this.group.scale.set(0.7);
    var pieces = Link.player.pieces;
    var hand = this;
    for (var i = 0; i < STATIC.TOTAL_PIECES; i++){
        var piece = pieces[i];
        //Create Sprite
        //2 EXTRAS PIECES TO SIDES, STARTS BY -(TOTAL_PIECES/2) ENDS TO TOTAL_PIECES/2
        //[-4]* [-3] [-2] [-1] [0] [1] [2] [3] [4]*  EXEMPLE TOTAL=7 PIECES
        sprite = Game.add.sprite(this.group.width/(STATIC.TOTAL_PIECES + 2)*(i-(Math.floor(STATIC.TOTAL_PIECES/2))), 0, 'domino', piece[2]);//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< pocição e melhorar atributos da peça
        sprite.anchor.set(0.5);

        //Set input listener
        sprite.piece = piece;
        sprite.inputEnabled = true;
        this.pieces[i] = sprite;
        var edges = this.edges;
        sprite.events.onInputDown.add(
        function(obj){
            if(hand.turn == Link.player.turn){
                edges.selected = obj;
                edges.showBlanks();
            }
        });

        //Add to hand
        this.group.addChild(sprite);
    }
  },

  finishSelect : function(direction){//<<<<<<<<<<<<<<<<<<<<<<<<<<<duplicado no core
    Game.time.events.removeAll();
    this.edges.hideBlanks();

    var piece = this.edges.selected;
    if(piece){
      piece.visible = false;
      piece = piece.piece;
      for(i = 0; i < this.pieces.length; i++){ //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<alterar isso para hand
        if(this.pieces[i].piece[2] == piece[2])
          this.pieces.splice(i,1);
      }
    }
    var move = {piece:piece, direction:direction};
    var forceBreak = (this.core.cntSkip == 3 && !piece) || (this.core.players[Link.player.turn].ctn == 1 && piece);
    Link.sendMove(move,forceBreak);
    this.edges.selected = null;//<<<<<<<<<<<<<<<<<<<<<<<<<<<<ainda em edge?
  }
};
