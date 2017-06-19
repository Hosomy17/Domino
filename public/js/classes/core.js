var Core = function(hand, edges, players, score, table){
  this.hand = hand;
  this.countPass = 0;
  this.flagStart = true;//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>SOCORRO
  this.maxPieceRow = 0;//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>maior numero de peças em uma fila
  this.scaleTable = 1;
  this.players = players;
  this.edges = edges;
  this.score = score;
  this.table = table;
}

Core.prototype = {
  skipMove: function(){
    var ok=true;
    if(this.hand.turn != Link.getPlayer().turn)
        ok = false;

    var pieces = Link.getPlayer().pieces;
    var nums = [];
    nums[0] = this.edges.edges.up.open;
    nums[1] = this.edges.edges.down.open;
    nums[2] = this.edges.edges.right.open;
    nums[3] = this.edges.edges.left.open;
    for (var i=0;i < pieces.length;i++) {
      for (var j=0;j < nums.length;j++) {
        if((pieces[i][0] == nums[j] || pieces[i][1] == nums[j]) && pieces[i])
          ok=false;
      }
    }
    if(ok)
      this.edges.finishSelect(null,null);

    return ok;
  },

  doMove: function(data){
    if(++this.hand.turn >= STATIC.TOTAL_PLAYERS)
      this.hand.turn = 0;

    for (var i = 0; i < this.players.length; i++) {
      this.players[i].turn.visible = false;
    }
    this.players[this.hand.turn].turn.visible = true;

    if(data.move.piece == null){
      this.countPass++
      if(this.countPass == 4){
        var score = [this.score[0].total, this.score[1].total];
        Link.setScore(score);//<<<<<<<<<<<<<<<<<<<<<<<<<<<verificar
        Game.state.start("GameoverState");
        console.log("game over por trancamento");
      }
      this.skipMove();
      return 0;
    }
    else
      this.countPass = 0;

    this.drawMove(data);
    this.players[data.player.turn].ctn--;
    var points = this.calculatePoints();
    if(points % 5 == 0){
      this.players[data.player.turn].points += points;
      this.score[data.player.team].total += points;
    }
    if(Link.getPlayer().turn != data.player.turn){
      this.players[data.player.turn].totalPieces.text = this.players[data.player.turn].ctn;
    }
    this.score[data.player.team].text.text = "pts "+this.score[data.player.team].total;
    if(this.edges.flagStart){
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
      var score = [this.score[0].total, this.score[1].total];
      Link.setScore(score);//<<<<<<<<<<<<<<<<<<<<<<<<<<<verificar
      Game.state.start("GameoverState");
      console.log("game over conta ponto pra garagem");
    }
    this.skipMove();
  },

  drawMove: function(data){
    var orientation = (data.move.piece[0] == data.move.piece[1] ) ? 'side' : 'normal';
    var edge = this.edges.edges[data.move.direction];

    var sprite = Game.add.sprite(edge.blank[orientation].x,edge.blank[orientation].y,'domino',data.move.piece[2]);//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<melhorar atributos
    sprite.angle = edge.blank[orientation].angle;
    sprite.anchor.set(0.5);
    this.table.addChild(sprite);

    edge.total++;
    if(edge.open == data.move.piece[0])//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<roda se o lado for o outro
    {
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
      edge.blank.side.angle += 90;
      switch (data.move.direction) {
        case 'up':
          edge.nextPosition     = this.edges.formulaPositions.right;
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
  }
}
