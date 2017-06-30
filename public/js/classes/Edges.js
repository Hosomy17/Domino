var Edges = function(){
  this.edges = {
    center : {
      blank  : {normal : null, side : null},
      open   : null, points : 0, total : 0, block : false
    },
    up : {
      blank : {normal : null, side : null},
      open  : null, points : 0, total : 0
    },
    down : {
      blank : {normal : null, side : null},
      open  : null, points : 0, total : 0
    },
    right : {
      blank : {normal : null, side : null},
      open  : null, points : 0, total : 0
    },
    left : {
      blank : {normal : null, side : null},
      open  : null, points : 0, total : 0
    }
  };
  this.formulaPositions = {
    up : null, down : null, right : null, left : null
  };
  this.selectedPiece = null;
  this.flagStart = true;
}

Edges.prototype = {
  create : function(){
    this.edges.center.nextPosition = function(blank, orietantion){};
    this.edges.up.nextPosition = function(blank, orietantion){
      if(orietantion == 'normal'){
        blank.side.y = blank.normal.y - (STATIC.WIDTH_PIECE+ STATIC.HEIGHT_PIECE)/2;
        blank.normal.y -= STATIC.HEIGHT_PIECE;
      }
      else {
        blank.normal.y = blank.side.y - (STATIC.WIDTH_PIECE + STATIC.HEIGHT_PIECE)/2;
        blank.side.y -= STATIC.WIDTH_PIECE;
      }
    }
    this.edges.down.nextPosition = function(blank, orietantion) {
      if(orietantion == 'normal'){
        blank.side.y = blank.normal.y + (STATIC.WIDTH_PIECE+ STATIC.HEIGHT_PIECE)/2;
        blank.normal.y += STATIC.HEIGHT_PIECE;
      }
      else {
        blank.normal.y = blank.side.y + (STATIC.WIDTH_PIECE+ STATIC.HEIGHT_PIECE)/2;
        blank.side.y += STATIC.WIDTH_PIECE;
      }
    }
    this.edges.right.nextPosition = function(blank, orietantion) {
      if(orietantion == 'normal'){
        blank.side.x = blank.normal.x + (STATIC.WIDTH_PIECE + STATIC.HEIGHT_PIECE)/2;
        blank.normal.x += STATIC.HEIGHT_PIECE;
      }
      else {
        blank.normal.x = blank.side.x + (STATIC.WIDTH_PIECE+ STATIC.HEIGHT_PIECE)/2;
        blank.side.x += STATIC.WIDTH_PIECE;
      }
    }
    this.edges.left.nextPosition = function(blank, orietantion) {
      if(orietantion == 'normal'){
        blank.side.x = blank.normal.x - (STATIC.WIDTH_PIECE + STATIC.HEIGHT_PIECE)/2;
        blank.normal.x -= STATIC.HEIGHT_PIECE;
      }
      else {
        blank.normal.x = blank.side.x - (STATIC.WIDTH_PIECE+ STATIC.HEIGHT_PIECE)/2;
        blank.side.x -= STATIC.WIDTH_PIECE;
      }
    }

    this.formulaPositions.up    = this.edges.up.nextPosition;
    this.formulaPositions.down  = this.edges.down.nextPosition;
    this.formulaPositions.right = this.edges.right.nextPosition;
    this.formulaPositions.left  = this.edges.left.nextPosition;
  },

  showBlanks : function(){
    this.edges.center.blank.visible       = false;
    this.edges.up.blank.side.visible      = false;
    this.edges.down.blank.side.visible    = false;
    this.edges.left.blank.side.visible    = false;
    this.edges.right.blank.side.visible   = false;
    this.edges.up.blank.normal.visible    = false;
    this.edges.down.blank.normal.visible  = false;
    this.edges.left.blank.normal.visible  = false;
    this.edges.right.blank.normal.visible = false;
    if(this.flagStart){
      if(Link.getDoublesSix())
        this.edges.center.blank.normal.visible = (this.selectedPiece.piece[0] + this.selectedPiece.piece[1] == 12) ? true : false;
      else
        this.edges.center.blank.normal.visible = (this.selectedPiece.piece[0] == this.selectedPiece.piece[1]) ? true : false;
    }
    else if (this.selectedPiece.piece[0] == this.selectedPiece.piece[1]){
      if(this.edges.left.total > 0 && this.edges.right.total > 0){
        this.edges.up.blank.side.visible    = (this.selectedPiece.piece[0] == this.edges.up.open) ? true : false;
        this.edges.down.blank.side.visible  = (this.selectedPiece.piece[0] == this.edges.down.open) ? true : false;
      }
      this.edges.left.blank.side.visible  = (this.selectedPiece.piece[0] == this.edges.left.open) ? true : false;
      this.edges.right.blank.side.visible = (this.selectedPiece.piece[0] == this.edges.right.open) ? true : false;
    }
    else{
      if(this.edges.left.total > 0 && this.edges.right.total > 0){
        this.edges.up.blank.normal.visible   = (this.selectedPiece.piece[0] == this.edges.up.open || this.selectedPiece.piece[1] == this.edges.up.open) ? true : false;
        this.edges.down.blank.normal.visible = (this.selectedPiece.piece[0] == this.edges.down.open || this.selectedPiece.piece[1] == this.edges.down.open) ? true : false;
      }
      this.edges.left.blank.normal.visible  = (this.selectedPiece.piece[0] == this.edges.left.open || this.selectedPiece.piece[1] == this.edges.left.open) ? true : false;
      this.edges.right.blank.normal.visible = (this.selectedPiece.piece[0] == this.edges.right.open || this.selectedPiece.piece[1] == this.edges.right.open) ? true : false;
    }
  },

  finishSelect : function(piece, direction){
    this.edges.center.blank.normal.visible = false;
    this.edges.up.blank.side.visible       = false;
    this.edges.down.blank.side.visible     = false;
    this.edges.left.blank.side.visible     = false;
    this.edges.right.blank.side.visible    = false;
    this.edges.up.blank.normal.visible     = false;
    this.edges.down.blank.normal.visible   = false;
    this.edges.left.blank.normal.visible   = false;
    this.edges.right.blank.normal.visible  = false;

    move = {piece:piece, direction:direction};
    Link.sendMove(move);

    if(piece)
      for(i = 0; i < Link.getPlayer().pieces.length; i++){
        if(Link.getPlayer().pieces[i][2] == piece[2])
          Link.getPlayer().pieces.splice(i,1);
      }
  }
}
