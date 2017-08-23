var Core = function(ha, hu, e, p, s, t){
  this.hand        = ha;
  this.hud         = hu;
  this.cntSkip     = 0;
  this.noPiece   = true;//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>SOCORRO DUPLICADO
  this.maxPieceRow = 0;//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>maior numero de peças em uma fila
  this.scaleTable  = 1;
  this.players     = p;
  this.edges       = e;
  this.score       = s;
  this.table       = t
  this.timer = null;
}

Core.prototype = {
  skipMove: function(){
    var skip=true;
    if(this.hand.turn != Link.player.turn)
      skip = false;
    else
      this.timer = Game.time.events.add(Phaser.Timer.SECOND * 60, this.autoPlay, this);

    var pcs = this.hand.pieces;
    var eds = [];
    eds[0] = {n:this.edges.up.open   ,d:"up"};
    eds[1] = {n:this.edges.down.open ,d:"down"};
    eds[2] = {n:this.edges.right.open,d:"right"};
    eds[3] = {n:this.edges.left.open ,d:"left"};
    for (var i=0;i < pcs.length;i++) {
      var piece = pcs[i].piece;
      for (var j=0;j < eds.length;j++) {
        //If there is piece to place
        if((piece[0] == eds[j].n || piece[1] == eds[j].n)){
          this.hand.autoPiece = {p:pcs[i],d:eds[j].d};
          skip=false;
        }
      }
      //If there is carroça to place in center
      if(this.noPiece){
        //If have to be a sena
        if(Link.match.sena){
          if(piece[2] == 27){
            this.hand.autoPiece = {p:pcs[i],d:"center"};
            skip=false;
          }
        }
        else if(piece[0] == piece[1]){
          this.hand.autoPiece = {p:pcs[i],d:"center"};
          skip=false;
        }
      }
    }

    if(skip){
      Game.time.events.removeAll();
      this.hand.selected = null;
      this.finishSelect(null);
    }
    return skip;
  },

  doMove: function(d){
    if(d.move.piece == null){
      if(this.cntSkip == 0){
        this.gainPoints(STATIC.POINT_SKIP, (d.player.team == 0) ? 1 : 0);
      }
      this.cntSkip++;
      if(this.cntSkip == 4){
        if(d.sum[0] < d.sum[1])
          this.gainPoints(Math.floor(d.sum[1]/5) * 5,0);
        else if(d.sum[1] < d.sum[0])
          this.gainPoints(Math.floor(d.sum[0]/5) * 5,1);

        Link.match.score = [this.score[0].total, this.score[1].total];
        Link.match.turn = d.player.turn;
        Link.match.sena = true;
        this.endRound();
      }
      else{
        this.nextTurn();
        this.skipMove();
      }
      return 0;
    }
    else{
      if(this.cntSkip == 3)
        this.gainPoints(STATIC.POINT_GALO,d.player.team);
      this.cntSkip = 0;
    }

    this.drawMove(d);
    this.players[d.player.turn].ctn--;
    var points = this.calculatePoints();
    if(points % 5 == 0)
      this.gainPoints(points,d.player.team);

    if(Link.player.turn != d.player.turn)
      this.players[d.player.turn].totalPieces.text = this.players[d.player.turn].ctn;

    if(this.edges.noPiece){
      this.noPiece = false;
      this.edges.noPiece = false;
      this.edges.up.open     = d.move.piece[0];
      this.edges.down.open   = d.move.piece[0];
      this.edges.left.open   = d.move.piece[0];
      this.edges.right.open  = d.move.piece[0];
      this.edges.center.open = d.move.piece[0];
    }

    var edge = this.edges[d.move.direction];
    //Zoom out
    if(this.maxPieceRow < edge.total){
      this.maxPieceRow = edge.total;
      var tableScale = this.scaleTable;
      if(this.scaleTable > 0.6)
        this.scaleTable -= 0.3/this.maxPieceRow;
      Game.add.tween(this.table.scale).to( { x: this.scaleTable, y: this.scaleTable,}, 500, Phaser.Easing.Linear.None, true);
    }

    if(this.players[d.player.turn].ctn == 0){

      if(d.move.piece[0] == d.move.piece[1])
        this.gainPoints(STATIC.POINT_CARROCA,d.player.team);

      this.gainPoints(Math.floor(d.sum[d.player.team]/5) * 5,d.player.team);
      var score = [this.score[0].total, this.score[1].total];

      Link.match.score = score;
      Link.match.turn = d.player.turn;
      Link.match.sena = false;
      this.endRound();
    }
    else{
      this.nextTurn();
      this.skipMove();
    }
  },

  nextTurn: function(){
    if(++this.hand.turn >= STATIC.TOTAL_PLAYERS)
      this.hand.turn = 0;

    for (var i = 0; i < this.players.length; i++) {
      this.players[i].turn.visible = false;
    }
    this.players[this.hand.turn].turn.visible = true;
  },

  drawMove: function(d){
    var ori = (d.move.piece[0] == d.move.piece[1] ) ? 'side' : 'normal';
    var edge = this.edges[d.move.direction];

    var sprite = Game.add.sprite(edge.blank[ori].x,edge.blank[ori].y,'domino',d.move.piece[2]);
    sprite.angle = edge.blank[ori].angle;
    sprite.anchor.set(0.5);
    this.table.addChild(sprite);

    edge.total++;
    if(edge.open == d.move.piece[0]){
      sprite.angle += 180;
      edge.open = d.move.piece[1];
      edge.points = d.move.piece[1];
    }
    else{
      edge.open = d.move.piece[0];
      edge.points = d.move.piece[0];
    }

    edge.points *= (d.move.piece[0]==d.move.piece[1]) ? 2 : 1;

    if(edge.total == 7 && (d.move.direction == 'right' || d.move.direction == 'left')){
      edge.blank.normal.angle += 90;
      edge.blank.side.angle += 90;
      switch (d.move.direction) {
        case 'right':
          edge.nextPos    = this.edges.newPosForm.down;
          edge.blank.normal.x += STATIC.WIDTH_PIECE/2;
          edge.blank.normal.y -= STATIC.WIDTH_PIECE/2;
          edge.blank.side.x   += STATIC.WIDTH_PIECE;
          edge.blank.side.y   -= STATIC.WIDTH_PIECE/2;
        break;
        case 'left':
          edge.nextPos    = this.edges.newPosForm.up;
          edge.blank.normal.x -= STATIC.WIDTH_PIECE/2;
          edge.blank.normal.y += STATIC.WIDTH_PIECE/2;
          edge.blank.side.x   -= STATIC.WIDTH_PIECE;
          edge.blank.side.y   += STATIC.WIDTH_PIECE/2;
        break;
      }
    }
    else if (edge.total == 7 &&  (d.move.direction == 'up' || d.move.direction == 'down')) {
      edge.blank.normal.angle += 90;
      edge.blank.side.angle   += 90;
      switch (d.move.direction) {
        case 'up':
          edge.nextPos    = this.edges.newPosForm.right;
          edge.blank.normal.x -= STATIC.WIDTH_PIECE/2;
          edge.blank.normal.y -= STATIC.WIDTH_PIECE/2;
          edge.blank.side.x   -= STATIC.WIDTH_PIECE/2;
          edge.blank.side.y   -= STATIC.WIDTH_PIECE;
        break;
        case 'down':
          edge.nextPos    = this.edges.newPosForm.left;
          edge.blank.normal.x += STATIC.WIDTH_PIECE/2;
          edge.blank.normal.y += STATIC.WIDTH_PIECE/2;
          edge.blank.side.x   += STATIC.WIDTH_PIECE/2;
          edge.blank.side.y   += STATIC.WIDTH_PIECE;
        break;
      }
    }

    //Move blank to the next edge
    edge.nextPos(edge.blank, ori);
  },

  calculatePoints: function(){
    this.edges.center.points *= (this.edges.left.total > 0 && this.edges.right.total > 0) ? 0 : 1;

    var points = this.edges.center.points + this.edges.up.points + this.edges.right.points + this.edges.down.points + this.edges.left.points;
    return points;
  },

  gainPoints: function(pts, team){
    this.score[team].total += pts;
    this.score[team].text.text = this.score[team].total;
  },

  finishSelect : function(direction){
    Game.time.events.removeAll();
    this.edges.hideBlanks();

    var piece = this.edges.selected;
    if(piece){
      piece.visible = false;
      piece = piece.piece;
      for(i = 0; i < this.hand.pieces.length; i++){
        if(this.hand.pieces[i].piece[2] == piece[2])
          this.hand.pieces.splice(i,1);
      }
    }
    var move = {piece:piece, direction:direction};
    Link.sendMove(move);
    this.edges.selected = null;
  },

  autoPlay: function(){
    this.edges.selected = this.hand.autoPiece.p;
    this.finishSelect(this.hand.autoPiece.d);
  },

  endRound: function(){
    if(this.score[0].total >= STATIC.POINT_GOAL && this.score[0].total > this.score[1].total)
      this.hud.showScore();
    else if(this.score[1].total >= STATIC.POINT_GOAL && this.score[1].total > this.score[0].total)
      this.hud.showScore();
    else
      Game.state.start("GameoverState");
  }
}
