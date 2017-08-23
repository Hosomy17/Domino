var Edges = function(){
  this.center = {
    blank  : {normal : null, side : null},
    open   : null, points : 0, total : 0, block : false
  };
  this.up = {
    blank : {normal : null, side : null},
    open  : null, points : 0, total : 0
  };
  this.down = {
    blank : {normal : null, side : null},
    open  : null, points : 0, total : 0
  };
  this.right = {
    blank : {normal : null, side : null},
    open  : null, points : 0, total : 0
  };
  this.left = {
    blank : {normal : null, side : null},
    open  : null, points : 0, total : 0
  };
  this.newPosForm = {
    up : null, down : null, right : null, left : null
  };
  this.selected = null;
  this.noPiece = true;
}

Edges.prototype = {
  create : function(){
    this.center.nextPos = function(blank, orietantion){};
    this.newPosForm.up = function(blank, orietantion){
      if(orietantion == 'normal'){
        blank.side.y = blank.normal.y - (STATIC.WIDTH_PIECE+ STATIC.HEIGHT_PIECE)/2;
        blank.normal.y -= STATIC.HEIGHT_PIECE;
      }
      else {
        blank.normal.y = blank.side.y - (STATIC.WIDTH_PIECE + STATIC.HEIGHT_PIECE)/2;
        blank.side.y -= STATIC.WIDTH_PIECE;
      }
    }
    this.newPosForm.down = function(blank, orietantion) {
      if(orietantion == 'normal'){
        blank.side.y = blank.normal.y + (STATIC.WIDTH_PIECE+ STATIC.HEIGHT_PIECE)/2;
        blank.normal.y += STATIC.HEIGHT_PIECE;
      }
      else {
        blank.normal.y = blank.side.y + (STATIC.WIDTH_PIECE+ STATIC.HEIGHT_PIECE)/2;
        blank.side.y += STATIC.WIDTH_PIECE;
      }
    }
    this.newPosForm.right = function(blank, orietantion) {
      if(orietantion == 'normal'){
        blank.side.x = blank.normal.x + (STATIC.WIDTH_PIECE + STATIC.HEIGHT_PIECE)/2;
        blank.normal.x += STATIC.HEIGHT_PIECE;
      }
      else {
        blank.normal.x = blank.side.x + (STATIC.WIDTH_PIECE+ STATIC.HEIGHT_PIECE)/2;
        blank.side.x += STATIC.WIDTH_PIECE;
      }
    }
    this.newPosForm.left = function(blank, orietantion) {
      if(orietantion == 'normal'){
        blank.side.x = blank.normal.x - (STATIC.WIDTH_PIECE + STATIC.HEIGHT_PIECE)/2;
        blank.normal.x -= STATIC.HEIGHT_PIECE;
      }
      else {
        blank.normal.x = blank.side.x - (STATIC.WIDTH_PIECE+ STATIC.HEIGHT_PIECE)/2;
        blank.side.x -= STATIC.WIDTH_PIECE;
      }
    }

    this.up.nextPos    = this.newPosForm.up;
    this.down.nextPos  = this.newPosForm.down;
    this.right.nextPos = this.newPosForm.right;
    this.left.nextPos  = this.newPosForm.left;
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
