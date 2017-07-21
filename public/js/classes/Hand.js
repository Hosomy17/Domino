var Hand = function(e, t){
  this.edges = e;
  this.turn = t;
  this.pieces = [1,2];
  this.group = null;
  this.reservedPiece = null;
}

Hand.prototype = {
  create : function(){
    //Create Hand
    this.turn = Link.match.turn;
    this.group = Game.add.sprite(Game.world.centerX, Game.world.height - 50, 'hand');//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< posição
    this.group.anchor.set(0.5);
    this.group.scale.set(0.9);
    var pieces = Link.player.pieces;
    var hand = this;
    for (var i = 0; i < STATIC.TOTAL_PIECES; i++){
        piece = pieces[i];
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
                edges.selectedPiece = obj;
                edges.showBlanks();
            }
        });

        //Add to hand
        this.group.addChild(sprite);
    }
  },

  finishSelect : function(direction){
    this.edges.selectedPiece.visible = false;
    this.edges.edges.center.blank.normal.visible = false;
    this.edges.edges.up.blank.side.visible       = false;
    this.edges.edges.down.blank.side.visible     = false;
    this.edges.edges.left.blank.side.visible     = false;
    this.edges.edges.right.blank.side.visible    = false;
    this.edges.edges.up.blank.normal.visible     = false;
    this.edges.edges.down.blank.normal.visible   = false;
    this.edges.edges.left.blank.normal.visible   = false;
    this.edges.edges.right.blank.normal.visible  = false;

    var move = {piece:this.selectedPiece.piece, direction:direction};
    Link.sendMove(move);

    if(this.edges.selectedPiece){
      for(i = 0; i < this.pieces.length; i++){ //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<alterar isso para hand
        if(this.pieces[i].piece[2] == this.edges.selectedPiece.piece[2])
          this.pieces.splice(i,1);
      }
    }
    this.edges.selectedPiece = null;//<<<<<<<<<<<<<<<<<<<<<<<<<<<<ainda em edge?
  },

  autoPlay: function(){
    console.log(this.reservedPiece);
    this.edges.selectedPiece = this.reservedPiece.p;
    this.finishSelect(this.reservedPiece.d);
  }
};
