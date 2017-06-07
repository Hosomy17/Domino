var Edges = function(){
  this.edges = {
    center : {
      blank  : {normal : null, side : null},
      open   : null,
      points : 0,
      total  : 0,
      block  : false
    },
    up : {
      blank  : {normal : null, side : null},
      open   : null,
      points : 0,
      total  : 0
    },
    down : {
      blank  : {normal : null, side : null},
      open   : null,
      points : 0,
      total  : 0
    },
    right : {
      blank  : {normal : null, side : null},
      open   : null,
      points : 0,
      total  : 0
    },
    left : {
      blank  : {normal : null, side : null},
      open   : null,
      points : 0,
      total  : 0
    }
  };
  this.formulaPositions = {
    up    : null,
    down : null,
    right  : null,
    left  : null
  };
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
  }
}
