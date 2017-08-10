var Core = function(ha, hu, e, p, s, t){
  this.hand        = ha;
  this.hud         = hu;
  this.countSkip   = 0;
  this.flagStart   = true;//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>SOCORRO DUPLICADO
  this.maxPieceRow = 0;//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>maior numero de peças em uma fila
  this.scaleTable  = 1;
  this.players     = p;
  this.edges       = e;
  this.score       = s;
  this.table       = t;
}

Core.prototype = {
  skipMove: function(){
    var skip=true;
    if(this.hand.turn != Link.player.turn)
      skip = false;
    else
      Game.time.events.add(Phaser.Timer.SECOND * 1, this.autoPlay, this);

    var pcs = this.hand.pieces;
    var eds = [];
    eds[0] = {n:this.edges.up.open   ,d:"up"};
    eds[1] = {n:this.edges.down.open ,d:"down"};
    eds[2] = {n:this.edges.right.open,d:"right"};
    eds[3] = {n:this.edges.left.open ,d:"left"};
    for (var i=0;i < pcs.length;i++) {
      for (var j=0;j < eds.length;j++) {
        if((pcs[i].piece[0] == eds[j].n || pcs[i].piece[1] == eds[j].n)){
          this.hand.reservedPiece = {p:pcs[i],d:eds[j].d};//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<muito complexo
          skip=false;
        }
      }
    }
    if(this.flagStart){
      if(Link.match.sena){//<<<<<<<<<<<<<<<<<<<<<<<juntar isso com o de cima
        for(var i=0; i < pcs.length; i++){
          if(pcs[i].piece[0] + pcs[i].piece[1] == 12){
            this.hand.reservedPiece = {p:pcs[i],d:"center"};
            skip=false;
          }
        }
      }
      else {
        for(var i=0; i < pcs.length; i++){//<<<<<<<<<<<<<<<<<<<<<<<juntar isso com o de cima
          if(pcs[i].piece[0] == pcs[i].piece[1]){
            this.hand.reservedPiece = {p:pcs[i],d:"center"};
            skip=false;
          }
        }
      }
    }
    if(skip){
      Game.time.events.removeAll();
      this.hand.selectedPiece = null;
      this.finishSelect(null);
    }
    return skip;
  },

  doMove: function(d){
    if(d.move.piece == null){
      if(this.countSkip == 0){
        if(d.player.team == 0)
          this.gainPoints(20,1);
        else
          this.gainPoints(20,0);
      }
      this.countSkip++;
      if(this.countSkip == 4){

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
      if(this.countSkip == 3)
        this.gainPoints(50,d.player.team);
      this.countSkip = 0;
    }

    this.drawMove(d);
    this.players[d.player.turn].ctn--;
    var points = this.calculatePoints();
    if(points % 5 == 0)
      this.gainPoints(points,d.player.team);

    if(Link.player.turn != d.player.turn)
      this.players[d.player.turn].totalPieces.text = this.players[d.player.turn].ctn;

    if(this.edges.flagStart){
      this.flagStart = false;
      this.edges.flagStart = false;
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
        //this.table.scale.set(tableScale.x - 0.1);
        this.scaleTable -= 0.1;
      Game.add.tween(this.table.scale).to( { x: this.scaleTable, y: this.scaleTable,}, 500, Phaser.Easing.Linear.None, true);
    }

    if(this.players[d.player.turn].ctn == 0){

      if(d.move.piece[0] == d.move.piece[1])
        this.gainPoints(20,d.player.team);

      var score = [this.score[0].total, this.score[1].total];
      this.gainPoints(Math.floor(d.sum[d.player.team]/5) * 5,d.player.team);

      Link.match.score = score;//<<<<<<<<<<<<<<<<<<<<<<<<<<<verificar
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
    var orientation = (d.move.piece[0] == d.move.piece[1] ) ? 'side' : 'normal';
    var edge = this.edges[d.move.direction];

    var sprite = Game.add.sprite(edge.blank[orientation].x,edge.blank[orientation].y,'domino',d.move.piece[2]);//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<melhorar atributos
    sprite.angle = edge.blank[orientation].angle;
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
          edge.nextPosition    = this.edges.formulaPositions.down;
          edge.blank.normal.y -= STATIC.WIDTH_PIECE/2;
          edge.blank.side.y   -= STATIC.WIDTH_PIECE/2;
          edge.blank.normal.x += STATIC.WIDTH_PIECE/2;
          edge.blank.side.x   += STATIC.WIDTH_PIECE;
        break;
        case 'left':
          edge.nextPosition    = this.edges.formulaPositions.up;
          edge.blank.normal.y += STATIC.WIDTH_PIECE/2;
          edge.blank.side.y   += STATIC.WIDTH_PIECE/2;
          edge.blank.normal.x -= STATIC.WIDTH_PIECE/2;
          edge.blank.side.x   -= STATIC.WIDTH_PIECE;
        break;
      }
    }
    else if (edge.total == 5 &&  (d.move.direction == 'up' || d.move.direction == 'down')) {
      edge.blank.normal.angle += 90;
      edge.blank.side.angle   += 90;
      switch (d.move.direction) {
        case 'up':
          edge.nextPosition    = this.edges.formulaPositions.right;
          edge.blank.normal.x -= STATIC.WIDTH_PIECE/2;
          edge.blank.side.x   -= STATIC.WIDTH_PIECE/2;
          edge.blank.normal.y -= STATIC.WIDTH_PIECE/2;
          edge.blank.side.y   -= STATIC.WIDTH_PIECE;
        break;
        case 'down':
          edge.nextPosition    = this.edges.formulaPositions.left;
          edge.blank.normal.x += STATIC.WIDTH_PIECE/2;
          edge.blank.side.x   += STATIC.WIDTH_PIECE/2;
          edge.blank.normal.y += STATIC.WIDTH_PIECE/2;
          edge.blank.side.y   += STATIC.WIDTH_PIECE;
        break;
      }
    }

    //Move blank to the next edge
    edge.nextPosition(edge.blank, orientation);
  },

  calculatePoints: function(){
    this.edges.center.points *= (this.edges.left.total > 0 && this.edges.right.total > 0) ? 0 : 1;

    var points = this.edges.center.points + this.edges.up.points + this.edges.right.points + this.edges.down.points + this.edges.left.points;
    return points;
  },

  gainPoints: function(pts, team){//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Deveria estar no HUD o colocar pontos
    this.score[team].total += pts;
    this.score[team].text.text = this.score[team].total;
  },

  finishSelect : function(direction){
    this.edges.hideBlanks();

    var piece = this.edges.selectedPiece;
    if(piece){
      piece.visible = false;
      piece = piece.piece;
      for(i = 0; i < this.hand.pieces.length; i++){ //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<alterar isso para hand
        if(this.hand.pieces[i].piece[2] == piece[2])
          this.hand.pieces.splice(i,1);
      }
    }
    var move = {piece:piece, direction:direction};
    Link.sendMove(move);
    this.edges.selectedPiece = null;//<<<<<<<<<<<<<<<<<<<<<<<<<<<<ainda em edge?
  },

  autoPlay: function(){
    this.edges.selectedPiece = this.hand.reservedPiece.p;
    this.finishSelect(this.hand.reservedPiece.d);
  },

  endRound: function(){
    if((this.score[0].total >= 200 || this.score[1].total >= 200) && (this.score[0].total != this.score[1].total))//<<<<<<<<<<<<<<<<<<<<<<pontuação n static
      this.hud.showScore();
    else
      Game.state.start("GameoverState");
  }
}
