var Edges = function(){
  this.center = {
    blank  : {normal : null, side : null},
    open   : null, points : 0, total : 0, block : false, idDir : 0
  };
  this.up = {
    blank : {normal : null, side : null},
    open  : null, points : 0, total : 0, idDir : 0
  };
  this.down = {
    blank : {normal : null, side : null},
    open  : null, points : 0, total : 0, idDir : 0
  };
  this.right = {
    blank : {normal : null, side : null},
    open  : null, points : 0, total : 0, idDir : 0
  };
  this.left = {
    blank : {normal : null, side : null},
    open  : null, points : 0, total : 0, idDir : 0
  };
  // this.newPosForm = {
  //   up : null, down : null, right : null, left : null
  // };
  this.selected = null;
  this.noPiece = true;
}

Edges.prototype = {
  create : function(){
    this.center.nextPos = [];
    this.center.nextPos[0] = {f:function(blank, orietantion){},d:"center"};
    var newPosForm = {up : null, down : null, right : null, left : null};
    newPosForm.up = function(blank, orietantion){
      if(orietantion == 'normal'){
        blank.side.y = blank.normal.y - (STATIC.WIDTH_PIECE+ STATIC.HEIGHT_PIECE)/2;
        blank.normal.y -= STATIC.HEIGHT_PIECE;
      }
      else {
        blank.normal.y = blank.side.y - (STATIC.WIDTH_PIECE + STATIC.HEIGHT_PIECE)/2;
        blank.side.y -= STATIC.WIDTH_PIECE;
      }
    }
    newPosForm.down = function(blank, orietantion) {
      if(orietantion == 'normal'){
        blank.side.y = blank.normal.y + (STATIC.WIDTH_PIECE+ STATIC.HEIGHT_PIECE)/2;
        blank.normal.y += STATIC.HEIGHT_PIECE;
      }
      else {
        blank.normal.y = blank.side.y + (STATIC.WIDTH_PIECE+ STATIC.HEIGHT_PIECE)/2;
        blank.side.y += STATIC.WIDTH_PIECE;
      }
    }
    newPosForm.right = function(blank, orietantion) {
      if(orietantion == 'normal'){
        blank.side.x = blank.normal.x + (STATIC.WIDTH_PIECE + STATIC.HEIGHT_PIECE)/2;
        blank.normal.x += STATIC.HEIGHT_PIECE;
      }
      else {
        blank.normal.x = blank.side.x + (STATIC.WIDTH_PIECE+ STATIC.HEIGHT_PIECE)/2;
        blank.side.x += STATIC.WIDTH_PIECE;
      }
    }
    newPosForm.left = function(blank, orietantion) {
      if(orietantion == 'normal'){
        blank.side.x = blank.normal.x - (STATIC.WIDTH_PIECE + STATIC.HEIGHT_PIECE)/2;
        blank.normal.x -= STATIC.HEIGHT_PIECE;
      }
      else {
        blank.normal.x = blank.side.x - (STATIC.WIDTH_PIECE+ STATIC.HEIGHT_PIECE)/2;
        blank.side.x -= STATIC.WIDTH_PIECE;
      }
    }

    //Directions for each edge
    this.up.nextPos = [];
    this.up.nextPos[0]    = {f:newPosForm.up,d:"up"};
    this.up.nextPos[1]    = {f:newPosForm.right,d:"right"};
    this.up.nextPos[2]    = {f:newPosForm.down,d:"down"};
    this.up.nextPos[3]    = {f:newPosForm.left,d:"left"};
    this.up.nextPos[4]    = {f:newPosForm.up,d:"up"};

    this.down.nextPos = [];
    this.down.nextPos[0]  = {f:newPosForm.down,d:"down"};
    this.down.nextPos[1]  = {f:newPosForm.left,d:"left"};
    this.down.nextPos[2]  = {f:newPosForm.up,d:"up"};
    this.down.nextPos[3]  = {f:newPosForm.right,d:"right"};
    this.down.nextPos[4]  = {f:newPosForm.down,d:"down"};

    this.right.nextPos = [];
    this.right.nextPos[0] = {f:newPosForm.right,d:"right"};
    this.right.nextPos[1] = {f:newPosForm.down,d:"dowm"};
    this.right.nextPos[2] = {f:newPosForm.left,d:"left"};
    this.right.nextPos[3] = {f:newPosForm.up,d:"up"};
    this.right.nextPos[4] = {f:newPosForm.right,d:"right"};

    this.left.nextPos = [];
    this.left.nextPos[0]  = {f:newPosForm.left,d:"left"};
    this.left.nextPos[1]  = {f:newPosForm.up,d:"up"};
    this.left.nextPos[2]  = {f:newPosForm.right,d:"right"};
    this.left.nextPos[3]  = {f:newPosForm.down,d:"down"};
    this.left.nextPos[4]  = {f:newPosForm.left,d:"left"};
  },
  showBlanks : function(){
    this.hideBlanks();
    if(this.noPiece){
      if(Link.match.sena)
        this.center.blank.normal.visible = (this.selected.piece[0] + this.selected.piece[1] == 12) ? true : false;
      else
        this.center.blank.normal.visible = (this.selected.piece[0] == this.selected.piece[1]) ? true : false;
    }
    else if (this.selected.piece[0] == this.selected.piece[1]){
      if(this.left.total > 0 && this.right.total > 0){
        this.up.blank.side.visible    = (this.selected.piece[0] == this.up.open) ? true : false;
        this.down.blank.side.visible  = (this.selected.piece[0] == this.down.open) ? true : false;
      }
      this.left.blank.side.visible  = (this.selected.piece[0] == this.left.open) ? true : false;
      this.right.blank.side.visible = (this.selected.piece[0] == this.right.open) ? true : false;
    }
    else{
      if(this.left.total > 0 && this.right.total > 0){
        this.up.blank.normal.visible   = (this.selected.piece[0] == this.up.open || this.selected.piece[1] == this.up.open) ? true : false;
        this.down.blank.normal.visible = (this.selected.piece[0] == this.down.open || this.selected.piece[1] == this.down.open) ? true : false;
      }
      this.left.blank.normal.visible  = (this.selected.piece[0] == this.left.open || this.selected.piece[1] == this.left.open) ? true : false;
      this.right.blank.normal.visible = (this.selected.piece[0] == this.right.open || this.selected.piece[1] == this.right.open) ? true : false;
    }
  },

  hideBlanks : function(){
    this.center.blank.normal.visible = false;
    this.up.blank.side.visible       = false;
    this.down.blank.side.visible     = false;
    this.left.blank.side.visible     = false;
    this.right.blank.side.visible    = false;
    this.up.blank.normal.visible     = false;
    this.down.blank.normal.visible   = false;
    this.left.blank.normal.visible   = false;
    this.right.blank.normal.visible  = false;
  }
}
