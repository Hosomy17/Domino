var Hand = function(game, edges, turn){
  this.game  = game;
  this.edges = edges;
  this.turn = 0;
  this.group = null;
}

Hand.prototype = {
  create : function(){
    //Create Hand
    this.group = game.add.sprite(game.world.centerX, game.world.height - 50, 'hand');//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< posição
    this.group.anchor.set(0.5);
    this.group.scale.set(0.9);
    var pieces = Link.getPlayer().pieces;
    var hand = this;
    for (var i = 0; i < STATIC.TOTAL_PIECES; i++){
        piece = pieces[i];

        //Create Sprite
        //2 EXTRAS PIECES TO SIDES, STARTS BY -(TOTAL_PIECES/2) ENDS TO TOTAL_PIECES/2
        //[-4]* [-3] [-2] [-1] [0] [1] [2] [3] [4]*  EXEMPLE TOTAL=7 PIECES
        sprite = game.add.sprite(this.group.width/(STATIC.TOTAL_PIECES + 2)*(i-(Math.floor(STATIC.TOTAL_PIECES/2))), 0, 'domino', piece[2]);//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< pocição e melhorar atributos da peça
        sprite.anchor.set(0.5);

        //Set input listener
        sprite.piece = piece;
        sprite.inputEnabled = true;
        var edges = this.edges;
        sprite.events.onInputDown.add(
        function(obj){
            if(hand.turn == Link.getPlayer().turn){
                edges.selectedPiece = obj;
                edges.showBlanks();
            }
        });

        //Add to hand
        this.group.addChild(sprite);
    }
    //game.add.button(game.world.width - 100, game.world.height - 50, 'pass', skipMove, this, 0, 1, 2);//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< pocição
  }
};
