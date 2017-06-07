var Edges = function(){
  return {
    center : {
      blank : {
        normal : null,
        side   : null
      },
      open    : null,
      points  : 0,
      total   : 0,
      block   : false,
      nextPosition : function(blank, orietantion){}
    },
    up : {
      blank : {
        normal : null,
        side   : null
      },
      open     : null,
      points  : 0,
      total    : 0,
      nextPosition : function(blank, orietantion){
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
        side   : null
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
        side   : null
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
        side   : null
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
  }
}
