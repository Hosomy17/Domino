var Core = function(ha, hu, e, p, s, t){
  this.hand        = ha;
  this.hud         = hu;
  this.countPass   = 0;
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
    var ok=true;
    if(this.hand.turn != Link.player.turn){
      ok = false;
    }
    else {
      Game.time.events.add(Phaser.Timer.SECOND * 15, this.autoPlay, this);
    }

    var pieces = this.hand.pieces;
    var nums = [];
    nums[0] = {n:this.edges.edges.up.open,d:"up"};
    nums[1] = {n:this.edges.edges.down.open,d:"down"};
    nums[2] = {n:this.edges.edges.right.open,d:"right"};
    nums[3] = {n:this.edges.edges.left.open,d:"left"};
    for (var i=0;i < pieces.length;i++) {
      for (var j=0;j < nums.length;j++) {
        if((pieces[i].piece[0] == nums[j].n || pieces[i].piece[1] == nums[j].n)){
          this.hand.reservedPiece = {p:pieces[i],d:nums[j].d};//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<muito complexo
          ok=false;
        }
      }
    }

    if(this.flagStart){
      if(Link.match.doublesSix){//<<<<<<<<<<<<<<<<<<<<<<<juntar isso com o de cima
        for(var i=0; i < pieces.length; i++){
          if(pieces[i].piece[0] + pieces[i].piece[1] == 12){
            this.hand.reservedPiece = {p:pieces[i],d:"center"};
            ok=false;
          }
        }
      }
      else {
        for(var i=0; i < pieces.length; i++){//<<<<<<<<<<<<<<<<<<<<<<<juntar isso com o de cima
          if(pieces[i].piece[0] == pieces[i].piece[1]){
            this.hand.reservedPiece = {p:pieces[i],d:"center"};
            ok=false;
          }
        }
      }
    }
    if(ok){
      Game.time.events.removeAll();
      this.hand.selectedPiece = null;
      this.finishSelect(null);
    }
    return ok;
  },

  doMove: function(data){
    if(data.move.piece == null){
      if(this.countPass == 0){
        if(data.player.team == 0)
          this.gainPoints(20,1);
        else
          this.gainPoints(20,0);
      }
      this.countPass++
      if(this.countPass == 4){

        if(data.sum[0] < data.sum[1])
          this.gainPoints(Math.floor(data.sum[1]/5) * 5,0);
        else if(data.sum[1] < data.sum[0])
          this.gainPoints(Math.floor(data.sum[0]/5) * 5,1);

        Link.match.score = [this.score[0].total, this.score[1].total];
        Link.match.turn = data.player.turn;
        Link.match.doublesSix = true;
        this.finalRound();
      }
      else{
        this.nextTurn();
        this.skipMove();
      }
      return 0;
    }
    else{
      if(this.countPass == 3)
        this.gainPoints(50,data.player.team);
      this.countPass = 0;
    }

    this.drawMove(data);
    this.players[data.player.turn].ctn--;
    var points = this.calculatePoints();
    if(points % 5 == 0)
      this.gainPoints(points,data.player.team);

    if(Link.player.turn != data.player.turn)
      this.players[data.player.turn].totalPieces.text = this.players[data.player.turn].ctn;

    if(this.edges.flagStart){
      this.flagStart = false;
      this.edges.flagStart = false;
      this.edges.edges.up.open     = data.move.piece[0];
      this.edges.edges.down.open   = data.move.piece[0];
      this.edges.edges.left.open   = data.move.piece[0];
      this.edges.edges.right.open  = data.move.piece[0];
      this.edges.edges.center.open = data.move.piece[0];
    }

    var edge = this.edges.edges[data.move.direction];
    //Zoom out
    if(this.maxPieceRow < edge.total){
      this.maxPieceRow = edge.total;
      var tableScale = this.scaleTable;
      if(this.scaleTable > 0.6)
        //this.table.scale.set(tableScale.x - 0.1);
        this.scaleTable -= 0.1;
      Game.add.tween(this.table.scale).to( { x: this.scaleTable, y: this.scaleTable,}, 500, Phaser.Easing.Linear.None, true);
    }

    if(this.players[data.player.turn].ctn == 0){

      if(data.move.piece[0] == data.move.piece[1])
        this.gainPoints(20,data.player.team);

      var score = [this.score[0].total, this.score[1].total];
      this.gainPoints(Math.floor(data.sum[data.player.team]/5) * 5,data.player.team);

      Link.match.score = score;//<<<<<<<<<<<<<<<<<<<<<<<<<<<verificar
      Link.match.turn = data.player.turn;
      Link.match.doublesSix = false;
      this.finalRound();
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

  drawMove: function(data){
    var orientation = (data.move.piece[0] == data.move.piece[1] ) ? 'side' : 'normal';
    var edge = this.edges.edges[data.move.direction];

    var sprite = Game.add.sprite(edge.blank[orientation].x,edge.blank[orientation].y,'domino',data.move.piece[2]);//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<melhorar atributos
    sprite.angle = edge.blank[orientation].angle;
    sprite.anchor.set(0.5);
    this.table.addChild(sprite);

    edge.total++;
    if(edge.open == data.move.piece[0]){
      sprite.angle += 180;
      edge.open = data.move.piece[1];
      edge.points = data.move.piece[1];
    }
    else{
      edge.open = data.move.piece[0];
      edge.points = data.move.piece[0];
    }

    edge.points *= (data.move.piece[0]==data.move.piece[1]) ? 2 : 1;

    if(edge.total == 7 && (data.move.direction == 'right' || data.move.direction == 'left')){
      edge.blank.normal.angle += 90;
      edge.blank.side.angle += 90;
      switch (data.move.direction) {
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
    else if (edge.total == 5 &&  (data.move.direction == 'up' || data.move.direction == 'down')) {
      edge.blank.normal.angle += 90;
      edge.blank.side.angle   += 90;
      switch (data.move.direction) {
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
    this.edges.edges.center.points *= (this.edges.edges.left.total > 0 && this.edges.edges.right.total > 0) ? 0 : 1;

    var points = this.edges.edges.center.points + this.edges.edges.up.points + this.edges.edges.right.points + this.edges.edges.down.points + this.edges.edges.left.points;
    return points;
  },

  gainPoints: function(pts, team){//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<Deveria estar no HUD o colocar pontos
    this.score[team].total += pts;
    this.score[team].text.text = this.score[team].total;
  },

  finishSelect : function(direction){
    this.edges.edges.center.blank.normal.visible = false;
    this.edges.edges.up.blank.side.visible       = false;
    this.edges.edges.down.blank.side.visible     = false;
    this.edges.edges.left.blank.side.visible     = false;
    this.edges.edges.right.blank.side.visible    = false;
    this.edges.edges.up.blank.normal.visible     = false;
    this.edges.edges.down.blank.normal.visible   = false;
    this.edges.edges.left.blank.normal.visible   = false;
    this.edges.edges.right.blank.normal.visible  = false;

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

  finalRound: function(){
    if((this.score[0].total >= 200 || this.score[1].total >= 200) && (this.score[0].total != this.score[1].total))//<<<<<<<<<<<<<<<<<<<<<<pontuação n static
      this.hud.showScore();
    else
      Game.state.start("GameoverState");
  }
}
